import React from "react";
import BranchPageBanner from "@/components/Home/BranchPageBanner";
import Featuredproduct from "@/components/Home/Featuredproduct";
import FAQ from "@/components/Home/FAQ";
import { SolutionAPi } from "@/api/solutions";
import { getBranchBySlug } from "@/lib/getBranchBannerProps";
import { unwrapApiList } from "@/lib/apiHelpers";

export default async function ProductContent({ slug }) {
    const branchescard = (await getBranchBySlug(slug)) || {};
    const branchType = branchescard?.type;

    const solutions = branchType ? await SolutionAPi(branchType) : { data: [] };
    const solutioncard = unwrapApiList(solutions);

    return (
        <>
            <BranchPageBanner slug={slug} />
            <Featuredproduct solutioncard={solutioncard} branchType={branchType} />
            <FAQ />
        </>
    );
}
