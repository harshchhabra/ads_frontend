import API from "../lib/api-client";

export const fetchFbAds = async (params: string) => {
  const url = `fb-ads?${params}`;
  const response = await API("get", url);
  return response?.data?.data;
};
