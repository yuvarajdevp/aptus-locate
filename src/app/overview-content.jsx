// // overview-content.jsx - Fixed with Articles component
// import React from "react";
// import BranchDetails from "@/components/Home/BranchDetails";
// import FAQ from "@/components/Home/FAQ";
// import LeadForm from "@/components/LeadForm";
// import Featuredproduct from "@/components/Home/Featuredproduct";
// import BannerDetails from "@/components/Home/BannerDetails";
// import ArticlesCard from "@/components/Home/ArticlesCard"; // ✅ Changed back to Home/Articles
// import { BranchesApi } from "@/api/branches";
// import { handleBlogsApi } from "@/api/blogs";
// import { SolutionAPi } from "@/api/solutions";
// import Link from "next/link";
// import { slugify, parseBranchSlug } from "@/lib/utils";

// export default async function OverviewContent({ slug }) {
//     // Parse the slug to extract storeCode
//     const parsedSlug = parseBranchSlug(slug);
//     const storeCode = parsedSlug.storeCode;

//     // ✅ Get branch details
//     const branches = await BranchesApi({ storeCode });
//     const branchescard = branches?.data?.[0] || {};

//     // 🔥 Get branch type and fetch products accordingly
//     const branchType = branchescard?.type; // "HFC" or "NBFC"

//     // ✅ Fetch solutions filtered by branch type
//     const solutions = await SolutionAPi(branchType);
//     const solutioncard = solutions?.data || [];

//     // Extract location data from branch
//     const branchState = branchescard?.state?.state || "";
//     const branchCity = branchescard?.city?.city || "";
//     const branchLocality = branchescard?.locality || "";
//     const branchName = branchescard?.branch_name || "";

//     // ✅ Helper function to build location URLs
//     function buildLocationURL(state, city, locality) {
//         const parts = ["/location"];
//         if (state) parts.push(slugify(state));
//         if (city) parts.push(slugify(city));
//         if (locality) parts.push(slugify(locality));
//         return parts.join("/");
//     }

//     // Build breadcrumb items
//     const breadcrumbItems = [
//         {
//             label: "Aptus Locator",
//             href: "/location/all-states",
//             active: false
//         }
//     ];

//     if (branchState) {
//         breadcrumbItems.push({
//             label: `${branchState}`,
//             href: buildLocationURL(branchState, "", ""),
//             active: false
//         });
//     }

//     if (branchCity) {
//         breadcrumbItems.push({
//             label: `${branchCity}`,
//             href: buildLocationURL(branchState, branchCity, ""),
//             active: false
//         });
//     }

//     if (branchLocality) {
//         breadcrumbItems.push({
//             label: `${branchLocality}`,
//             href: buildLocationURL(branchState, branchCity, branchLocality),
//             active: false
//         });
//     }

//     if (branchName) {
//         breadcrumbItems.push({
//             label: branchName,
//             href: "#",
//             active: true
//         });
//     }

//     return (
//         <>
//             <BannerDetails />

//             {/* Breadcrumb Navigation */}
//             {breadcrumbItems.length > 1 && (
//                 <div className="bg-white border-b border-gray-200">
//                     <div className="container mx-auto px-4 py-4">
//                         <nav className="flex items-center flex-wrap gap-2 text-sm">
//                             <svg
//                                 className="h-5 w-5 text-blue-500"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                                 />
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                                 />
//                             </svg>
//                             {breadcrumbItems.map((item, index) => (
//                                 <React.Fragment key={index}>
//                                     {index > 0 && (
//                                         <svg
//                                             className="h-4 w-4 text-gray-400 flex-shrink-0"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke="currentColor"
//                                         >
//                                             <path
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                                 strokeWidth="2"
//                                                 d="M9 5l7 7-7 7"
//                                             />
//                                         </svg>
//                                     )}
//                                     {item.active ? (
//                                         <span className="text-gray-700 font-semibold">
//                                             {item.label}
//                                         </span>
//                                     ) : (
//                                         <Link
//                                             href={item.href}
//                                             className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
//                                         >
//                                             {item.label}
//                                         </Link>
//                                     )}
//                                 </React.Fragment>
//                             ))}
//                         </nav>

//                         {/* Branch Type Badge */}
//                         {branchType && (
//                             <div className="mt-3 flex items-center space-x-2">
//                                 <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${branchType === 'HFC'
//                                     ? 'bg-green-100 text-green-800'
//                                     : 'bg-blue-100 text-blue-800'
//                                     }`}>
//                                     {branchType === 'HFC' ? '🏠 Housing Finance Company' : '🏢 Non-Banking Financial Company'}
//                                 </span>
//                                 <span className="text-xs text-gray-500">
//                                     ({solutioncard.length} products available)
//                                 </span>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}

//             <div className="container mx-auto grid md:grid-cols-12 gap-6 px-4 py-6">
//                 <div className="col-span-12 md:col-span-7">
//                     <BranchDetails branchList={branchescard} slug={storeCode} />
//                 </div>

//                 <div className="col-span-12 md:col-span-5">
//                     <LeadForm />
//                 </div>
//             </div>

//             {/* Products grouped by category - Filtered by branch type */}
//             {solutioncard.length > 0 ? (
//                 <Featuredproduct solutioncard={solutioncard} branchType={branchType} />
//             ) : (
//                 <div className="container mx-auto px-4 py-12">
//                     <div className="text-center bg-gray-50 rounded-lg p-8">
//                         <p className="text-gray-600 text-lg mb-2">
//                             No products available for {branchType} branches
//                         </p>
//                         <p className="text-gray-500 text-sm">
//                             Branch Type: {branchType} | Store Code: {storeCode}
//                         </p>
//                     </div>
//                 </div>
//             )}

