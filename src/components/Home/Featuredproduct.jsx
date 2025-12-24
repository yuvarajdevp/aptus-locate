"use client";
import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import featuredicon from "@/assets/featuredicon.svg";
import { STRAPI_URL } from "@/env/env";

// Gradient colors for product cards
const productCardStyles = [
    { gradient: "from-[#6366F1] to-[#6366F1]", iconColor: "text-black-300" },

    { gradient: "from-[#BDD261] to-[#BDD261]", iconColor: "text-black-300" },
    { gradient: "from-[#1E2A78] to-[#1460B8]", iconColor: "text-black-300" },

    { gradient: "from-[#BDD261] to-[#BDD261]", iconColor: "text-black-300" },

    { gradient: "from-[#1E2A78] to-[#1460B8]", iconColor: "text-black-300" },
];

// Category icons mapping
// const categoryIcons = {
//     "Home Loan": "",
//     "Insurance": "",
//     "Loan Against Property": "",
//     "Default": ""
// };

export default function Featuredproduct({ solutioncard, branchType }) {
    const [activeTab, setActiveTab] = useState("All");
    useEffect(() => {
        if (window.location.hash === '#products-section') {
            const element = document.getElementById('products-section');
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            }
        }
    }, []);

    // Extract unique categories from solutions
    const categories = useMemo(() => {
        if (!solutioncard?.length) return [];
        const uniqueCategories = [...new Set(solutioncard.map(s => s.category?.name).filter(Boolean))];
        return ["All", ...uniqueCategories];
    }, [solutioncard]);

    // Filter solutions based on active tab
    const filteredSolutions = useMemo(() => {
        if (!solutioncard?.length) return [];
        if (activeTab === "All") return solutioncard;
        return solutioncard.filter(s => s.category?.name === activeTab);
    }, [solutioncard, activeTab]);

    // Count total products (all cards across all solutions)
    const totalProducts = useMemo(() => {
        return filteredSolutions.reduce((sum, sol) => sum + (sol.card?.length || 0), 0);
    }, [filteredSolutions]);

    if (!solutioncard?.length) {
        return (
            <div className="container mx-auto px-4 py-12">
                <p className="text-center text-gray-500">
                    No Products available{branchType ? ` for ${branchType} branches` : ""}.
                </p>
            </div>
        );
    }
    const productTitle =
        branchType?.toUpperCase() === "NBFC"
            ? "Business Loan"
            : "Home Loans";


    return (
        <div id="products-section" className="bg-gray-50 py-12">
            <div className="container-fluid mx-5 px-4">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-[#252685] mb-2">
                        {productTitle}
                    </h1>
                    <p className="text-base text-gray-600">
                        Experience hassle-free service, wherever you are
                    </p>
                </div>

                {/* Tabs Navigation */}
                {/* <div className="mb-8 border-b border-gray-200 overflow-x-auto">
                    <nav className="flex gap-1 min-w-max">
                        {categories.map((category, index) => {
                            const isActive = activeTab === category;
                            // const icon = categoryIcons[category] || categoryIcons["Default"];

                            // Count products in this category
                            const categoryCount = category === "All"
                                ? solutioncard.reduce((sum, sol) => sum + (sol.card?.length || 0), 0)
                                : solutioncard
                                    .filter(s => s.category?.name === category)
                                    .reduce((sum, sol) => sum + (sol.card?.length || 0), 0);

                            return (
                                <button
                                    key={index}
                                    onClick={() => setActiveTab(category)}
                                    className={`
                                        px-6 py-3 font-medium text-sm whitespace-nowrap transition-all
                                        ${isActive
                                            ? 'text-[#252685] border-b-2 border-[#252685] bg-white'
                                            : 'text-gray-600 hover:text-[#252685] hover:bg-gray-100'
                                        }
                                    `}
                                >
                                    <span className="mr-2">{icon}</span>
                                    {category}
                                    <span className="ml-2 text-xs text-gray-500">({categoryCount})</span>
                                </button>
                            );
                        })}
                    </nav>
                </div> */}

                {/* Products Grid */}
                {totalProducts > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredSolutions.map((solution, solIndex) => {
                            const cards = solution?.card || [];

                            return cards.map((card, cardIndex) => {
                                const styleIndex = (solIndex * 4 + cardIndex) % productCardStyles.length;
                                const styleData = productCardStyles[styleIndex];

                                const imageUrl = card?.img?.url
                                    ? `${STRAPI_URL}${card.img.url}`
                                    : featuredicon.src;

                                return (
                                    <div
                                        key={`${solution.id}-${card.id || cardIndex}`}
                                        className={`bg-gradient-to-br ${styleData.gradient} rounded-3xl p-8 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group`}
                                    >
                                        {/* Category Badge */}
                                        <div className="absolute top-4 left-4 z-10">
                                            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                                                {solution.category?.name || "Product"}
                                            </span>
                                        </div>

                                        {/* Background Icon/Image */}
                                        <div className="absolute right-4 top-4 opacity-20 group-hover:opacity-30 transition-opacity">
                                            <Image
                                                src={imageUrl}
                                                alt={card?.title || "Product"}
                                                width={80}
                                                height={80}
                                                className="opacity-50"
                                                unoptimized
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="relative z-10 mt-8">
                                            <h3 className="text-xl font-bold mb-4 pr-20">
                                                {card?.title || "Untitled Product"}
                                            </h3>
                                            <p className="text-white/90 mb-8 text-sm leading-relaxed min-h-[60px]">
                                                {card?.description || "No description available."}
                                            </p>

                                            {/* Action Buttons */}
                                            <div className="flex gap-3">
                                                {card?.Button && card.Button.length > 0 ? (
                                                    card.Button.map((button, idx) => (
                                                        button?.link ? (
                                                            <Link
                                                                key={idx}
                                                                href={button.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/40 rounded-full px-4 py-2.5 text-sm font-medium transition text-center"
                                                            >
                                                                {idx === 0 ? "Apply Now" : "Know More"}
                                                            </Link>
                                                        ) : (
                                                            <button
                                                                key={idx}
                                                                disabled
                                                                className="flex-1 bg-transparent hover:bg-white/10 border border-white/40 rounded-full px-4 py-2.5 text-sm font-medium opacity-50 cursor-not-allowed"
                                                            >
                                                                {idx === 0 ? "Apply Now" : "Know More"}
                                                            </button>
                                                        )
                                                    ))
                                                ) : (
                                                    <>
                                                        <button
                                                            disabled
                                                            className="flex-1 bg-white/20 backdrop-blur-sm border border-white/40 rounded-full px-4 py-2.5 text-sm font-medium opacity-50 cursor-not-allowed"
                                                        >
                                                            Apply Now
                                                        </button>
                                                        <button
                                                            disabled
                                                            className="flex-1 bg-transparent border border-white/40 rounded-full px-4 py-2.5 text-sm font-medium opacity-50 cursor-not-allowed"
                                                        >
                                                            Know More
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            });
                        })}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            No products available in {activeTab} category
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}