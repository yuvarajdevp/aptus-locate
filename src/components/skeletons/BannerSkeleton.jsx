import { Skeleton } from "./Skeleton";

export default function BannerSkeleton() {
    return (
        <div className="w-full overflow-hidden">
            <Skeleton className="aspect-[21/7] w-full rounded-none md:aspect-[21/6]" />
        </div>
    );
}
