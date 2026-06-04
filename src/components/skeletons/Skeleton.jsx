import { cn } from "@/lib/utils";

export function Skeleton({ className }) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-gray-200/80", className)}
            aria-hidden
        />
    );
}
