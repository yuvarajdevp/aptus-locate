"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    SquareArrowOutUpRight,
    Phone,
    Share2,
    MapPin,
    Clock,
    CalendarDays,
} from "lucide-react";
import qr from "@/assets/qr.png";
import { getBranchName } from "@/lib/branchUtils";
import { type } from "@/lib/typography";
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
                const slugLower = slug.toLowerCase();
                const branchSlug = (b.branch || b.branch_name || "")
                    .toLowerCase()
                    .replace(/\s+/g, "-");
                const storeCode = (b.storeCode || "").toLowerCase();

                return branchSlug === slugLower || storeCode === slugLower;
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
    const phone =
        branch.phone ||
        branch.contact_number ||
        branch.contactNumber ||
        branch.mobile ||
        "";
    const phoneTrimmed = String(phone).trim();
    const hours = branch.hours || "Open 9:30 AM - Close 4:30 PM";
    const weeklyOffText = "Monday to Saturday, Except 2nd Saturday. ";
    const mapLink = branch.mapLink || "";
    const branchName = getBranchName(branch) || "Branch";

    // Build full address
    const fullAddress = [address, locality, getBranchName(branch), city, state, postcode]
        .filter(Boolean)
        .join(", ") || "Address not available";

    console.log("Extracted values:", {
        state,
        city,
        locality,
        address,
        postcode,
        phone: phoneTrimmed,
        fullAddress
    });

    const phoneLink = phoneTrimmed ? `tel:${phoneTrimmed}` : null;
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
        `flex min-w-0 flex-1 flex-row items-center justify-center gap-1.5 rounded-2xl px-2 py-2.5 transition-colors sm:gap-2 sm:rounded-full sm:px-3 sm:py-3 ${type.btn}`;

    const infoRowClass =
        `flex items-start gap-3 leading-relaxed text-gray-900 ${type.bodySm} sm:text-body`;
    const infoIconClass = "mt-0.5 h-5 w-5 shrink-0 text-primary";

    return (
        <section className="flex h-full w-full min-w-0 max-w-full flex-col py-1">
            <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
                <div className="shrink-0 bg-[#6F75E0] px-3 py-4 text-white sm:px-4">
                    <h2 className="text-center text-heading-3 font-bold leading-snug break-words text-white sm:text-heading-2">
                        {companyName} - {branchName}
                    </h2>
                </div>

                <div className="flex min-h-0 flex-1 flex-col bg-[#F6FAFF] p-4 sm:p-5 lg:flex-row lg:items-stretch lg:gap-6 lg:p-6">
                    <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 lg:gap-4">
                        <div className={infoRowClass}>
                            <MapPin className={infoIconClass} aria-hidden />
                            <p className="min-w-0 break-words">
                                <span className="font-semibold text-gray-900">Address:</span>{" "}
                                {fullAddress}
                            </p>
                        </div>

                        <div className={infoRowClass}>
                            <Phone className={infoIconClass} aria-hidden />
                            <p className="min-w-0">
                                <span className="font-semibold text-gray-900">Phone:</span>{" "}
                                {phoneTrimmed && phoneLink ? (
                                    <a href={phoneLink} className="text-primary hover:underline">
                                        {phoneTrimmed}
                                    </a>
                                ) : (
                                    <span className="text-gray-600">Not available</span>
                                )}
                            </p>
                        </div>

                        <div className={infoRowClass}>
                            <Clock className={infoIconClass} aria-hidden />
                            <p className="min-w-0">
                                <span className="font-semibold text-gray-900">Hours:</span>{" "}
                                {hours}
                            </p>
                        </div>

                        <div className={infoRowClass}>
                            <CalendarDays className={infoIconClass} aria-hidden />
                            <p className="min-w-0">
                                <span className="font-semibold text-gray-900">Branch timings:</span>{" "}
                                {weeklyOffText}
                            </p>
                        </div>

                        <div className="mt-auto flex flex-row gap-2 pt-2 lg:pt-3">
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

                    <div className="mt-4 flex shrink-0 flex-col items-center justify-center border-t border-[#d6e4f5] pt-4 lg:mt-0 lg:w-[180px] lg:justify-center lg:self-stretch lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                        <Image
                            src={qr}
                            alt="QR Code"
                            className="mb-2 h-28 w-28 object-contain lg:h-36 lg:w-36"
                        />
                        <p className={`font-semibold text-gray-800 ${type.bodySm} sm:text-body`}>
                            Scan QR Code
                        </p>
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