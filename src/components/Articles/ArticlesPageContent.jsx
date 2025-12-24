// ============================================================================
// 1. components/Articles/ArticlesPageContent.jsx
// ============================================================================
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { slugify } from '@/lib/utils';

export default function ArticlesPageContent({ blogsData, branchSlug }) {
    const [activeTab, setActiveTab] = useState('blog');



    // Filter blogs based on active tab
    const filteredBlogs = blogsData.filter(blog => blog.type === activeTab);

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            {/* <div className="bg-[#BDD261]  text-white py-16">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Articles & News</h1>
                    <p className="text-xl text-blue-100 max-w-2xl">
                    <p className="text-xl text-white max-w-2xl">
                        Stay informed with our latest updates, insights, and stories
                    </p>
                </div>
            </div> */}

            {/* Tabs Section */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center space-x-1 gap-4">
                        {/* <TabButton
                            active={activeTab === 'all'}
                            onClick={() => setActiveTab('all')}
                            count={blogsData.length}
                        >
                            All
                        </TabButton> */}
                        <TabButton
                            active={activeTab === 'blog'}
                            onClick={() => setActiveTab('blog')}
                            count={blogsData.filter(b => b.type === 'blog').length}
                        >
                            Blog
                        </TabButton>
                        <TabButton
                            active={activeTab === 'social'}
                            onClick={() => setActiveTab('social')}
                            count={blogsData.filter(b => b.type === 'social').length}
                        >
                            Social Feed
                        </TabButton>

                    </div>
                </div>
            </div>

            {/* Articles Grid */}
            <div className="container mx-auto px-4 py-12">
                {filteredBlogs.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Articles Found</h3>
                        <p className="text-gray-500">No articles available in this category yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredBlogs.map((blog) => (
                            <ArticleCard key={blog.id} blog={blog} branchSlug={branchSlug} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function TabButton({ active, onClick, children, count }) {
    return (
        <button
            onClick={onClick}
            className={`px-6 py-4 font-semibold transition-all duration-200 border-b-2 ${active
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
        >
            {children}
            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${active ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                }`}>
                {count}
            </span>
        </button>
    );
}

function ArticleCard({ blog, branchSlug }) {
    const imageUrl = blog.image?.url || 'https://aptusindia.com/wp-content/uploads/2022/01/aptuslogo-new-modified.svg';
    const publishDate = new Date(blog.publishDate || blog.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });


    const shortDescription = blog.description?.length > 150
        ? blog.description.substring(0, 150) + '...'
        : blog.description;

    // ✅ Use slugify for consistent URL formatting
    const articleSlug = blog.slug || slugify(blog.title) || blog.documentId;

    // ✅ Build URL: If branchSlug exists, use branch context; otherwise root level
    const articleUrl = branchSlug
        ? `/${branchSlug}/articles/${articleSlug}`
        : `/articles/${articleSlug}`;

    console.log(branchSlug, "branchSlug")
    return (
        <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            {/* Image */}
            <Link href={articleUrl}>
                <div className="relative h-56 bg-gray-200 overflow-hidden group cursor-pointer">
                    {/* <Image
                        src={imageUrl}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                            e.target.src = '/placeholder-blog.jpg';
                        }}
                    /> */}
                    <Image
                        src={imageUrl}
                        alt={blog.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority={false}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Type Badge */}
                    <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold shadow-md ${blog.type === 'social'
                        ? 'bg-purple-600 text-white'
                        : 'bg-blue-600 text-white'
                        }`}>
                        {blog.type === 'social' ? 'Social Feed' : 'Blog'}
                    </span>
                </div>
            </Link>

            {/* Content */}
            <div className="p-6">
                {/* Date */}
                <div className="flex items-center text-sm text-gray-500 mb-3">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {publishDate}
                </div>

                {/* Title */}
                <Link href={articleUrl}>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
                        {blog.title}
                    </h3>
                </Link>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {shortDescription}
                </p>

                {/* ✅ Read More Link with branch context */}
                <Link
                    href={articleUrl}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors group"
                >
                    Read Full Article
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </Link>
            </div>
        </article>
    );
}


