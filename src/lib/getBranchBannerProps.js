import { BranchesApi } from "@/api/branches";
import { unwrapApiList, isApiError } from "@/lib/apiHelpers";
import { parseBranchSlug } from "@/lib/utils";

/**
 * Fetch branch record from overview-style URL slug.
 */
export async function getBranchBySlug(slug) {
    if (!slug) return null;

    const { storeCode } = parseBranchSlug(slug);
    const response = await BranchesApi({ storeCode });
    if (isApiError(response)) return null;

    const list = unwrapApiList(response);
    return list[0] || null;
}

/**
 * Banner targeting props for BannerDetails / BranchPageBanner.
 */
export async function getBranchBannerProps(slug) {
    const branch = await getBranchBySlug(slug);

    if (!branch) {
        return { state: "", branchType: "", bannerRef: slug || "", branch: null };
    }

    const { storeCode } = parseBranchSlug(slug);

    return {
        state: branch?.state?.state || "",
        branchType: branch?.type || "",
        bannerRef: storeCode || slug,
        branch,
    };
}
