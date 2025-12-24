// components/Home/BranchCard.jsx
"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SquareArrowOutUpRight, Phone, ReceiptText, MapPin, Clock, Building } from "lucide-react";
import { slugify } from "@/lib/utils";

export default function BranchCard({ branchList = [] }) {
    const router = useRouter();

    const branches = Array.isArray(branchList) ? branchList : [];

    if (branches.length === 0) {
        return null;
    }

    return (
        <section className="container mx-auto px-4 py-10">
            {/* Section Header */}
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                    Aptus Value Housing Finance
                </h2>

                {/* Short underline */}
                <div className="mx-auto h-1 w-32 bg-[#1460B8] rounded"></div>
            </div>

            {/* <span className="text-[#1460B8]">Branch Locations</span> */}
            {/* <div className="inline-flex items-center space-x-2 bg-blue-50 px-6 py-2 rounded-full border border-blue-200 mt-4">
                    <Building className="h-5 w-5 text-blue-600" />
                    <span className="text-lg font-semibold text-blue-600">
                        {branches.length}
                    </span>
                    <span className="text-gray-600">
                        branch{branches.length !== 1 ? 'es' : ''} found
                    </span>
                </div> */}
            {/* Branch Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {branches.map((branch, idx) => {
                    const canNavigate = branch?.storeCode && branch?.locality && branch?.city?.city && branch?.state?.state;
                    const mapLink = branch?.mapLink?.startsWith("http") ? branch.mapLink : null;
                    const phoneLink = branch?.phone ? `tel:${branch.phone}` : null;

                    // Build full address
                    const addressParts = [
                        branch?.address,
                        branch?.locality,
                        branch?.city?.city,
                        branch?.state?.state,
                        branch?.postcode
                    ].filter(Boolean);
                    const fullAddress = addressParts.join(", ");

                    const hours = branch?.hours || "Mon-Fri: 10:00 AM - 4:00 PM";

                    // Handle details navigation
                    const handleDetails = () => {
                        if (!canNavigate) return;

                        const brand = "aptus-finance-home-loan-in";
                        const localitySlug = slugify(branch.locality);
                        const citySlug = slugify(branch.city?.city);
                        const storeCodeSlug = slugify(branch.storeCode);
                        const fullPath = `/${brand}-${localitySlug}-${citySlug}-${storeCodeSlug}/overview`;

                        router.push(fullPath);
                    };

                    return (
                        <div
                            key={branch?.id || `branch-${idx}`}
                            className="bg-white border-2 border-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                        >
                            {/* Header */}
                            <div className="bg-gradient-to-r from-[#1E2A78] to-[#1460B8] text-white p-4">

                                <div className="flex items-center justify-between text-sm">
                                    {/* <span className="">
                                        {branch?.storeCode || "N/A"}
                                    </span> */}
                                    <h3 className="text-lg font-bold mb-1">
                                        Aptus - {branch?.locality || "Unnamed Branch"}
                                    </h3>
                                    <span className="bg-white/20 px-3 py-1 rounded-full">
                                        {branch?.type || "N/A"}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 space-y-4">
                                {/* Address */}
                                <div className="flex items-start space-x-3">
                                    <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-700 leading-relaxed">
                                            {fullAddress || "Address not available"}
                                        </p>
                                    </div>
                                </div>

                                {/* Phone */}
                                {branch?.phone && (
                                    <div className="flex items-center space-x-3">
                                        <Phone className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                        <a
                                            href={phoneLink}
                                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            {branch.phone}
                                        </a>
                                    </div>
                                )}

                                {/* Hours */}
                                <div className="flex items-start space-x-3">
                                    <Clock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-gray-700">
                                        {hours}
                                    </p>
                                </div>

                                {/* Category Badge */}
                                {/* {branch?.category && (
                                    <div className="pt-2">
                                        <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                                            {branch.category}
                                        </span>
                                    </div>
                                )} */}
                            </div>

                            {/* Action Buttons */}
                            <div className="px-5 pb-5">
                                <div className="grid grid-cols-3 gap-2">
                                    {/* Directions */}
                                    {mapLink ? (
                                        <Link
                                            href={mapLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex flex-col items-center justify-center gap-1 border-2 border-blue-200 rounded-xl px-3 py-2.5 text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition group"
                                        >
                                            <SquareArrowOutUpRight className="w-4 h-4 group-hover:scale-110 transition" />
                                            <span className="text-xs font-medium">Directions</span>
                                        </Link>
                                    ) : (
                                        <button
                                            disabled
                                            className="flex flex-col items-center justify-center gap-1 border-2 border-gray-200 rounded-xl px-3 py-2.5 text-gray-400 cursor-not-allowed"
                                        >
                                            <SquareArrowOutUpRight className="w-4 h-4" />
                                            <span className="text-xs font-medium">Directions</span>
                                        </button>
                                    )}

                                    {/* Call */}
                                    {phoneLink ? (
                                        <Link
                                            href={phoneLink}
                                            className="flex flex-col items-center justify-center gap-1 border-2 border-blue-200 rounded-xl px-3 py-2.5 text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition group"
                                        >
                                            <Phone className="w-4 h-4 group-hover:scale-110 transition" />
                                            <span className="text-xs font-medium">Call</span>
                                        </Link>
                                    ) : (
                                        <button
                                            disabled
                                            className="flex flex-col items-center justify-center gap-1 border-2 border-gray-200 rounded-xl px-3 py-2.5 text-gray-400 cursor-not-allowed"
                                        >
                                            <Phone className="w-4 h-4" />
                                            <span className="text-xs font-medium">Call</span>
                                        </button>
                                    )}

                                    {/* Details */}
                                    <button
                                        onClick={handleDetails}
                                        disabled={!canNavigate}
                                        className={`flex flex-col items-center justify-center gap-1 border-2 rounded-xl px-3 py-2.5 transition ${canNavigate
                                            ? "border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-400 cursor-pointer group"
                                            : "border-gray-200 text-gray-400 cursor-not-allowed"
                                            }`}
                                    >
                                        <ReceiptText className={`w-4 h-4 ${canNavigate ? 'group-hover:scale-110 transition' : ''}`} />
                                        <span className="text-xs font-medium">Details</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}