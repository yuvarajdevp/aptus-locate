import { Skeleton } from "./Skeleton";

export default function BranchDetailsSkeleton() {
    return (
        <section className="flex w-full flex-col py-1">
            <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
                <Skeleton className="h-14 w-full rounded-none bg-[#6F75E0]/30" />
                <div className="flex flex-col gap-4 bg-[#F6FAFF] p-4 sm:p-5 lg:flex-row lg:gap-6 lg:p-6">
                    <div className="flex flex-1 flex-col gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex gap-3">
                                <Skeleton className="h-5 w-5 shrink-0 rounded-full" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-3 w-full" />
                                </div>
                            </div>
                        ))}
                        <div className="mt-auto flex gap-2 pt-2">
                            {[1, 2, 3].map((i) => (
                                <Skeleton key={i} className="h-10 flex-1 rounded-2xl sm:rounded-full" />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col items-center border-t border-[#d6e4f5] pt-4 lg:w-[180px] lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                        <Skeleton className="mb-2 h-28 w-28 rounded-lg lg:h-36 lg:w-36" />
                        <Skeleton className="h-4 w-28" />
                    </div>
                </div>
            </div>
        </section>
    );
}
