import { Skeleton } from "./Skeleton";

export default function BreadcrumbSkeleton() {
    return (
        <div className="border-b border-gray-200 bg-white">
            <div className="container mx-auto space-y-3 px-4 py-4">
                <div className="flex flex-wrap items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-6 w-40 rounded-full" />
            </div>
        </div>
    );
}
