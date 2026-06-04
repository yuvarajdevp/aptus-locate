import BannerSkeleton from "./BannerSkeleton";
import { Skeleton } from "./Skeleton";

export default function ContactPageSkeleton() {
    return (
        <>
            <BannerSkeleton />
            <div className="flex items-center justify-center p-6">
                <div className="m-4 w-full rounded-lg bg-white px-8 py-8 shadow-sm md:px-12">
                    <Skeleton className="mb-2 h-4 w-40" />
                    <Skeleton className="mb-6 h-12 w-full max-w-xl" />
                    <div className="mb-8 space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-4/6" />
                    </div>
                    <div className="flex flex-col gap-6 border-t border-gray-200 py-8 sm:flex-row sm:justify-between">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-12 w-12 rounded-lg" />
                            <Skeleton className="h-6 w-56" />
                        </div>
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-12 w-12 rounded-lg" />
                            <Skeleton className="h-6 w-40" />
                        </div>
                    </div>
                    <div className="flex gap-4 border-t border-gray-200 pt-8">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="h-10 w-10 rounded-lg" />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
