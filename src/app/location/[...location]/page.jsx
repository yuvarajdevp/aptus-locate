// ============================================================================
// FIXED: app/location/[...location]/page.js
// ============================================================================
import React from "react";
import BranchContainer from "@/components/Home/BranchContainer";
import { BranchesApi } from "@/api/branches";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import { handleLayoutApi } from "@/api/layout";
import { unslugify, slugify } from "@/lib/utils";
import Link from "next/link";

// Helper to decode location slug
const decodeLocationSlug = (slug) => {
    if (!slug || slug === "all-states" || slug === "all-cities" || slug === "all-localities") {
        return "";
    }
    return unslugify(slug);
};

export default async function LocationPage({ params }) {
    const locationArr = params?.location || [];
    const [stateSlug = "", citySlug = "", localitySlug = ""] = locationArr;

    // Decode slugs to get actual names
    const displayState = decodeLocationSlug(stateSlug);
    const displayCity = decodeLocationSlug(citySlug);
    const displayLocality = decodeLocationSlug(localitySlug);

    console.log("Location Page - Decoded:", { displayState, displayCity, displayLocality });

    // Build filters object for API
    const filters = {};
    if (displayState) filters.state = displayState;
    if (displayCity) filters.city = displayCity;
    if (displayLocality) filters.locality = displayLocality;

    console.log("Location Page - API Filters:", filters);

    // Fetch data with proper filters
    const [layoutResponse, branchesResponse] = await Promise.all([
        handleLayoutApi(),
        BranchesApi(filters) // Pass filters to API
    ]);

    const branchList = branchesResponse?.data || [];
    const allBranches = branchesResponse?.data || []; // For BranchContainer to show all branches
    const layout = layoutResponse?.data || {};

    console.log("Location Page - Filtered Results:", {
        totalBranches: branchList.length,
        filters
    });

    // Build breadcrumbs
    const breadcrumbItems = [
        { label: "Aptus Locator", href: "/location/all-states", active: false }
    ];

    if (displayState) {
        breadcrumbItems.push({
            label: displayState,
            href: `/location/${slugify(displayState)}`,
            active: !displayCity && !displayLocality
        });
    }

    if (displayCity) {
        breadcrumbItems.push({
            label: displayCity,
            href: `/location/${slugify(displayState)}/${slugify(displayCity)}`,
            active: !displayLocality
        });
    }

    if (displayLocality) {
        breadcrumbItems.push({
            label: displayLocality,
            href: `/location/${slugify(displayState)}/${slugify(displayCity)}/${slugify(displayLocality)}`,
            active: true
        });
    }

    const pageTitle = [displayLocality, displayCity, displayState].filter(Boolean).join(", ") || "All Locations";

    return (
        <>
            <Header />

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-4">
                    <nav className="flex items-center space-x-2 text-sm">
                        <svg
                            className="h-5 w-5 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        {breadcrumbItems.map((item, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && (
                                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                )}
                                {item.active ? (
                                    <span className="text-gray-700 font-semibold">{item.label}</span>
                                ) : (
                                    <Link href={item.href} className="text-blue-600 hover:text-blue-800 hover:underline">
                                        {item.label}
                                    </Link>
                                )}
                            </React.Fragment>
                        ))}
                    </nav>

                    <div className="mt-3 text-sm text-gray-600">
                        <span className="font-semibold text-gray-800">{branchList.length}</span>
                        {" "}branch{branchList.length !== 1 ? 'es' : ''} found
                        {pageTitle !== "All Locations" && ` in ${pageTitle}`}
                    </div>
                </div>
            </div>

            {/* No results warning */}
            {branchList.length === 0 && (
                <div className="container mx-auto px-4 py-8">
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                        <h3 className="text-sm font-medium text-yellow-800">
                            No branches found in {pageTitle}
                        </h3>
                        <p className="mt-2 text-sm text-yellow-700">
                            Try searching for a nearby city or view all branches.
                        </p>
                        <div className="mt-4">
                            <Link href="/location/all-states" className="inline-flex px-4 py-2 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200">
                                View All Branches
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <BranchContainer
                branchList={allBranches} // Pass all branches for reference
                filteredBranches={branchList} // Pass API-filtered branches
                filters={{
                    state: displayState,
                    city: displayCity,
                    locality: displayLocality
                }}
            />

            <Footer aboutDetails={layout} />
        </>
    );
}
