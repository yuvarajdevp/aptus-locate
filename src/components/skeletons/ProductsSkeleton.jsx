import { Skeleton } from "./Skeleton";

export default function ProductsSkeleton({ count = 3 }) {
    return (
        <div className="bg-gray-50 py-12">
            <div className="mx-auto w-full max-w-screen-xl px-4">
                <Skeleton className="mb-2 h-10 w-48" />
                <Skeleton className="mb-8 h-4 w-72" />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: count }).map((_, i) => (
                        <Skeleton key={i} className="h-64 w-full rounded-3xl" />
                    ))}
                </div>
            </div>
        </div>
    );
}
