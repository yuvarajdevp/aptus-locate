// ============================================================================
// 1. app/[...slug]/page.jsx - FIXED ROUTE HANDLER
// ============================================================================
import React from "react";
import { redirect } from "next/navigation";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import MobileActions from "@/layout/MobileActions";
import OverviewContent from "@/app/overview-content";
import Articles from "@/app/articles";
import SingleArticle from "@/app/single-article"; // ✅ NEW
import ProductContent from "@/app/product-content";
import Gallery from "@/app/gallery";
import ContactContent from "@/app/contact-content";
import NotFound from "@/app/not-found";
import { handleLayoutApi } from "@/api/layout";
import ScrollToPageTop from "@/components/ScrollToPageTop";

export default async function DynamicPage({ params }) {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug || [];
    const lastSegment = slug[slug.length - 1];
    const secondLastSegment = slug[slug.length - 2];
    const branchSlug = slug[0]; // Full branch path segment (parsed via parseBranchSlug)

    // ✅ CRITICAL: Exclude root articles route from dynamic handler
    if (slug[0] === "articles" && slug.length === 1) {
        return <NotFound />;
    }

    if (!slug || slug.length < 2) {
        return <NotFound />;
    }

    // ✅ NEW: Handle single article page
    // Pattern: /branch-slug/articles/article-slug
    if (secondLastSegment === "articles" && slug.length >= 3) {
        const articleSlug = lastSegment;
        const branchSlug = slug.slice(0, -2).join('/'); // Everything before /articles/article-slug
        return (
            <div className="pb-24 md:pb-0">
                <Header />
                <ScrollToPageTop />
                <SingleArticle articleSlug={articleSlug} branchSlug={branchSlug} />
                <Footer aboutDetails={await handleLayoutApi().then(r => r?.data || {})} />
                <MobileActions />
            </div>
        );
    }

    // ✅ Redirect /products to /overview#products-section
    // if (lastSegment === "products") {
    //     const baseSlug = slug.slice(0, -1).join('/');
    //     redirect(`/${baseSlug}/overview#products-section`);
    // }

    const response = await handleLayoutApi();
    const layout = response?.data || {};

    const isProductsPage = lastSegment === "products";
    const scrollToTopOnLoad = !isProductsPage;

    const getPageContent = () => {
        switch (lastSegment) {
            case "overview":
                return <OverviewContent slug={branchSlug} />;
            case "contact":
                return <ContactContent slug={branchSlug} />;
            case "products":
                return <ProductContent slug={branchSlug} />;
            case "articles":
                return <Articles params={resolvedParams} />;
            case "gallery":
                return <Gallery slug={branchSlug} />;
            default:
                return <NotFound />;
        }
    };

    return (
        <div className="pb-24 md:pb-0">
            <Header />
            <ScrollToPageTop enabled={scrollToTopOnLoad} />
            {getPageContent()}
            <Footer aboutDetails={layout} />
            <MobileActions />
        </div>
    );
}
