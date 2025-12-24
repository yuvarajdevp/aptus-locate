import GalleryPageContent from '@/components/Gallery/GalleryPageContent';
import BannerDetails from '@/components/Home/BannerDetails';
export default function Gallery() {
    return (

        <>
            <BannerDetails />
            <GalleryPageContent branchSlug="branch-name" />;
        </>
    )


}