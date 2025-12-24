// ============================================================================
// 1. app/[...slug]/page.jsx - FIXED ROUTE HANDLER
// ============================================================================
import React from "react";
import { redirect } from "next/navigation";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import OverviewContent from "@/app/overview-content";
import Articles from "@/app/articles";
import SingleArticle from "@/app/single-article"; // ✅ NEW
import ProductContent from "@/app/product-content";
import Gallery from "@/app/gallery";
import ContactContent from "@/app/contact-content";
import NotFound from "@/app/not-found";
import { handleLayoutApi } from "@/api/layout";

export default async function DynamicPage({ params }) {
    const slug = params?.slug || [];
    const lastSegment = slug[slug.length - 1];
    const secondLastSegment = slug[slug.length - 2];
    const storeCode = slug[0]; // First segment is always the branch

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
            <>
                <Header />
                <SingleArticle articleSlug={articleSlug} branchSlug={branchSlug} />
                <Footer aboutDetails={await handleLayoutApi().then(r => r?.data || {})} />
            </>
        );
    }

    // ✅ Redirect /products to /overview#products-section
    // if (lastSegment === "products") {
    //     const baseSlug = slug.slice(0, -1).join('/');
    //     redirect(`/${baseSlug}/overview#products-section`);
    // }

    const response = await handleLayoutApi();
    const layout = response?.data || {};

    const getPageContent = () => {
        switch (lastSegment) {
            case "overview":
                return <OverviewContent slug={storeCode} />;
            case "contact":
                return <ContactContent />;
            case "products":
                return <ProductContent slug={storeCode} />;
            case "articles":
                // Articles list page: /branch-slug/articles
                return <Articles params={params} />;
            case "gallery":
                // Articles list page: /branch-slug/articles
                return <Gallery />;
            default:
                return <NotFound />;
        }
    };

    return (
        <>
            <Header />
            <div>{getPageContent()}</div>
            <Footer aboutDetails={layout} />
        </>
    );
}
