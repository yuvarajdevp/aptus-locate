

// ============================================================================
// FIXED: components/Home/Articles.jsx
// ============================================================================
import React from 'react';
import Link from 'next/link';
import { handleBlogsApi } from '@/api/blogs';
import { slugify } from '@/lib/utils';
import { type } from '@/lib/typography';

export default async function ArticlesCard({ branchSlug }) {
    const blogs = await handleBlogsApi();
    const blogsData = blogs?.data || [];

    const displayBlogs = blogsData.slice(0, 3);
    if (displayBlogs.length === 0) return null;

    // ✅ Single source of truth for article base path
    const baseArticlesPath = branchSlug
        ? `/${branchSlug}/articles`
        : '/articles';

    console.log("displayBlogs:", baseArticlesPath);
    return (
        <div className="w-full py-8 sm:py-12">
            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className={`mb-2 ${type.sectionTitle}`}>
                        Latest Articles
                    </h2>
                    <p className={`mt-2 ${type.bodySm}`}>
                        Stay updated with our latest news and insights
                    </p>
                </div>

                {/* ✅ FIXED View All */}
                <Link
                    href={baseArticlesPath}
                    className={`flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700 sm:px-6 sm:py-3 ${type.btn}`}
                >
                    View All Articles
                </Link>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {displayBlogs.map((blog) => {
                    const imageUrl = blog.image?.url || 'https://aptusindia.com/wp-content/uploads/2022/01/aptuslogo-new-modified.svg';
                    const publishDate = new Date(
                        blog.publishDate || blog.createdAt
                    ).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    });

                    const articleSlug =
                        blog.slug || slugify(blog.title) || blog.documentId;

                    // ✅ FIXED Article URL
                    const articleUrl = `${baseArticlesPath}/${articleSlug}`;

                    return (
                        <div
                            key={blog.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                        >
                            {/* Image */}
                            <Link href={articleUrl}>
                                <div className="relative h-48 overflow-hidden group cursor-pointer">
                                    <img
                                        src={imageUrl}
                                        alt={blog.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                    />
                                </div>
                            </Link>

                            {/* Content */}
                            <div className="p-4 sm:p-5">
                                <p className={`mb-2 ${type.meta}`}>
                                    {publishDate}
                                </p>

                                <Link href={articleUrl}>
                                    <h3 className={`mb-2 line-clamp-2 hover:text-blue-600 ${type.cardTitle}`}>
                                        {blog.title}
                                    </h3>
                                </Link>

                                <p className={`mb-4 line-clamp-3 ${type.bodySm}`}>
                                    {blog.description}
                                </p>

                                <Link
                                    href={articleUrl}
                                    className={type.link}
                                >
                                    Read More →
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
