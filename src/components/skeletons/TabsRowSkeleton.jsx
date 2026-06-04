import { Skeleton } from "./Skeleton";

export default function TabsRowSkeleton({ tabWidths = ["w-24", "w-32"] }) {
    return (
        <div className="border-b border-gray-200 bg-white">
            <div className="container mx-auto flex justify-center gap-4 px-4 py-4">
                {tabWidths.map((width, i) => (
                    <Skeleton key={i} className={`h-10 ${width} rounded-lg`} />
                ))}
            </div>
        </div>
    );
}
