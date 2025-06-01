export const sampleAds = [
  {
    id: '1',
    advertiser: 'McDonald\'s UAE',
    platform: 'facebook',
    media_type: 'video',
    status: 'active',
    compliance_checks: [{ verdict: 'Violation', reason: 'Targets children with high-sugar content', confidence: 0.92 }],
    ad_text: 'Try our new Happy Meal with a special toy collection!',
    media_urls: ['https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg'],
    metadata: {
      engagement: {
        likes: 15000,
        comments: 2500,
        views: 250000
      }
    }
  },
  {
    id: '2',
    advertiser: 'KFC Middle East',
    platform: 'instagram',
    media_type: 'image',
    status: 'active',
    compliance_checks: [{ verdict: 'Compliant', reason: 'Adult-focused marketing', confidence: 0.88 }],
    ad_text: 'Dinner bucket deal for family gatherings',
    media_urls: ['https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg'],
    metadata: {
      engagement: {
        likes: 8500,
        comments: 1200,
        views: 120000
      }
    }
  },
  {
    id: '3',
    advertiser: 'Baskin Robbins',
    platform: 'tiktok',
    media_type: 'video',
    status: 'active',
    compliance_checks: [{ verdict: 'Violation', reason: 'Uses cartoon characters', confidence: 0.95 }],
    ad_text: 'New ice cream flavors for summer!',
    media_urls: ['https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg'],
    metadata: {
      engagement: {
        likes: 25000,
        comments: 3000,
        views: 300000
      }
    }
  },
  {
    id: '4',
    advertiser: 'Pizza Hut UAE',
    platform: 'facebook',
    media_type: 'carousel',
    status: 'active',
    compliance_checks: [{ verdict: 'Compliant', reason: 'Standard product showcase', confidence: 0.87 }],
    ad_text: 'Weekend special deals on family size pizzas',
    media_urls: ['https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg'],
    metadata: {
      engagement: {
        likes: 12000,
        comments: 1800,
        views: 180000
      }
    }
  },
  {
    id: '5',
    advertiser: 'Subway Arabia',
    platform: 'instagram',
    media_type: 'image',
    status: 'active',
    compliance_checks: [{ verdict: 'Compliant', reason: 'Health-focused messaging', confidence: 0.91 }],
    ad_text: 'Fresh ingredients, healthier choices',
    media_urls: ['https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg'],
    metadata: {
      engagement: {
        likes: 9500,
        comments: 1100,
        views: 140000
      }
    }
  },
  {
    id: '6',
    advertiser: 'Dunkin UAE',
    platform: 'snapchat',
    media_type: 'video',
    status: 'active',
    compliance_checks: [{ verdict: 'Violation', reason: 'Appeals to young audience', confidence: 0.89 }],
    ad_text: 'Colorful donuts for your celebrations!',
    media_urls: ['https://images.pexels.com/photos/2955820/pexels-photo-2955820.jpeg'],
    metadata: {
      engagement: {
        likes: 18000,
        comments: 2200,
        views: 220000
      }
    }
  },
  {
    id: '7',
    advertiser: 'Starbucks Middle East',
    platform: 'facebook',
    media_type: 'image',
    status: 'active',
    compliance_checks: [{ verdict: 'Compliant', reason: 'Adult-focused campaign', confidence: 0.93 }],
    ad_text: 'Premium coffee experience',
    media_urls: ['https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg'],
    metadata: {
      engagement: {
        likes: 22000,
        comments: 2800,
        views: 280000
      }
    }
  },
  {
    id: '8',
    advertiser: 'Domino\'s Pizza UAE',
    platform: 'google_display',
    media_type: 'image',
    status: 'active',
    compliance_checks: [{ verdict: 'Compliant', reason: 'Standard promotional content', confidence: 0.86 }],
    ad_text: 'Order online for exclusive deals',
    media_urls: ['https://images.pexels.com/photos/803290/pexels-photo-803290.jpeg'],
    metadata: {
      engagement: {
        likes: 11000,
        comments: 1500,
        views: 160000
      }
    }
  },
  {
    id: '9',
    advertiser: 'Hardee\'s Arabia',
    platform: 'instagram',
    media_type: 'video',
    status: 'active',
    compliance_checks: [{ verdict: 'Violation', reason: 'Uses gaming references', confidence: 0.90 }],
    ad_text: 'Level up your burger game!',
    media_urls: ['https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg'],
    metadata: {
      engagement: {
        likes: 16000,
        comments: 2000,
        views: 200000
      }
    }
  },
  {
    id: '10',
    advertiser: 'Cinnabon UAE',
    platform: 'facebook',
    media_type: 'carousel',
    status: 'active',
    compliance_checks: [{ verdict: 'Compliant', reason: 'Product-focused advertising', confidence: 0.88 }],
    ad_text: 'Fresh from the oven',
    media_urls: ['https://images.pexels.com/photos/267308/pexels-photo-267308.jpeg'],
    metadata: {
      engagement: {
        likes: 13000,
        comments: 1600,
        views: 170000
      }
    }
  },
  {
    id: '11',
    advertiser: 'Shake Shack UAE',
    platform: 'instagram',
    media_type: 'video',
    status: 'active',
    compliance_checks: [{ verdict: 'Compliant', reason: 'Standard menu promotion', confidence: 0.89 }],
    ad_text: 'Premium burgers and shakes',
    media_urls: ['https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg'],
    metadata: {
      engagement: {
        likes: 19000,
        comments: 2300,
        views: 230000
      }
    }
  },
  {
    id: '12',
    advertiser: 'Tim Hortons Arabia',
    platform: 'facebook',
    media_type: 'image',
    status: 'active',
    compliance_checks: [{ verdict: 'Compliant', reason: 'Adult-focused content', confidence: 0.92 }],
    ad_text: 'Morning coffee and donuts',
    media_urls: ['https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg'],
    metadata: {
      engagement: {
        likes: 14000,
        comments: 1700,
        views: 180000
      }
    }
  },
  {
    id: '13',
    advertiser: 'Papa John\'s UAE',
    platform: 'google_display',
    media_type: 'carousel',
    status: 'active',
    compliance_checks: [{ verdict: 'Compliant', reason: 'Family-oriented messaging', confidence: 0.87 }],
    ad_text: 'Better ingredients, better pizza',
    media_urls: ['https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg'],
    metadata: {
      engagement: {
        likes: 12500,
        comments: 1550,
        views: 165000
      }
    }
  },
  {
    id: '14',
    advertiser: 'Five Guys UAE',
    platform: 'instagram',
    media_type: 'video',
    status: 'active',
    compliance_checks: [{ verdict: 'Compliant', reason: 'Product showcase', confidence: 0.91 }],
    ad_text: 'Hand-crafted burgers',
    media_urls: ['https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg'],
    metadata: {
      engagement: {
        likes: 17500,
        comments: 2100,
        views: 210000
      }
    }
  },
  {
    id: '15',
    advertiser: 'Cold Stone UAE',
    platform: 'tiktok',
    media_type: 'video',
    status: 'active',
    compliance_checks: [{ verdict: 'Violation', reason: 'Uses animated characters', confidence: 0.94 }],
    ad_text: 'Mix your favorite flavors!',
    media_urls: ['https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg'],
    metadata: {
      engagement: {
        likes: 28000,
        comments: 3500,
        views: 320000
      }
    }
  },
  {
    id: '16',
    advertiser: 'Krispy Kreme UAE',
    platform: 'snapchat',
    media_type: 'image',
    status: 'active',
    compliance_checks: [{ verdict: 'Violation', reason: 'Appeals to children', confidence: 0.88 }],
    ad_text: 'Magical dozen deals',
    media_urls: ['https://images.pexels.com/photos/2955820/pexels-photo-2955820.jpeg'],
    metadata: {
      engagement: {
        likes: 21000,
        comments: 2600,
        views: 260000
      }
    }
  },
  {
    id: '17',
    advertiser: 'Buffalo Wild Wings',
    platform: 'facebook',
    media_type: 'video',
    status: 'active',
    compliance_checks: [{ verdict: 'Compliant', reason: 'Sports-themed marketing', confidence: 0.90 }],
    ad_text: 'Game day specials',
    media_urls: ['https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg'],
    metadata: {
      engagement: {
        likes: 16500,
        comments: 2050,
        views: 205000
      }
    }
  },
  {
    id: '18',
    advertiser: 'IHOP UAE',
    platform: 'instagram',
    media_type: 'carousel',
    status: 'active',
    compliance_checks: [{ verdict: 'Compliant', reason: 'Family dining focus', confidence: 0.89 }],
    ad_text: 'Breakfast for champions',
    media_urls: ['https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg'],
    metadata: {
      engagement: {
        likes: 15500,
        comments: 1900,
        views: 190000
      }
    }
  },
  {
    id: '19',
    advertiser: 'Wendy\'s UAE',
    platform: 'facebook',
    media_type: 'image',
    status: 'active',
    compliance_checks: [{ verdict: 'Compliant', reason: 'Standard menu promotion', confidence: 0.87 }],
    ad_text: 'Fresh, never frozen beef',
    media_urls: ['https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg'],
    metadata: {
      engagement: {
        likes: 14500,
        comments: 1750,
        views: 175000
      }
    }
  },
  {
    id: '20',
    advertiser: 'Dairy Queen UAE',
    platform: 'tiktok',
    media_type: 'video',
    status: 'active',
    compliance_checks: [{ verdict: 'Violation', reason: 'Uses cartoon mascot', confidence: 0.93 }],
    ad_text: 'Blizzard treats for everyone!',
    media_urls: ['https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg'],
    metadata: {
      engagement: {
        likes: 26000,
        comments: 3200,
        views: 310000
      }
    }
  }
];