
// ============================================================================
// 2. app/single-article.jsx - NEW FILE
// ============================================================================
import React from 'react';
import Link from 'next/link';
import { handleBlogsApi } from '@/api/blogs';
import { slugify } from '@/lib/utils';
import NotFound from '@/app/not-found';

export default async function SingleArticle({ articleSlug, branchSlug }) {
    const blogs = await handleBlogsApi();
    const blogsData = blogs?.data || [];

    // Find the article by slug
    const article = blogsData.find(blog => {
        const blogSlug = blog.slug || slugify(blog.title) || blog.documentId;
        return blogSlug === articleSlug;
    });

    if (!article) {
        return <NotFound />;
    }

    const imageUrl = article.image?.url || 'https://aptusindia.com/wp-content/uploads/2022/01/aptuslogo-new-modified.svg';
    const publishDate = new Date(article.publishDate || article.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Build breadcrumb paths
    const articlesPath = branchSlug ? `/${branchSlug}/articles` : '/articles';
    const branchPath = branchSlug ? `/${branchSlug}/overview` : '/';

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-4">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href={branchPath} className="text-blue-600 hover:text-blue-800">
                            Home
                        </Link>
                        <span className="text-gray-400">/</span>
                        <Link href={articlesPath} className="text-blue-600 hover:text-blue-800">
                            Articles
                        </Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-700 font-medium">{article.title}</span>
                    </nav>
                </div>
            </div>

            {/* Article Content */}
            <article className="container mx-auto px-4 py-12 max-w-4xl">
                {/* Back to Articles */}
                <Link
                    href={articlesPath}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Articles
                </Link>

                {/* Article Header */}
                <header className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        {article.title}
                    </h1>

                    <div className="flex items-center gap-4 text-gray-600">
                        <time dateTime={article.publishDate || article.createdAt}>
                            {publishDate}
                        </time>
                        {article.author && (
                            <>
                                <span>•</span>
                                <span>By {article.author}</span>
                            </>
                        )}
                    </div>
                </header>

                {/* Featured Image */}
                <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
                    <img
                        src={imageUrl}
                        alt={article.title}
                        className="w-full h-auto max-h-[500px] object-cover"
                    />
                </div>

                {/* Article Description/Summary */}
                {article.description && (
                    <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            {article.description}
                        </p>
                    </div>
                )}

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                    {article.content ? (
                        <div dangerouslySetInnerHTML={{ __html: article.content }} />
                    ) : (
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {article.description || 'No content available.'}
                        </p>
                    )}
                </div>

                {/* Tags (if available) */}
                {article.tags && article.tags.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags:</h3>
                        <div className="flex flex-wrap gap-2">
                            {article.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Share Section */}
                {/* <div className="mt-12 pt-8 border-t border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Share this article:</h3>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Share on Twitter
                        </button>
                        <button className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900">
                            Share on Facebook
                        </button>
                        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                            Copy Link
                        </button>
                    </div>
                </div> */}
            </article>

            {/* Related Articles Section */}
            <section className="bg-white py-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {blogsData
                            .filter(blog => blog.id !== article.id)
                            .slice(0, 3)
                            .map((blog) => {
                                const blogSlug = blog.slug || slugify(blog.title) || blog.documentId;
                                const blogUrl = branchSlug
                                    ? `/${branchSlug}/articles/${blogSlug}`
                                    : `/articles/${blogSlug}`;

                                return (
                                    <Link
                                        key={blog.id}
                                        href={blogUrl}
                                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={blog.image?.url || 'https://aptusindia.com/wp-content/uploads/2022/01/aptuslogo-new-modified.svg'}
                                                alt={blog.title}
                                                className="w-full h-full object-cover hover:scale-110 transition-transform"
                                            />
                                        </div>
                                        <div className="p-5">
                                            <h3 className="text-lg font-bold mb-2 line-clamp-2 hover:text-blue-600">
                                                {blog.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm line-clamp-2">
                                                {blog.description}
                                            </p>
                                        </div>
                                    </Link>
                                );
                            })}
                    </div>
                </div>
            </section>
        </div>
    );
}
