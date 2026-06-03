/** Shared branch sub-nav items and path helpers (Header + mobile nav). */

export const BRANCH_NAV_ITEMS = [
  { name: "Overview", route: "/overview", icon: "overview" },
  { name: "Products", route: "/overview", scrollTo: "products-section", icon: "products" },
  { name: "Articles", route: "/articles", icon: "articles" },
  { name: "Gallery", route: "/gallery", icon: "gallery" },
];

export const MOBILE_ICON_NAV_ITEMS = BRANCH_NAV_ITEMS;

/** Customer care – used for mobile Call Now */
export const APTUS_HELP_PHONE = "044-45650000";
export const APTUS_HELP_PHONE_TEL = "tel:044-45650000";

/** Home page branch finder anchor */
export const HOME_SEARCH_HASH = "#branch-search";

/** Overview page — scroll banner click to callback form */
export const CALLBACK_FORM_SECTION_ID = "request-callback-form";

export function getBranchBasePath(pathname = "") {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length >= 3 && segments[segments.length - 2] === "articles") {
    return `/${segments.slice(0, -2).join("/")}`;
  }

  if (segments[segments.length - 1] === "articles") {
    return `/${segments.slice(0, -1).join("/")}`;
  }

  return `/${segments.slice(0, -1).join("/")}`;
}

/** Branch finder / location filter pages (`/location/...`) */
export function isBranchSearchPage(pathname = "") {
  return pathname?.startsWith("/location");
}

export function isBranchSubPage(pathname = "") {
  return (
    pathname?.includes("overview") ||
    pathname?.includes("contact") ||
    pathname?.includes("articles") ||
    pathname?.includes("gallery") ||
    pathname?.includes("products")
  );
}

export function getBranchNavActive(item, pathname, currentHash) {
  const basePath = getBranchBasePath(pathname);
  const targetUrl = `${basePath}${item.route}`;
  const currentPath = pathname.split("#")[0];
  const targetPath = targetUrl.split("#")[0];

  if (item.name === "Articles") {
    return currentPath.includes("/articles");
  }
  if (item.scrollTo) {
    return currentPath === targetPath && currentHash === `#${item.scrollTo}`;
  }
  if (currentPath === targetPath) {
    return !currentHash || currentHash !== "#products-section";
  }
  return currentPath === targetPath;
}
