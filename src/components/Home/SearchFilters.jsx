"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/utils";
import { useStates, useCities, useBranches } from "@/query/useQuery";

export default function SearchFilters({
    onSearch,
    initialFilters = {},
}) {
    const router = useRouter();

    // State management
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [locality, setLocality] = useState("");
    const [selectedTypes, setSelectedTypes] = useState(["HFC", "NBFC"]);
    const [isSearching, setIsSearching] = useState(false);

    // Track initialization
    const hasInitialized = useRef(false);

    // Fetch data from API
    const { data: statesData, isLoading: statesLoading } = useStates();
    const { data: citiesData, isLoading: citiesLoading } = useCities(state);

    // ✅ NOW INCLUDES TYPE FILTER - API will filter by type on server
    const { data: cityBranches, isLoading: branchesLoading } = useBranches(
        state && city ? {
            state,
            city,
            // Only add type filter if one type is selected
            ...(selectedTypes.length === 1 && { type: selectedTypes[0] })
        } : {}
    );

    // Debug log when cityBranches changes
    useEffect(() => {
        if (cityBranches) {
            console.log("📦 cityBranches loaded:", cityBranches.length);
            console.log("Branch types:", cityBranches.map(b => `${b.locality} (${b.type})`));
            console.log("Selected types:", selectedTypes);
        }
    }, [cityBranches, selectedTypes]);

    // Initialize filters from URL only once
    useEffect(() => {
        if (!hasInitialized.current) {
            setState(initialFilters.state || "");
            setCity(initialFilters.city || "");
            setLocality(initialFilters.locality || "");
            hasInitialized.current = true;
        }
    }, []);

    // Helper to normalize text for comparison
    const normalizeText = (text) => {
        if (!text) return "";
        return text.toString().toLowerCase().trim();
    };

    // Get unique states
    const availableStates = useMemo(() => {
        if (!statesData) return [];
        const stateMap = new Map();
        statesData.forEach(stateObj => {
            const stateValue = stateObj?.state;
            if (stateValue && typeof stateValue === 'string') {
                const trimmed = stateValue.trim();
                const normalized = normalizeText(trimmed);
                if (trimmed && !stateMap.has(normalized)) {
                    stateMap.set(normalized, trimmed);
                }
            }
        });
        return Array.from(stateMap.values()).sort((a, b) =>
            a.localeCompare(b, 'en', { sensitivity: 'base' })
        );
    }, [statesData]);

    // Get unique cities for selected state
    const availableCities = useMemo(() => {
        if (!state || !citiesData) return [];
        const cityMap = new Map();
        citiesData.forEach(cityObj => {
            const cityValue = cityObj?.city;
            if (cityValue && typeof cityValue === 'string') {
                const trimmed = cityValue.trim();
                const normalized = normalizeText(trimmed);
                if (trimmed && !cityMap.has(normalized)) {
                    cityMap.set(normalized, trimmed);
                }
            }
        });
        return Array.from(cityMap.values()).sort((a, b) =>
            a.localeCompare(b, 'en', { sensitivity: 'base' })
        );
    }, [state, citiesData]);

    // ✅ Get unique localities - NO TYPE FILTERING NEEDED (API already filtered)
    const availableLocalities = useMemo(() => {
        if (!city || !cityBranches) return [];
        const localityMap = new Map();

        cityBranches.forEach((branch) => {
            const localityValue = branch?.locality;
            if (localityValue && typeof localityValue === 'string') {
                const trimmed = localityValue.trim();
                const normalized = normalizeText(trimmed);
                if (trimmed && !localityMap.has(normalized)) {
                    localityMap.set(normalized, trimmed);
                }
            }
        });

        return Array.from(localityMap.values()).sort((a, b) =>
            a.localeCompare(b, 'en', { sensitivity: 'base' })
        );
    }, [city, cityBranches]);

    // ✅ Calculate filtered count - simpler now
    const filteredCount = useMemo(() => {
        if (!cityBranches || !city) return 0;
        let filtered = [...cityBranches];

        // Filter by locality only (type already filtered by API)
        if (locality) {
            const normalizedLocality = normalizeText(locality);
            filtered = filtered.filter(b =>
                normalizeText(b?.locality) === normalizedLocality
            );
        }

        console.log("🔢 filteredCount calculated:", filtered.length);
        console.log("Selected types:", selectedTypes);

        return filtered.length;
    }, [cityBranches, city, locality, selectedTypes]);

    // ✅ Perform client-side filtering - ONLY BY LOCALITY NOW
    const performFilter = () => {
        if (!cityBranches) return [];
        let filteredResults = [...cityBranches];

        console.log("🔍 performFilter START");
        console.log("Input branches (already type-filtered by API):", filteredResults.length);
        console.log("Locality filter:", locality || "none");

        // Filter by locality only
        if (locality) {
            const normalizedLocality = normalizeText(locality);
            filteredResults = filteredResults.filter(branch => {
                return normalizeText(branch?.locality) === normalizedLocality;
            });
            console.log("After locality filter:", filteredResults.length);
        }

        console.log("🔍 performFilter END - returning", filteredResults.length, "branches");
        return filteredResults;
    };

    // Handle search button click
    const handleSearch = async () => {
        if (!state || !city) return;
        if (!cityBranches) return;
        if (selectedTypes.length === 0) return; // Don't search if no types selected

        console.log("🚀 SEARCH BUTTON CLICKED");
        console.log("State:", state);
        console.log("City:", city);
        console.log("Locality:", locality);
        console.log("Selected types:", selectedTypes);

        setIsSearching(true);

        try {
            // Filter results (only by locality since type is already filtered by API)
            const filteredResults = performFilter();

            console.log("📤 Calling onSearch with", filteredResults.length, "branches");
            console.log("Branches:", filteredResults.map(b => `${b.locality} (${b.type})`));

            // Update parent component
            onSearch(filteredResults, false);

            // Build URL
            const urlParts = [];
            if (state) urlParts.push(slugify(state));
            if (city) urlParts.push(slugify(city));
            if (locality) urlParts.push(slugify(locality));

            const newUrl = urlParts.length > 0
                ? `/location/${urlParts.join("/")}`
                : "/location/all-states";

            console.log("🔗 Navigating to:", newUrl);

            // Navigate
            await new Promise(resolve => setTimeout(resolve, 50));
            router.push(newUrl);
        } catch (error) {
            console.error("❌ Search error:", error);
        } finally {
            setIsSearching(false);
        }
    };

    // Handle reset
    const handleReset = () => {
        console.log("🔄 RESET CLICKED");
        setState("");
        setCity("");
        setLocality("");
        setSelectedTypes(["HFC", "NBFC"]);
        // Pass empty array and isReset=true flag
        onSearch([], true);
        router.push("/location/all-states");
    };

    // Handle filter changes
    const handleStateChange = (e) => {
        setState(e.target.value);
        setCity("");
        setLocality("");
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
        setLocality("");
    };

    const handleLocalityChange = (e) => {
        setLocality(e.target.value);
    };

    const handleTypeToggle = (type) => {
        console.log("🔘 Type toggle:", type);
        setSelectedTypes(prev => {
            const newTypes = prev.includes(type)
                ? prev.filter(t => t !== type)
                : [...prev, type];
            console.log("New selected types:", newTypes);

            // Reset locality when type changes (localities might be different)
            setLocality("");

            return newTypes;
        });
    };

    const hasActiveFilters = state && city;
    const canSearch = state && city && selectedTypes.length > 0 && cityBranches && cityBranches.length > 0;

    return (
        <div className="container bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-8 rounded-xl shadow-lg mx-auto mt-8 mb-6 border border-blue-100">
            {/* Header */}
            <div className="text-center mb-6">
                <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-2">
                    Find <span className="text-blue-600">Aptus Value Housing Finance</span> Branches
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                    Select location filters and click Search to find branches
                </p>
            </div>

            {/* Results Count Badge */}
            {hasActiveFilters && filteredCount > 0 && (
                <div className="text-center mb-6">
                    <div className="inline-flex items-center space-x-4 bg-white/70 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 md:py-3 border border-blue-200">
                        <div className="flex items-center space-x-2">
                            <svg className="h-4 w-4 md:h-5 md:w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span className="font-semibold text-gray-800 text-sm md:text-base">
                                {filteredCount}
                            </span>
                            <span className="text-gray-600 text-sm md:text-base">
                                branch{filteredCount !== 1 ? 'es' : ''} found
                            </span>
                        </div>
                        <div className="flex items-center space-x-2 text-blue-600">
                            <span className="text-xs md:text-sm font-medium">
                                {[
                                    state,
                                    city,
                                    locality,
                                    selectedTypes.length === 1 ? `(${selectedTypes[0]})` : ''
                                ].filter(Boolean).join(" → ")}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Filter Dropdowns */}
            <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-6">
                {/* State Dropdown */}
                <div className="space-y-2">
                    <label className="flex items-center justify-between text-sm font-semibold text-gray-700">
                        <span>Select State</span>
                        <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                            {statesLoading ? "..." : availableStates.length}
                        </span>
                    </label>
                    <select
                        value={state}
                        onChange={handleStateChange}
                        disabled={statesLoading}
                        className="w-full border-2 border-gray-200 rounded-lg px-3 md:px-4 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/90 text-sm md:text-base"
                    >
                        <option value="">All States</option>
                        {availableStates.map((s, idx) => (
                            <option key={idx} value={s}>{s}</option>
                        ))}
                    </select>
                </div>

                {/* City Dropdown */}
                <div className="space-y-2">
                    <label className="flex items-center justify-between text-sm font-semibold text-gray-700">
                        <span>Select City</span>
                        {state && (
                            <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                                {citiesLoading ? "..." : availableCities.length}
                            </span>
                        )}
                    </label>
                    <select
                        value={city}
                        onChange={handleCityChange}
                        disabled={!state || citiesLoading}
                        className={`w-full border-2 rounded-lg px-3 md:px-4 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base ${!state || citiesLoading ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'bg-white/90'}`}
                    >
                        <option value="">
                            {!state ? "Select State First" : citiesLoading ? "Loading..." : "All Cities"}
                        </option>
                        {availableCities.map((c, idx) => (
                            <option key={idx} value={c}>{c}</option>
                        ))}
                    </select>
                </div>

                {/* Locality Dropdown */}
                <div className="space-y-2">
                    <label className="flex items-center justify-between text-sm font-semibold text-gray-700">
                        <span>Select Locality</span>
                        {city && (
                            <span className={`text-xs px-2 py-1 rounded-full ${availableLocalities.length === 0
                                ? 'text-amber-600 bg-amber-100'
                                : 'text-blue-600 bg-blue-100'
                                }`}>
                                {branchesLoading ? "..." : availableLocalities.length}
                            </span>
                        )}
                    </label>
                    <select
                        value={locality}
                        onChange={handleLocalityChange}
                        disabled={!city || branchesLoading || availableLocalities.length === 0}
                        className={`w-full border-2 rounded-lg px-3 md:px-4 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base ${!city || branchesLoading || availableLocalities.length === 0
                            ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                            : 'bg-white/90'
                            }`}
                    >
                        <option value="">
                            {!city
                                ? "📍 Select City First"
                                : branchesLoading
                                    ? "Loading..."
                                    : availableLocalities.length === 0
                                        ? "📍 No localities available"
                                        : "📍 All Localities"
                            }
                        </option>
                        {availableLocalities.map((l, idx) => (
                            <option key={idx} value={l}>{l}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Type Checkboxes */}
            <div className="mb-6 bg-white/70 backdrop-blur-sm rounded-lg p-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={selectedTypes.includes('HFC')}
                            onChange={() => handleTypeToggle('HFC')}
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">
                            HFC (Housing Finance)
                        </span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={selectedTypes.includes('NBFC')}
                            onChange={() => handleTypeToggle('NBFC')}
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">
                            NBFC (Non-Banking Financial)
                        </span>
                    </label>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
                <button
                    onClick={handleReset}
                    disabled={isSearching}
                    className="flex items-center justify-center space-x-2 border-2 border-blue-600 text-blue-600 px-6 md:px-8 py-2 md:py-3 rounded-lg hover:bg-blue-50 transition font-medium text-sm md:text-base disabled:opacity-50"
                >
                    <span>Reset Filters</span>
                </button>
                <button
                    onClick={handleSearch}
                    disabled={isSearching || !canSearch}
                    className="flex items-center justify-center space-x-2 bg-blue-700 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium shadow-lg text-sm md:text-base"
                >
                    {isSearching ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Searching...</span>
                        </>
                    ) : (
                        <>
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <span>Search Branches</span>
                        </>
                    )}
                </button>
            </div>

            {/* Help Text */}
            {!canSearch && (
                <div className="mt-4 text-center">
                    <p className="text-xs md:text-sm text-gray-500">
                        {!state || !city
                            ? "💡 Select State and City, then click Search to view results"
                            : selectedTypes.length === 0
                                ? "⚠️ Please select at least one branch type (HFC or NBFC)"
                                : (!cityBranches || cityBranches.length === 0)
                                    ? "No branches found for selected filters"
                                    : "💡 Click Search to view results"
                        }
                    </p>
                </div>
            )}
        </div>
    );
}