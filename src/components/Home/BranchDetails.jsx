"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SquareArrowOutUpRight, Phone, Share2 } from "lucide-react";
import qr from "@/assets/qr.png";

export default function BranchDetails({ branchList, slug }) {
    // Enhanced debugging
    console.log("=== BranchDetails Debug ===");
    console.log("branchList type:", Array.isArray(branchList) ? 'Array' : typeof branchList);
    console.log("branchList:", branchList);
    console.log("slug:", slug);

    // Handle both array and object formats
    let branch;

    if (Array.isArray(branchList)) {
        if (slug) {
            // Find the branch that matches the slug
            branch = branchList.find(b => {
                // Try matching against different possible slug formats
                const slugLower = slug.toLowerCase();
                const locality = (b.locality || "").toLowerCase().replace(/\s+/g, "-");
                const branchName = (b.branch_name || "").toLowerCase().replace(/\s+/g, "-");
                const storeCode = (b.storeCode || "").toLowerCase();

                return locality === slugLower ||
                    branchName === slugLower ||
                    storeCode === slugLower ||
                    locality.includes(slugLower) ||
                    slugLower.includes(locality);
            });
        }
        // Fallback to first branch if no match found
        branch = branch || branchList[0];
    } else {
        branch = branchList;
    }

    if (!branch) {
        return (
            <section className="py-10 container mx-auto">
                <div className="border rounded-2xl shadow overflow-hidden">
                    <div className="bg-red-600 text-white p-4">
                        <h2 className="text-center text-2xl font-bold">Branch Not Found</h2>
                    </div>
                    <div className="bg-gray-50 p-10 text-center">
                        <Link href="/location/all-states" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                            View All Branches
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    // More flexible data extraction with fallbacks
    const getStateValue = () => {
        if (branch.state?.state) return branch.state.state;
        if (branch.state?.name) return branch.state.name;
        if (typeof branch.state === 'string') return branch.state;
        return "";
    };

    const getCityValue = () => {
        if (branch.city?.city) return branch.city.city;
        if (branch.city?.name) return branch.city.name;
        if (typeof branch.city === 'string') return branch.city;
        return "";
    };

    const state = getStateValue();
    const city = getCityValue();
    const locality = branch.locality || "";
    const address = branch.address || "";
    const postcode = branch.postcode || "";
    const phone = branch.phone || "";
    const hours = branch.hours || "Open 9:30 AM - Close 5:30 PM";
    const mapLink = branch.mapLink || "";
    const branchName = branch.branch_name || locality || "Branch";

    // Build full address
    const fullAddress = [address, locality, city, state, postcode]
        .filter(Boolean)
        .join(", ") || "Address not available";

    console.log("Extracted values:", {
        state,
        city,
        locality,
        address,
        postcode,
        phone,
        fullAddress
    });

    const phoneLink = phone ? `tel:${phone}` : null;
    const validMapLink = mapLink?.startsWith("http") ? mapLink : null;

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: `Aptus - ${branchName}`,
                    text: fullAddress,
                    url: window.location.href
                });
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert("Link copied!");
            }
        } catch (error) {
            console.error("Share error:", error);
        }
    };
    const companyName =
        branch?.type === "NBFC"
            ? "Aptus Finance India Private Limited"
            : "Aptus Value Housing Finance India";

    const actionBtnClass =
        "flex min-w-0 flex-1 flex-row items-center justify-center gap-1.5 rounded-2xl px-2 py-2.5 text-[11px] font-medium transition-colors sm:gap-2 sm:rounded-full sm:px-3 sm:py-3 sm:text-sm";

    return (
        <section className="h-full w-full min-w-0 max-w-full py-1">
            <div className="h-full overflow-hidden rounded-2xl shadow">
                <div className="bg-[#6F75E0] px-3 py-4 text-white sm:px-4">
                    <h2 className="text-center text-base font-bold leading-snug break-words sm:text-lg md:text-2xl">
                        {companyName} - {branchName}
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-6 bg-[#F6FAFF] p-4 sm:p-6 lg:grid-cols-3 lg:p-8">
                    <div className="min-w-0 space-y-3 lg:col-span-2 lg:space-y-4">
                        <div className="rounded-lg p-3 sm:p-4">
                            <p className="break-words text-sm leading-relaxed sm:text-base">
                                <strong>📍 Address:</strong> {fullAddress}
                            </p>
                        </div>
                        <div className="rounded-lg p-3 sm:p-4">
                            <p className="text-sm sm:text-base">
                                <strong>📞 Phone:</strong> {phone || "Not available"}
                            </p>
                        </div>
                        <div className="rounded-lg p-3 sm:p-4">
                            <p className="text-sm sm:text-base">
                                <strong>⏰ Hours:</strong> {hours}
                            </p>
                        </div>

                        <div className="flex flex-row gap-2 pt-2 md:gap-3 md:pt-4">
                            {validMapLink ? (
                                <Link
                                    href={mapLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${actionBtnClass} border border-blue-400 bg-white text-[#1460B8] hover:bg-blue-50`}
                                >
                                    <SquareArrowOutUpRight className="h-4 w-4 shrink-0" />
                                    <span className="truncate">Directions</span>
                                </Link>
                            ) : (
                                <button
                                    type="button"
                                    disabled
                                    className={`${actionBtnClass} cursor-not-allowed border border-gray-300 bg-white text-gray-400`}
                                >
                                    <SquareArrowOutUpRight className="h-4 w-4 shrink-0" />
                                    <span className="truncate">Directions</span>
                                </button>
                            )}

                            {phoneLink ? (
                                <Link
                                    href={phoneLink}
                                    className={`${actionBtnClass} border border-blue-400 bg-white text-[#1460B8] hover:bg-blue-50`}
                                >
                                    <Phone size={16} className="shrink-0" />
                                    <span className="truncate">Call</span>
                                </Link>
                            ) : (
                                <button
                                    type="button"
                                    disabled
                                    className={`${actionBtnClass} cursor-not-allowed border border-gray-300 bg-white text-gray-400`}
                                >
                                    <Phone size={16} className="shrink-0" />
                                    <span className="truncate">Call</span>
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={handleShare}
                                className={`${actionBtnClass} border border-blue-400 bg-white text-[#1460B8] hover:bg-blue-50`}
                            >
                                <Share2 size={16} className="shrink-0" />
                                <span className="truncate">Share</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center rounded-lg p-4 lg:p-6">
                        <Image
                            src={qr}
                            alt="QR Code"
                            className="mb-3 h-32 w-32 object-contain sm:mb-4 sm:h-40 sm:w-40"
                        />
                        <p className="text-sm font-semibold sm:text-base">Scan QR Code</p>
                    </div>
                </div>
            </div>

            {/* <div className="mt-8 text-center">
                <Link
                    href="/location/all-states"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                    ← Back to All Branches
                </Link>
            </div> */}
        </section>
    );
}