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
            BranchesApi(),
        ]);

        const branchList = branchesResponse?.data || [];
        const layout = layoutResponse?.data || {};

        return (
            <div>
                <Header />
                <BranchContainer
                    branchList={branchList}
                    filteredBranches={branchList.slice(0, 9)}
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
                    <h2 className="mb-4 text-2xl font-bold text-red-600">Error Loading</h2>
                    <p className="text-gray-600">Please try again later.</p>
                </div>
                <Footer aboutDetails={{}} />
            </div>
        );
    }
}
