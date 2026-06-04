import { buildLocationUrl } from "./utils";
import { getBranchName } from "./branchUtils";

/**
 * Overview page breadcrumbs (Aptus Locator → state → city → branch).
 */
export function buildOverviewBreadcrumbs(branch) {
    const items = [
        { label: "Aptus Locator", href: "/location/all-states", active: false },
    ];

    const state = branch?.state?.state || "";
    const city = branch?.city?.city || "";
    const branchName = getBranchName(branch);

    if (state) {
        items.push({
            label: state,
            href: buildLocationUrl(state, "", ""),
            active: false,
        });
    }

    if (city) {
        items.push({
            label: city,
            href: buildLocationUrl(state, city, ""),
            active: false,
        });
    }

    if (branchName) {
        items.push({
            label: branchName,
            href: "#",
            active: true,
        });
    }

    return items;
}
