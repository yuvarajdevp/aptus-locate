// ============================================================================
// 1. FIXED: app/page.js (Home Page)
// ============================================================================
// app/page.js
import React from "react";
import BranchContainer from "@/components/Home/BranchContainer";
import { BranchesApi } from "@/api/branches";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import { handleLayoutApi } from "@/api/layout";

export default async function Home() {
    try {
        const [layoutResponse, branchesResponse] = await Promise.all([
            handleLayoutApi(),
            BranchesApi()
        ]);

        const branchList = branchesResponse?.data || [];
        const layout = layoutResponse?.data || {};

        console.log("Home - Total branches:", branchList.length);

        return (
            <div>
                <Header />
                <BranchContainer
                    branchList={branchList}
                    filteredBranches={branchList.slice(0, 9)} // Show first 9 initially
                    filters={{}}
                />
                <Footer aboutDetails={layout} />
            </div>
        );
    } catch (error) {
        console.error("Home Page Error:", error);
        return (
            <div>
                <Header />
                <div className="container mx-auto px-4 py-16 text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading</h2>
                    <p className="text-gray-600">Please try again later.</p>
                </div>
                <Footer aboutDetails={{}} />
            </div>
        );
    }
}