import { handleBannersApi } from "@/api/banner";
import { handleLayoutApi } from "@/api/layout";
import { STRAPI_URL } from "@/env/env";

const STRAPI_BASE_URL = (STRAPI_URL || "").replace(/\/$/, "");

const STATIC_FALLBACK_SLIDES = [
  {
    id: "static-fallback-banner",
    desktopSrc: "/aptus_logo.webp",
    mobileSrc: "/aptus_logo.webp",
    link: "/",
    source: "static",
  },
];

const STATE_ALIASES = {
  pondicherry: "puducherry",
  puducherry: "pondicherry",
};

const normalizeText = (value = "") =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "");

const toAbsoluteUrl = (url) => {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  return `${STRAPI_BASE_URL}${url.startsWith("/") ? url : `/${url}`}`;
};

const getMediaUrl = (media) => {
  if (!media) return "";
  if (Array.isArray(media) && media.length > 0) return getMediaUrl(media[0]);
  if (media?.url) return toAbsoluteUrl(media.url);
  if (media?.data?.attributes?.url) return toAbsoluteUrl(media.data.attributes.url);
  if (Array.isArray(media?.data) && media.data[0]?.attributes?.url) {
    return toAbsoluteUrl(media.data[0].attributes.url);
  }
  return "";
};

const normalizeSlides = (entries = [], source) => {
  if (!Array.isArray(entries)) return [];

  return entries
    .map((entry, index) => {
      const desktopSrc = getMediaUrl(entry?.img);
      const mobileSrc = getMediaUrl(entry?.mobImg) || desktopSrc;
      return {
        id: `${source}-${entry?.id ?? index}`,
        desktopSrc,
        mobileSrc,
        link: entry?.link || "",
        source,
      };
    })
    .filter((slide) => slide.desktopSrc);
};

const getBannerTypeName = (banner) =>
  banner?.type?.name || banner?.type?.data?.attributes?.name || "";

const getBannerStateName = (banner) =>
  banner?.state?.state || banner?.state?.data?.attributes?.state || "";

const isStateMatch = (bannerState, requestedState) => {
  if (!requestedState) return false;
  const left = normalizeText(bannerState);
  const right = normalizeText(requestedState);
  if (!left || !right) return false;
  if (left === right) return true;
  const rightAlias = normalizeText(STATE_ALIASES[right] || "");
  const leftAlias = normalizeText(STATE_ALIASES[left] || "");
  return left === rightAlias || leftAlias === right;
};

const isTypeMatch = (bannerType, requestedType) => {
  if (!requestedType) return false;
  return normalizeText(bannerType) === normalizeText(requestedType);
};

const isRefMatch = (bannerRef, requestedRef) => {
  if (!bannerRef || !requestedRef) return false;
  const left = normalizeText(bannerRef);
  const right = normalizeText(requestedRef);
  return left === right || left.includes(right) || right.includes(left);
};

const getLayoutTopBanners = async () => {
  const layoutData = await handleLayoutApi();
  return normalizeSlides(layoutData?.data?.topbanner || [], "layout");
};

const getBannerTopBanners = async ({ state, branchType, bannerRef }) => {
  const firstNonEmptyFromApi = (rows) => {
    const list = Array.isArray(rows) ? rows : [];
    for (const row of list) {
      const slides = normalizeSlides(row?.topBanner || [], `banner-${row?.id || "x"}`);
      if (slides.length) return slides;
    }
    return [];
  };

  if (bannerRef) {
    const refData = await handleBannersApi({ bannerRef });
    const refRows = Array.isArray(refData?.data) ? refData.data : [];
    const refMatches = refRows.filter((row) => isRefMatch(row?.ref, bannerRef));
    const refSlides = firstNonEmptyFromApi(refMatches);
    if (refSlides.length) return refSlides;
  }

  if (state && branchType) {
    const exactData = await handleBannersApi({ state, branchType });
    const exactRows = Array.isArray(exactData?.data) ? exactData.data : [];
    const exact = exactRows.filter(
      (row) => isStateMatch(getBannerStateName(row), state) && isTypeMatch(getBannerTypeName(row), branchType)
    );
    const exactSlides = firstNonEmptyFromApi(exact);
    if (exactSlides.length) return exactSlides;
  }

  if (state) {
    const normalizedState = normalizeText(state);
    const stateCandidates = [state];
    if (STATE_ALIASES[normalizedState]) {
      stateCandidates.push(STATE_ALIASES[normalizedState]);
    }

    for (const stateCandidate of stateCandidates) {
      const stateData = await handleBannersApi({ state: stateCandidate });
      const stateRows = Array.isArray(stateData?.data) ? stateData.data : [];
      const filteredStateRows = stateRows.filter((row) =>
        isStateMatch(getBannerStateName(row), state)
      );
      const stateSlides = firstNonEmptyFromApi(filteredStateRows);
      if (stateSlides.length) return stateSlides;
    }
  }

  if (branchType) {
    const typeData = await handleBannersApi({ branchType });
    const typeRows = Array.isArray(typeData?.data) ? typeData.data : [];
    const typeOnly = typeRows.filter((row) =>
      isTypeMatch(getBannerTypeName(row), branchType)
    );
    const typeSlides = firstNonEmptyFromApi(typeOnly);
    if (typeSlides.length) return typeSlides;
  }

  return [];
};

export const resolveBannerSlides = async ({
  state,
  branchType,
  bannerRef,
} = {}) => {
  const bannerSlides = await getBannerTopBanners({ state, branchType, bannerRef });
  if (bannerSlides.length) {
    return { slides: bannerSlides, source: "banner" };
  }

  const layoutSlides = await getLayoutTopBanners();
  if (layoutSlides.length) {
    return { slides: layoutSlides, source: "layout" };
  }

  return { slides: STATIC_FALLBACK_SLIDES, source: "static" };
};
