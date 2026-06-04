/**
 * Map pathname → skeleton type for [...slug] routes (used by SlugRouteLoading).
 */

export const ROUTE_SKELETON = {
    OVERVIEW: "overview",
    ARTICLES_LIST: "articles-list",
    ARTICLE_DETAIL: "article-detail",
    PRODUCTS: "products",
    CONTACT: "contact",
    GALLERY: "gallery",
};

export function isArticleDetailPath(segments) {
    return segments.length >= 3 && segments[segments.length - 2] === "articles";
}

export function getSlugRouteSkeletonType(pathname = "") {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length < 2) return null;

    if (isArticleDetailPath(segments)) {
        return ROUTE_SKELETON.ARTICLE_DETAIL;
    }

    const last = segments[segments.length - 1];

    switch (last) {
        case "overview":
            return ROUTE_SKELETON.OVERVIEW;
        case "articles":
            return ROUTE_SKELETON.ARTICLES_LIST;
        case "products":
            return ROUTE_SKELETON.PRODUCTS;
        case "contact":
            return ROUTE_SKELETON.CONTACT;
        case "gallery":
            return ROUTE_SKELETON.GALLERY;
        default:
            return ROUTE_SKELETON.OVERVIEW;
    }
}
