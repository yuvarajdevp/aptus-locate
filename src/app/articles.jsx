import React from "react";
import ArticlesPageContent from "@/components/Articles/ArticlesPageContent";
import BranchPageBanner from "@/components/Home/BranchPageBanner";
import { handleBlogsApi } from "@/api/blogs";

export default async function Articles({ params }) {
    const slug = params?.slug || [];
    const branchSlug = slug.slice(0, -1).join("/");
    const branchPathSlug = slug[0] || "";

    const blogs = await handleBlogsApi();
    const blogsData = blogs?.data || [];

    return (
        <>
            <BranchPageBanner slug={branchPathSlug} />
            <ArticlesPageContent blogsData={blogsData} branchSlug={branchSlug} />
        </>
    );
}
