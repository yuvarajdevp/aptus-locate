import React from "react";
import BranchDetails from "@/components/Home/BranchDetails";
import FAQ from "@/components/Home/FAQ";
import LeadForm from "@/components/LeadForm";
import Featuredproduct from "@/components/Home/Featuredproduct";
import BannerDetails from "@/components/Home/BannerDetails";
import ArticlesCard from "@/components/Home/ArticlesCard";
import { SolutionAPi } from "@/api/solutions";
import Link from "next/link";
import { parseBranchSlug } from "@/lib/utils";
import { CALLBACK_FORM_SECTION_ID } from "@/lib/branchNav";
import { getBranchBySlug } from "@/lib/getBranchBannerProps";
import { buildOverviewBreadcrumbs } from "@/lib/breadcrumb-helpers";
import { unwrapApiList } from "@/lib/apiHelpers";
import { type } from "@/lib/typography";

export default async function OverviewContent({ slug }) {
    try {
        const parsedSlug = parseBranchSlug(slug);
        const storeCode = parsedSlug.storeCode;

        const branchescard = (await getBranchBySlug(slug)) || {};
        const branchType = branchescard?.type;

        const solutions = branchType ? await SolutionAPi(branchType) : { data: [] };
        const solutioncard = unwrapApiList(solutions);

        const branchState = branchescard?.state?.state || "";
        const breadcrumbItems = buildOverviewBreadcrumbs(branchescard);

        return (
            <>
                <BannerDetails
                    state={branchState}
                    branchType={branchType}
                    bannerRef={storeCode || slug}
                    scrollTargetId={CALLBACK_FORM_SECTION_ID}
                />

                {breadcrumbItems.length > 1 && (
                    <div className="bg-white border-b border-gray-200">
                        <div className="container mx-auto px-3 py-2 md:px-4 md:py-4">
                            <nav className={`flex items-center flex-wrap gap-1 md:gap-2 ${type.breadcrumb}`}>
                                <svg
                                    className="h-3.5 w-3.5 shrink-0 text-blue-500 md:h-5 md:w-5"
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
                                                className="h-3 w-3 shrink-0 text-gray-400 md:h-4 md:w-4"
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
                                            <span className="font-semibold text-gray-700">
                                                {item.label}
                                            </span>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                className="font-medium text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                                            >
                                                {item.label}
                                            </Link>
                                        )}
                                    </React.Fragment>
                                ))}
                            </nav>

                            {branchType && (
                                <div className="mt-2 flex items-center md:mt-3">
                                    <span
                                        className={`inline-flex items-center rounded-full px-2 py-0.5 md:px-3 md:py-1 ${type.label} ${
                                            branchType === "HFC"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-blue-100 text-blue-800"
                                        }`}
                                    >
                                        {branchType === "HFC"
                                            ? "Housing Finance Company"
                                            : "Non-Banking Financial Company"}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div
                    id={CALLBACK_FORM_SECTION_ID}
                    className="mx-auto w-full max-w-screen-xl scroll-mt-28 px-4 py-6"
                >
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
                        <div className="flex min-h-0 min-w-0 flex-col lg:col-span-7">
                            <BranchDetails branchList={branchescard} slug={storeCode} />
                        </div>
                        <div className="flex min-h-0 min-w-0 flex-col lg:col-span-5">
                            <LeadForm />
                        </div>
                    </div>
                </div>

                {solutioncard.length > 0 ? (
                    <Featuredproduct solutioncard={solutioncard} branchType={branchType} />
                ) : (
                    <div className="mx-auto max-w-screen-xl px-4 py-12">
                        <div className="rounded-lg bg-gray-50 p-8 text-center">
                            <p className={`mb-2 ${type.body}`}>
                                No products available for {branchType} branches
                            </p>
                            <p className={type.meta}>
                                Branch Type: {branchType} | Store Code: {storeCode}
                            </p>
                        </div>
                    </div>
                )}

                <div className="mx-auto w-full max-w-screen-xl px-4">
                    <ArticlesCard branchSlug={slug} />
                </div>

                <FAQ />
            </>
        );
    } catch (error) {
        console.error("Error loading overview content:", error);

        return (
            <>
                <BannerDetails />
                <div className="container mx-auto px-4 py-12">
                    <div className="rounded-lg bg-red-50 p-8 text-center">
                        <p className={`mb-2 ${type.body} text-red-600`}>
                            Unable to load branch details
                        </p>
                        <p className={type.meta}>
                            Please try again later or contact support
                        </p>
                    </div>
                </div>
            </>
        );
    }
}
