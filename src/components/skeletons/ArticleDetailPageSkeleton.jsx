import BannerSkeleton from "./BannerSkeleton";
import { Skeleton } from "./Skeleton";
import { ArticleCardSkeleton } from "./ArticlesSkeleton";

export default function ArticleDetailPageSkeleton() {
    return (
        <div className="bg-gray-50">
            <BannerSkeleton />

            <div className="border-b border-gray-200 bg-white">
                <div className="container mx-auto flex flex-wrap items-center gap-2 px-4 py-4">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-48 max-w-[60%]" />
                </div>
            </div>

            <div className="container mx-auto max-w-4xl px-4 py-12">
                <Skeleton className="mb-6 h-5 w-36" />
                <Skeleton className="mb-4 h-10 w-full max-w-2xl md:h-12" />
                <Skeleton className="mb-8 h-4 w-56" />
                <Skeleton className="mb-8 aspect-[16/9] w-full max-h-[500px] rounded-xl" />

                <div className="mb-8 space-y-3 rounded-lg border-l-4 border-gray-200 bg-gray-100 p-6">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>

                <div className="space-y-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="h-4 w-full" />
                    ))}
                    <Skeleton className="h-4 w-4/5" />
                </div>
            </div>

            <section className="bg-white py-12">
                <div className="container mx-auto max-w-6xl px-4">
                    <Skeleton className="mb-8 h-9 w-56" />
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <ArticleCardSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
