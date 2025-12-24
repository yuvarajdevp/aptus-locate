// lib/breadcrumb-helpers.js
import { locationMatcher, slugify } from "./utils";
import { Home, MapPin, Building2, Package, Folder } from "lucide-react";

/**
 * Build breadcrumb items for location pages
 * @param {Object} params - Location parameters
 * @param {string} params.state - State name
 * @param {string} params.city - City name
 * @param {string} params.locality - Locality name
 * @returns {Array} Breadcrumb items array
 */
export function buildLocationBreadcrumbs({ state, city, locality }) {
    const items = [
        {
            label: "Home",
            href: "/",
            icon: Home
        },
        {
            label: "Locations",
            href: "/location/all-states",
            icon: MapPin
        }
    ];

    if (state) {
        items.push({
            label: state,
            href: locationMatcher.buildLocationURL(state, "", ""),
            active: !city && !locality
        });
    }

    if (city) {
        items.push({
            label: city,
            href: locationMatcher.buildLocationURL(state, city, ""),
            active: !locality
        });
    }

    if (locality) {
        items.push({
            label: locality,
            href: locationMatcher.buildLocationURL(state, city, locality),
            active: true
        });
    }

    return items;
}

/**
 * Build breadcrumb items for branch detail pages
 * @param {Object} branch - Branch data object
 * @returns {Array} Breadcrumb items array
 */
export function buildBranchBreadcrumbs(branch) {
    if (!branch) {
        return [{
            label: "Home",
            href: "/",
            icon: Home
        }];
    }

    const items = [
        {
            label: "Home",
            href: "/",
            icon: Home
        },
        {
            label: "Locations",
            href: "/location/all-states",
            icon: MapPin
        }
    ];

    const state = branch.state?.state;
    const city = branch.city?.city;
    const locality = branch.locality;
    const branchName = branch.branch_name || `Aptus - ${locality}`;
    const storeCode = branch.storeCode;

    if (state) {
        items.push({
            label: state,
            href: locationMatcher.buildLocationURL(state, "", "")
        });
    }

    if (city) {
        items.push({
            label: city,
            href: locationMatcher.buildLocationURL(state, city, "")
        });
    }

    if (locality) {
        items.push({
            label: locality,
            href: locationMatcher.buildLocationURL(state, city, locality)
        });
    }

    // Add current branch
    items.push({
        label: storeCode ? `${branchName} (${storeCode})` : branchName,
        href: "#",
        icon: Building2,
        active: true
    });

    return items;
}

/**
 * Build breadcrumb items for product pages
 * @param {Object} product - Product data object
 * @param {string} categoryPath - Optional category path
 * @returns {Array} Breadcrumb items array
 */
export function buildProductBreadcrumbs(product, categoryPath = null) {
    const items = [
        {
            label: "Home",
            href: "/",
            icon: Home
        },
        {
            label: "Products",
            href: "/products",
            icon: Package
        },
        {
            label: "Contact Us",
            href: "/contact",
            icon: Package
        },
        {
            label: "Articles",
            href: "/articles",
            icon: Package
        },
        {
            label: "Gallery",
            href: "/gallery",
            icon: Package
        }

    ];

    if (categoryPath) {
        items.push({
            label: categoryPath,
            href: `/products/category/${slugify(categoryPath)}`
        });
    }

    if (product) {
        items.push({
            label: product.name || product.title,
            href: "#",
            active: true
        });
    }

    return items;
}

/**
 * Build breadcrumb items for category pages
 * @param {Array} path - Category path segments
 * @returns {Array} Breadcrumb items array
 */
export function buildCategoryBreadcrumbs(path = []) {
    const items = [
        {
            label: "Home",
            href: "/",
            icon: Home
        },
        {
            label: "Categories",
            href: "/category",
            icon: Folder
        }
    ];

    path.forEach((segment, index) => {
        const href = `/category/${path.slice(0, index + 1).map(s => slugify(s)).join('/')}`;
        const isLast = index === path.length - 1;
        
        items.push({
            label: segment,
            href: href,
            active: isLast
        });
    });

    return items;
}

/**
 * Get badge information for branch type
 * @param {string} branchType - Branch type (HFC or NBFC)
 * @returns {Object} Badge text and type
 */
export function getBranchTypeBadge(branchType) {
    if (!branchType) {
        return { text: null, type: "info" };
    }

    const badges = {
        HFC: {
            text: " Housing Finance Company (HFC)",
            type: "hfc"
        },
        NBFC: {
            text: " Non-Banking Financial Company (NBFC)",
            type: "nbfc"
        }
    };

    return badges[branchType.toUpperCase()] || { text: branchType, type: "info" };
}

/**
 * Build complete breadcrumb configuration for branch pages
 * @param {Object} branch - Branch data object
 * @returns {Object} Complete breadcrumb configuration
 */
export function buildBranchBreadcrumbConfig(branch) {
    const items = buildBranchBreadcrumbs(branch);
    const badge = getBranchTypeBadge(branch?.type);

    return {
        items,
        showIcon: true,
        badgeText: badge.text,
        badgeType: badge.type
    };
}

/**
 * Validate breadcrumb items structure
 * @param {Array} items - Breadcrumb items to validate
 * @returns {boolean} True if valid
 */
export function validateBreadcrumbItems(items) {
    if (!Array.isArray(items)) return false;
    if (items.length === 0) return false;

    return items.every(item => 
        typeof item === 'object' &&
        typeof item.label === 'string' &&
        typeof item.href === 'string'
    );
}

/**
 * Generate structured data for breadcrumbs (SEO)
 * @param {Array} items - Breadcrumb items
 * @param {string} baseUrl - Base URL of the site
 * @returns {Object} JSON-LD structured data
 */
export function generateBreadcrumbStructuredData(items, baseUrl = "https://example.com") {
    if (!validateBreadcrumbItems(items)) {
        return null;
    }

    const itemListElements = items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label,
        "item": item.href.startsWith('http') ? item.href : `${baseUrl}${item.href}`
    }));

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": itemListElements
    };
}

// Export all utilities
export default {
    buildLocationBreadcrumbs,
    buildBranchBreadcrumbs,
    buildProductBreadcrumbs,
    buildCategoryBreadcrumbs,
    getBranchTypeBadge,
    buildBranchBreadcrumbConfig,
    validateBreadcrumbItems,
    generateBreadcrumbStructuredData
};