import { Skeleton } from "./Skeleton";

export function ArticleCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
            <Skeleton className="h-48 w-full rounded-none" />
            <div className="space-y-3 p-5">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-4/5" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-4 w-24" />
            </div>
        </div>
    );
}

export default function ArticlesSkeleton({ count = 3 }) {
    return (
        <div className="w-full py-12">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-10 w-64" />
                    <Skeleton className="h-4 w-80 max-w-full" />
                </div>
                <Skeleton className="h-12 w-40 rounded-lg" />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: count }).map((_, i) => (
                    <ArticleCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}
