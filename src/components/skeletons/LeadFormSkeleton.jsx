import { Skeleton } from "./Skeleton";

export default function LeadFormSkeleton() {
    return (
        <div className="flex h-full w-full flex-col rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <Skeleton className="mb-4 h-8 w-48" />
            <Skeleton className="mb-6 h-4 w-full max-w-sm" />
            <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-11 w-full rounded-lg" />
                    </div>
                ))}
            </div>
            <Skeleton className="mt-6 h-12 w-full rounded-lg" />
        </div>
    );
}
