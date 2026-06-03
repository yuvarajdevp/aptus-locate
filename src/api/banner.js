import senderRequest from "@/services/Http";

const BANNER_POPULATE_QUERY =
  "populate[topBanner][populate][img]=true&populate[topBanner][populate][mobImg]=true&populate[state]=true&populate[type]=true";

const buildBannerQuery = ({ state, branchType, bannerRef } = {}) => {
  const filters = [];

  if (bannerRef) {
    filters.push(`filters[ref][$containsi]=${encodeURIComponent(bannerRef)}`);
  }

  if (state) {
    filters.push(`filters[state][state][$eqi]=${encodeURIComponent(state)}`);
  }

  if (branchType) {
    filters.push(`filters[type][name][$eqi]=${encodeURIComponent(branchType)}`);
  }

  const filterQuery = filters.length ? `&${filters.join("&")}` : "";
  return `banners?${BANNER_POPULATE_QUERY}${filterQuery}`;
};

export const handleBannersApi = async (filters = {}) => {
  const apiUrl = buildBannerQuery(filters);
  return senderRequest("get", apiUrl);
};

