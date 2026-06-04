import BannerSkeleton from "./BannerSkeleton";
import BreadcrumbSkeleton from "./BreadcrumbSkeleton";
import BranchDetailsSkeleton from "./BranchDetailsSkeleton";
import LeadFormSkeleton from "./LeadFormSkeleton";
import ProductsSkeleton from "./ProductsSkeleton";
import ArticlesSkeleton from "./ArticlesSkeleton";
import FAQSkeleton from "./FAQSkeleton";

export default function OverviewPageSkeleton() {
    return (
        <>
            <BannerSkeleton />
            <BreadcrumbSkeleton />
            <div className="mx-auto w-full max-w-screen-xl scroll-mt-28 px-4 py-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
                    <div className="lg:col-span-7">
                        <BranchDetailsSkeleton />
                    </div>
                    <div className="lg:col-span-5">
                        <LeadFormSkeleton />
                    </div>
                </div>
            </div>
            <ProductsSkeleton />
            <div className="mx-auto w-full max-w-screen-xl px-4">
                <ArticlesSkeleton />
            </div>
            <FAQSkeleton />
        </>
    );
}
