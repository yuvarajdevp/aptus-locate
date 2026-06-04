import { Skeleton } from "./Skeleton";

export default function FAQSkeleton() {
    return (
        <>
            <section className="my-12 w-full overflow-hidden md:my-20">
                <Skeleton className="aspect-[24/5] w-full rounded-none" />
            </section>
            <div className="container mx-auto max-w-screen-xl px-4">
                <Skeleton className="mb-10 h-10 w-96 max-w-full" />
                <div className="rounded-xl bg-[#E8FAFF] p-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {[0, 1].map((col) => (
                            <div key={col} className="space-y-4">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <Skeleton key={i} className="h-20 w-full rounded-lg" />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
