import BannerSkeleton from "./BannerSkeleton";
import TabsRowSkeleton from "./TabsRowSkeleton";
import ArticlesSkeleton from "./ArticlesSkeleton";

export default function ArticlesPageSkeleton() {
    return (
        <div className="bg-gray-50">
            <BannerSkeleton />
            <TabsRowSkeleton tabWidths={["w-20", "w-32"]} />
            <div className="container mx-auto px-4 py-12">
                <ArticlesSkeleton count={6} />
            </div>
        </div>
    );
}
