import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import SearchFiltersSkeleton from "@/components/skeletons/SearchFiltersSkeleton";
import BranchCardGridSkeleton from "@/components/skeletons/BranchCardGridSkeleton";
import BreadcrumbSkeleton from "@/components/skeletons/BreadcrumbSkeleton";

/** Location route load — keep header; skeleton only for content below nav */
export default function LocationLoading() {
    return (
        <div className="pb-24 md:pb-0">
            <Header />
            <BreadcrumbSkeleton />
            <SearchFiltersSkeleton />
            <BranchCardGridSkeleton count={6} />
            <Footer aboutDetails={{}} />
        </div>
    );
}
