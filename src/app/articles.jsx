// ============================================================================
// 3. app/articles.jsx - Articles List Page (FIXED)
// ============================================================================
import React from 'react';
import ArticlesPageContent from '@/components/Articles/ArticlesPageContent';
import { handleBlogsApi } from '@/api/blogs';
import BannerDetails from '@/components/Home/BannerDetails';

export default async function Articles({ params }) {
    const slug = params?.slug || [];
    const branchSlug = slug.slice(0, -1).join('/'); // Remove 'articles' from end

    const blogs = await handleBlogsApi();
    const blogsData = blogs?.data || [];

    return (
        <>
            <BannerDetails />
            <ArticlesPageContent
                blogsData={blogsData}
                branchSlug={branchSlug}
            />
        </>
    );
}
