import { Skeleton } from "./Skeleton";

export function BranchCardSkeleton() {
    return (
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border-2 border-gray-100 bg-white shadow-md">
            <Skeleton className="h-16 w-full rounded-none" />
            <div className="flex flex-grow flex-col gap-4 p-5">
                <div className="flex gap-3">
                    <Skeleton className="h-5 w-5 shrink-0 rounded-full" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-4/5" />
                        <Skeleton className="h-3 w-3/5" />
                    </div>
                </div>
                <div className="flex gap-3">
                    <Skeleton className="h-5 w-5 shrink-0 rounded-full" />
                    <Skeleton className="h-3 w-2/3" />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-2 px-5 pb-5">
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-14 w-full rounded-xl" />
                ))}
            </div>
        </div>
    );
}

export default function BranchCardGridSkeleton({ count = 6, showHeader = true }) {
    return (
        <section className="container mx-auto px-4 py-10">
            {showHeader && (
                <div className="mb-10 text-center">
                    <Skeleton className="mx-auto mb-3 h-9 w-80 max-w-full" />
                    <Skeleton className="mx-auto h-1 w-32 rounded" />
                </div>
            )}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: count }).map((_, i) => (
                    <BranchCardSkeleton key={i} />
                ))}
            </div>
        </section>
    );
}
