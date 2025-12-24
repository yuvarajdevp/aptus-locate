

// ============================================================================
// FIXED: components/Home/Articles.jsx
// ============================================================================
import React from 'react';
import Link from 'next/link';
import { handleBlogsApi } from '@/api/blogs';
import { slugify } from '@/lib/utils';

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
        <div className="py-12">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-4xl font-bold text-[#252685] mb-2">
                        Latest Articles
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Stay updated with our latest news and insights
                    </p>
                </div>

                {/* ✅ FIXED View All */}
                <Link
                    href={baseArticlesPath}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
                >
                    View All Articles
                </Link>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                            <div className="p-5">
                                <p className="text-sm text-gray-500 mb-2">
                                    {publishDate}
                                </p>

                                <Link href={articleUrl}>
                                    <h3 className="text-lg font-bold mb-2 line-clamp-2 hover:text-blue-600">
                                        {blog.title}
                                    </h3>
                                </Link>

                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                    {blog.description}
                                </p>

                                <Link
                                    href={articleUrl}
                                    className="text-blue-600 font-semibold text-sm"
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