//             {/* ✅ Articles Section - Shows 3 articles with View All button */}
//             <div className="container-fluid  mx-auto px-16">
//                 <ArticlesCard slug={branchSlug} />
//             </div>

//             <div className="container-fluid mx-auto">
//                 <FAQ />
//             </div >
//         </>
//     );
// }
// overview-content.jsx - Fixed slug passing to Articles
import React from "react";
import BranchDetails from "@/components/Home/BranchDetails";
import FAQ from "@/components/Home/FAQ";
import LeadForm from "@/components/LeadForm";
import Featuredproduct from "@/components/Home/Featuredproduct";
import BannerDetails from "@/components/Home/BannerDetails";
import ArticlesCard from "@/components/Home/ArticlesCard";
import { BranchesApi } from "@/api/branches";
import { handleBlogsApi } from "@/api/blogs";
import { SolutionAPi } from "@/api/solutions";
import Link from "next/link";
import { slugify, parseBranchSlug } from "@/lib/utils";

export default async function OverviewContent({ slug }) {
    // Parse the slug to extract storeCode
    const parsedSlug = parseBranchSlug(slug);
    const storeCode = parsedSlug.storeCode;

    // ✅ Get branch details
    const branches = await BranchesApi({ storeCode });
    const branchescard = branches?.data?.[0] || {};

    // 🔥 Get branch type and fetch products accordingly
    const branchType = branchescard?.type; // "HFC" or "NBFC"

    // ✅ Fetch solutions filtered by branch type
    const solutions = await SolutionAPi(branchType);
    const solutioncard = solutions?.data || [];

    // Extract location data from branch
    const branchState = branchescard?.state?.state || "";
    const branchCity = branchescard?.city?.city || "";
    const branchLocality = branchescard?.locality || "";
    const branchName = branchescard?.branch_name || "";

    // ✅ Helper function to build location URLs
    function buildLocationURL(state, city, locality) {
        const parts = ["/location"];
        if (state) parts.push(slugify(state));
        if (city) parts.push(slugify(city));
        if (locality) parts.push(slugify(locality));
        return parts.join("/");
    }

    // Build breadcrumb items
    const breadcrumbItems = [
        {
            label: "Aptus Locator",
            href: "/location/all-states",
            active: false
        }
    ];

    if (branchState) {
        breadcrumbItems.push({
            label: `${branchState}`,
            href: buildLocationURL(branchState, "", ""),
            active: false
        });
    }

    if (branchCity) {
        breadcrumbItems.push({
            label: `${branchCity}`,
            href: buildLocationURL(branchState, branchCity, ""),
            active: false
        });
    }

    if (branchLocality) {
        breadcrumbItems.push({
            label: `${branchLocality}`,
            href: buildLocationURL(branchState, branchCity, branchLocality),
            active: false
        });
    }

    if (branchName) {
        breadcrumbItems.push({
            label: branchName,
            href: "#",
            active: true
        });
    }

    return (
        <>
            <BannerDetails />

            {/* Breadcrumb Navigation */}
            {breadcrumbItems.length > 1 && (
                <div className="bg-white border-b border-gray-200">
                    <div className="container mx-auto px-4 py-4">
                        <nav className="flex items-center flex-wrap gap-2 text-sm">
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
                                        <svg
                                            className="h-4 w-4 text-gray-400 flex-shrink-0"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    )}
                                    {item.active ? (
                                        <span className="text-gray-700 font-semibold">
                                            {item.label}
                                        </span>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </React.Fragment>
                            ))}
                        </nav>

                        {/* Branch Type Badge */}
                        {branchType && (
                            <div className="mt-3 flex items-center space-x-2">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${branchType === 'HFC'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-blue-100 text-blue-800'
                                    }`}>
                                    {branchType === 'HFC' ? ' Housing Finance Company' : ' Non-Banking Financial Company'}
                                </span>
                                {/* <span className="text-xs text-gray-500">
                                    ({solutioncard.length} products available)
                                </span> */}
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="container mx-auto grid md:grid-cols-12 gap-6 px-4 py-6">
                <div className="col-span-12 md:col-span-7">
                    <BranchDetails branchList={branchescard} slug={storeCode} />
                </div>

                <div className="col-span-12 md:col-span-5">
                    <LeadForm />
                </div>
            </div>

            {/* Products grouped by category - Filtered by branch type */}
            {solutioncard.length > 0 ? (
                <Featuredproduct solutioncard={solutioncard} branchType={branchType} />
            ) : (
                <div className="container mx-auto px-4 py-12">
                    <div className="text-center bg-gray-50 rounded-lg p-8">
                        <p className="text-gray-600 text-lg mb-2">
                            No products available for {branchType} branches
                        </p>
                        <p className="text-gray-500 text-sm">
                            Branch Type: {branchType} | Store Code: {storeCode}
                        </p>
                    </div>
                </div>
            )}

            {/* ✅ FIXED: Pass the actual slug to ArticlesCard */}
            <div className="container-fluid mx-auto px-16">
                <ArticlesCard branchSlug={slug} />
            </div>

            <div className="container-fluid mx-auto">
                <FAQ />
            </div>
        </>
    );
}