import BannerSkeleton from "./BannerSkeleton";
import TabsRowSkeleton from "./TabsRowSkeleton";
import { Skeleton } from "./Skeleton";

export default function GalleryPageSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50">
            <BannerSkeleton />
            <TabsRowSkeleton tabWidths={["w-28", "w-28"]} />
            <div className="container mx-auto grid grid-cols-1 gap-6 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className="overflow-hidden rounded-lg bg-white shadow-md"
                    >
                        <Skeleton className="h-64 w-full rounded-none" />
                        <div className="space-y-2 p-4">
                            <Skeleton className="h-5 w-4/5" />
                            <Skeleton className="h-3 w-full" />
                            <Skeleton className="h-3 w-2/3" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
