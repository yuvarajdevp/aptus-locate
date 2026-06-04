import { buildBranchUrl } from "@/lib/utils";

/** Display name for a branch (API may use `branch` or `branch_name`). */
export function getBranchName(branch) {
    return branch?.branch || branch?.branch_name || "";
}

/** Whether Details navigation and overview URL can be built. */
export function canNavigateToBranch(branch) {
    return Boolean(
        branch?.storeCode &&
        getBranchName(branch) &&
        branch?.city?.city &&
        branch?.state?.state
    );
}

/** `/aptus-finance-.../overview` path for a branch card. */
export function buildBranchOverviewPath(branch) {
    if (!canNavigateToBranch(branch)) return null;
    const slug = buildBranchUrl(
        getBranchName(branch),
        branch.city?.city,
        branch.storeCode
    );
    return `/${slug}/overview`;
}
