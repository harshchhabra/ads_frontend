import { createClient } from 'npm:@supabase/supabase-js@2.39.0';
import OpenAI from 'npm:openai@4.28.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY')
});

async function analyzeCompliance(ad: any) {
  const prompt = `You are a compliance expert trained to evaluate food advertisements based on Abu Dhabi's regulation ADS-037-2023 for marketing to children. You are reviewing a food-related online ad and must determine whether it violates the guidelines.

### Ad Details:
Platform: ${ad.platform}
Advertiser: ${ad.advertiser}
Media Type: ${ad.media_type}
Ad Copy:
${ad.ad_text}

### Instructions:
- Determine whether the advertised product is considered **non-nutritious** based on Abu Dhabi's standards (e.g., high sugar, fat, sodium).
- Check if the ad is visually or linguistically targeting children (cartoon style, playful tone, child influencers, etc.).
- Assess whether the ad's content would appeal to children aged 3–18.
- Output a classification and justification.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [{ role: "user", content: prompt }],
  });

  return completion.choices[0].message.content;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { ad_id } = await req.json();

    // Get ad details
    const { data: ad, error: adError } = await supabase
      .from('ads')
      .select('*')
      .eq('id', ad_id)
      .single();

    if (adError) throw adError;

    // Analyze compliance
    const analysis = await analyzeCompliance(ad);

    // Store results
    const { data, error } = await supabase
      .from('compliance_checks')
      .insert({
        ad_id,
        ...parseAnalysis(analysis)
      });

    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true, data }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

function parseAnalysis(text: string) {
  // Parse OpenAI response into structured data
  const lines = text.split('\n');
  return {
    is_non_nutritious: lines.find(l => l.includes('non-nutritious'))?.includes('Yes') ?? false,
    targets_children: lines.find(l => l.includes('target children'))?.includes('Yes') ?? false,
    has_child_appeal: lines.find(l => l.includes('Child Appeal Elements'))?.includes('Yes') ?? false,
    verdict: lines.find(l => l.includes('Verdict:'))?.split(':')[1].trim() ?? 'Unknown',
    reason: lines.find(l => l.includes('Reason:'))?.split(':')[1].trim() ?? '',
    confidence: parseFloat(lines.find(l => l.includes('Confidence:'))?.split(':')[1].trim() ?? '0')
  };
}