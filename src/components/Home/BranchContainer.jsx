"use client";
import { useState, useEffect, useRef } from "react";
import SearchFilters from "@/components/Home/SearchFilters";
import BranchCard from "@/components/Home/BranchCard";

export default function BranchContainer({
    branchList = [],
    filteredBranches = [],
    filters = {}
}) {
    // State to track displayed branches
    const [displayBranches, setDisplayBranches] = useState(filteredBranches);
    const [isSearchActive, setIsSearchActive] = useState(false);

    // Track the previous filteredBranches to detect actual server data changes
    const prevFilteredBranchesRef = useRef(filteredBranches);

    // Debug logs
    useEffect(() => {
        console.log("=== BranchContainer Debug ===");
        console.log("filteredBranches from server:", filteredBranches?.length);
        console.log("displayBranches state:", displayBranches?.length);
        console.log("isSearchActive:", isSearchActive);
        console.log("filters:", filters);
    }, [filteredBranches, displayBranches, isSearchActive, filters]);

    // Update display when server-side filtered branches change (URL navigation)
    useEffect(() => {
        // Check if filteredBranches actually changed (not just re-rendered with same data)
        const prevBranches = prevFilteredBranchesRef.current;
        const hasChanged =
            prevBranches.length !== filteredBranches.length ||
            prevBranches.some((b, i) => b?.id !== filteredBranches[i]?.id);

        console.log("🔄 filteredBranches effect triggered");
        console.log("Previous count:", prevBranches?.length);
        console.log("New count:", filteredBranches?.length);
        console.log("Actually changed:", hasChanged);
        console.log("isSearchActive:", isSearchActive);

        // Always update when server data changes OR when search is not active
        if (hasChanged || !isSearchActive) {
            console.log("✅ Syncing display with server data");
            setDisplayBranches(filteredBranches);
            prevFilteredBranchesRef.current = filteredBranches;
            // Reset search active flag when server data changes
            if (hasChanged) {
                setIsSearchActive(false);
            }
        } else {
            console.log("⏸️ Search active and no server change - keeping filtered results");
        }
    }, [filteredBranches, isSearchActive]);

    // Handle search from SearchFilters component
    const handleSearchUpdate = (searchResults, isReset = false) => {
        console.log("🔍 Search triggered from SearchFilters");
        console.log("Is Reset:", isReset);
        console.log("Filtered results:", searchResults?.length, "branches");
        console.log("Branch types:", searchResults?.map(b => `${b.locality} (${b.type})`));

        if (isReset) {
            // For reset, always sync with server data
            console.log("🔄 Reset detected - syncing with server");
            setIsSearchActive(false);
            setDisplayBranches(filteredBranches);
        } else {
            setIsSearchActive(true);
            setDisplayBranches(searchResults);
        }

        console.log("✅ displayBranches updated");
    };

    // Determine if user has selected filters
    const hasActiveFilters = filters.state || filters.city || filters.locality;

    // Final render check
    console.log("🎨 Rendering BranchCard with:", displayBranches?.length, "branches");

    return (
        <div className="">
            <SearchFilters
                branchList={branchList}
                onSearch={handleSearchUpdate}
                initialFilters={filters}
            />

            {/* Debug Info */}
            {/* <div className="container mx-auto px-4 py-2">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs">
                    <strong>Debug:</strong> Displaying {displayBranches?.length || 0} branches
                    {isSearchActive ? " (from search)" : " (from server)"}
                </div>
            </div> */}

            {/* Show branches */}
            {displayBranches && displayBranches.length > 0 && (
                <BranchCard branchList={displayBranches} />
            )}

            {/* No results message */}
            {(!displayBranches || displayBranches.length === 0) && (
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center py-12">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400 mb-4"
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
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            No branches found
                        </h3>
                        <p className="text-gray-600 mb-8">
                            {hasActiveFilters
                                ? "Try adjusting your search filters or selecting different options"
                                : "Select State and City, then click Search to find branches"
                            }
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}