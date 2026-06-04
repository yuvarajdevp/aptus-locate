"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import SearchFilters from "@/components/Home/SearchFilters";
import BranchCard from "@/components/Home/BranchCard";
import BranchCardGridSkeleton from "@/components/skeletons/BranchCardGridSkeleton";

export default function BranchContainer({
    branchList = [],
    filteredBranches = [],
    filters = {},
}) {
    const pathname = usePathname();
    const showHours = pathname?.startsWith("/location");
    const [displayBranches, setDisplayBranches] = useState(filteredBranches);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isBranchListLoading, setIsBranchListLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(
        Boolean(filters.state || filters.city || filters.locality)
    );

    const prevFilteredBranchesRef = useRef(filteredBranches);

    useEffect(() => {
        const prevBranches = prevFilteredBranchesRef.current;
        const hasChanged =
            prevBranches.length !== filteredBranches.length ||
            prevBranches.some((b, i) => b?.id !== filteredBranches[i]?.id);

        if (hasChanged || !isSearchActive) {
            setDisplayBranches(filteredBranches);
            prevFilteredBranchesRef.current = filteredBranches;
            if (hasChanged) {
                setIsSearchActive(false);
                setHasSearched(
                    Boolean(filters.state || filters.city || filters.locality)
                );
            }
        }
    }, [filteredBranches, isSearchActive, filters]);

    const handleSearchUpdate = (searchResults, isReset = false) => {
        if (isReset) {
            setIsSearchActive(false);
            setHasSearched(false);
            setDisplayBranches(filteredBranches);
            return;
        }

        setIsSearchActive(true);
        setHasSearched(true);
        setDisplayBranches(searchResults);
    };

    const hasActiveFilters = filters.state || filters.city || filters.locality;

    const showCardSkeleton =
        isBranchListLoading &&
        displayBranches.length === 0 &&
        !hasSearched;

    const skeletonCount = Math.max(displayBranches.length || 6, 6);

    return (
        <div>
            <SearchFilters
                branchList={branchList}
                onSearch={handleSearchUpdate}
                initialFilters={filters}
                onLoadingChange={setIsBranchListLoading}
            />

            <div id="branch-results" className="min-h-[200px]">
                {showCardSkeleton && (
                    <BranchCardGridSkeleton count={skeletonCount} />
                )}

                {!showCardSkeleton && displayBranches?.length > 0 && (
                    <BranchCard branchList={displayBranches} showHours={showHours} />
                )}

                {!showCardSkeleton &&
                    (!displayBranches || displayBranches.length === 0) && (
                        <div className="container mx-auto px-4 py-8">
                            <div className="py-12 text-center">
                                <svg
                                    className="mx-auto mb-4 h-12 w-12 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                                    No branches found
                                </h3>
                                <p className="mb-8 text-gray-600">
                                    {hasActiveFilters || hasSearched
                                        ? "Try adjusting your search filters or selecting different options"
                                        : "Select State and City, then click Search to find branches"}
                                </p>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}
