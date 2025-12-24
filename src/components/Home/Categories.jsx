// "use client";
// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import featuredicon from "@/assets/featuredicon.svg";
// import { SquareArrowOutUpRight, Phone, ReceiptText } from "lucide-react";
// import { STRAPI_URL } from "@/env/env";
// // local style data (colors, fallback image, etc.)
// const products = [
//     { bg: "bg-green-100", },
//     { bg: "bg-pink-100", },
//     { bg: "bg-yellow-100", },
//     { bg: "bg-blue-100", },
//     { bg: "bg-purple-100", },
// ];

// export default function Categories({ categoriescard }) {
//     if (!categoriescard?.length) {
//         return <p className="text-center text-gray-500">No Category available.</p>;
//     }

//     return (
//         <>
//             <h2 className="text-center text-4xl font-bold text-[#252685] pt-10 pb-4">
//                 Category
//             </h2>
//             <p className="text-center text-base font-bold text-[#000000] mb-8">
//                 Experience the ease of banking wherever you are
//             </p>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mx-6">
//                 {categoriescard.map((category, index) => {
//                     const styleData = products[index % products.length];
//                     // get image URL from Strapi or fallback to local icon
//                     const imageUrl = category?.img?.url
//                         ? `${STRAPI_URL}${category.img.url}`
//                         : featuredicon.src;

//                     return (
//                         <div
//                             key={category.id || index}
//                             className={`${styleData.bg} p-6 rounded-2xl shadow flex flex-col items-center justify-between text-center`}
//                         >
//                             <div className="my-6">
//                                 <Image
//                                     src={imageUrl}
//                                     alt={category?.title || "Product"}
//                                     width={100}
//                                     height={100}
//                                     unoptimized // use this if Strapi domain is not added in next.config.js
//                                 />
//                             </div>
//                             <h2 className="text-lg font-bold text-blue-900">
//                                 {category?.name || "Untitled Product"}
//                             </h2>

//                             {/* <div className="flex gap-2 mt-6 w-full">
//                                 {card?.Button?.map((button, idx) => (
//                                     <Link
//                                         key={idx}
//                                         href={button?.link || "#"}
//                                         target={button?.link ? "_blank" : undefined}
//                                         rel={button?.link ? "noopener noreferrer" : undefined}
//                                         className={`flex-1 flex items-center justify-center gap-2 border rounded-full px-1 py-2 transition ${button?.link
//                                             ? "text-[#595959] border-branch-border-btn1 hover:bg-blue-100 cursor-pointer"
//                                             : "text-gray-400 border-gray-400 cursor-not-allowed"
//                                             }`}
//                                     >
//                                         <button>
//                                             {idx === 0 ? "Apply Now" : "Know More"}
//                                         </button>
//                                     </Link>
//                                 ))}





//                             </div> */}

//                         </div>
//                     );
//                 })}
//             </div>
//         </>
//     );
// }
"use client";
import React from "react";
import Image from "next/image";
import featuredicon from "@/assets/featuredicon.svg";
import { STRAPI_URL } from "@/env/env";

// Gradient color combinations for categories
const categoryStyles = [
    { gradient: "from-green-600 to-green-400", iconColor: "text-green-200" },
    { gradient: "from-pink-600 to-pink-400", iconColor: "text-pink-200" },
    { gradient: "from-yellow-600 to-yellow-400", iconColor: "text-yellow-200" },
    { gradient: "from-blue-600 to-blue-400", iconColor: "text-blue-200" },
    { gradient: "from-purple-600 to-purple-400", iconColor: "text-purple-200" },
];

export default function Categories({ categoriescard }) {
    if (!categoriescard?.length) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Header Section */}
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-[#252685] mb-2 text-center">
                    Categories
                </h2>
                <p className="text-base font-bold text-[#000000] text-center">
                    Explore our range of financial solutions
                </p>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {categoriescard.map((category, index) => {
                    const styleData = categoryStyles[index % categoryStyles.length];

                    // Get image URL from Strapi or fallback
                    const imageUrl = category?.img?.url
                        ? `${STRAPI_URL}${category.img.url}`
                        : featuredicon.src;

                    return (
                        <div
                            key={category.id || index}
                            className={`bg-gradient-to-br ${styleData.gradient} rounded-3xl p-6 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 relative overflow-hidden`}
                        >
                            {/* Background Icon/Image */}
                            <div className="absolute right-2 top-2 opacity-30">
                                <Image
                                    src={imageUrl}
                                    alt={category?.name || "Category"}
                                    width={60}
                                    height={60}
                                    className={styleData.iconColor}
                                    unoptimized
                                />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-[180px]">
                                <div className="mb-4">
                                    <Image
                                        src={imageUrl}
                                        alt={category?.name || "Category"}
                                        width={80}
                                        height={80}
                                        unoptimized
                                    />
                                </div>
                                <h3 className="text-lg font-bold">
                                    {category?.name || "Untitled Category"}
                                </h3>
                                {category?.description && (
                                    <p className="text-white/90 text-sm mt-2 leading-relaxed">
                                        {category.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}