// import React from 'react';
// import Header from "@/layout/Header";
// import Footer from "@/layout/Footer";
// import BranchCard from "@/components/Home/BranchCard";
// import FAQ from "@/components/Home/FAQ";
// import BannerDetails from "@/components/Home/BannerDetails";
// import ContactUs from "@/components/ContactUs";

// export default function ProductContent() {
//     return (
//         <>

//             <BannerDetails />
//             <ContactUs />
//             <BranchCard />
//             <FAQ />

//         </>

//     )
// }







// app/product-content.jsx
import React from 'react';
import BannerDetails from "@/components/Home/BannerDetails";
import Featuredproduct from "@/components/Home/Featuredproduct";
import FAQ from "@/components/Home/FAQ";
import { BranchesApi } from "@/api/branches";
import { SolutionAPi } from "@/api/solutions";
import { parseBranchSlug } from "@/lib/utils";

export default async function ProductContent({ slug }) {
    // Parse slug to get storeCode
    const parsedSlug = parseBranchSlug(slug);
    const storeCode = parsedSlug.storeCode;

    // Get branch details
    const branches = await BranchesApi({ storeCode });
    const branchescard = branches?.data?.[0] || {};

    // Get branch type and fetch products
    const branchType = branchescard?.type; // "HFC" or "NBFC"

    // Fetch solutions filtered by branch type
    const solutions = await SolutionAPi(branchType);
    const solutioncard = solutions?.data || [];

    return (
        <>
            <BannerDetails />


            {/* Breadcrumb for Products Page */}
            {/* <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-4">
                    <nav className="flex items-center space-x-2 text-sm">
                        <a href="/" className="text-blue-600 hover:text-blue-800">Home</a>
                        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-gray-700 font-semibold">Products</span>
                    </nav>
                    <h1 className="mt-2 text-2xl font-bold text-gray-900">
                        {branchType ? `${branchType} Products` : 'Our Products'}
                    </h1>
                </div>
            </div> */}

            {/* ONLY Products Section */}
            <Featuredproduct solutioncard={solutioncard} branchType={branchType} />

            <FAQ />
        </>
    );
}