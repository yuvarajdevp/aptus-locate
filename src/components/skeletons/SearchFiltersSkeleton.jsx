import { Skeleton } from "./Skeleton";

export default function SearchFiltersSkeleton() {
    return (
        <div className="container mx-auto mb-6 mt-8 scroll-mt-28 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-lg md:p-8">
            <div className="mb-6 space-y-2 text-center">
                <Skeleton className="mx-auto h-8 w-72 max-w-full" />
                <Skeleton className="mx-auto h-4 w-96 max-w-full" />
            </div>
            <div className="mb-6 grid gap-4 md:grid-cols-3 md:gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-11 w-full rounded-lg" />
                    </div>
                ))}
            </div>
            <div className="mb-6 flex justify-center gap-4">
                <Skeleton className="h-10 w-36 rounded-lg" />
                <Skeleton className="h-10 w-36 rounded-lg" />
            </div>
            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
                <Skeleton className="h-12 w-full rounded-lg sm:w-40" />
                <Skeleton className="h-12 w-full rounded-lg sm:w-44" />
            </div>
        </div>
    );
}
