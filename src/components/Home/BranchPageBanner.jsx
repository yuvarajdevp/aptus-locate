import BannerDetails from "@/components/Home/BannerDetails";
import { getBranchBannerProps } from "@/lib/getBranchBannerProps";

/**
 * Overview-style branch banner for sub-pages (contact, articles, gallery, etc.).
 */
export default async function BranchPageBanner({ slug, scrollTargetId }) {
    if (!slug) {
        return <BannerDetails />;
    }

    const { state, branchType, bannerRef } = await getBranchBannerProps(slug);

    return (
        <BannerDetails
            state={state}
            branchType={branchType}
            bannerRef={bannerRef}
            scrollTargetId={scrollTargetId}
        />
    );
}
