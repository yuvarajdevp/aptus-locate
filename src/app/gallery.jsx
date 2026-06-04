import GalleryPageContent from "@/components/Gallery/GalleryPageContent";
import BranchPageBanner from "@/components/Home/BranchPageBanner";

export default async function Gallery({ slug }) {
    return (
        <>
            <BranchPageBanner slug={slug} />
            <GalleryPageContent branchSlug={slug} />
        </>
    );
}
