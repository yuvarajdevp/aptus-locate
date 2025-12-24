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
    const hours = branch.hours || "Open 10 AM - Close 4 PM";
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
        branchList?.type === "NBFC"
            ? "Aptus Finance India Private Limited"
            : "Aptus Value Housing Finance India";


    return (
        <section className="container py-1  mx-auto">
            <div className="rounded-2xl shadow overflow-hidden">
                <div className="bg-[#6F75E0] text-white p-4">
                    <h2 className="text-center text-2xl font-bold">
                        {companyName} - {branchName}
                    </h2>
                </div>

                <div className="bg-[#F6FAFF] grid md:grid-cols-3 gap-6 p-10">
                    <div className="md:col-span-2 space-y-4">
                        <div className=" p-4 rounded-lg ">
                            <p><strong>📍 Address:</strong> {fullAddress}</p>
                        </div>
                        <div className=" p-4 rounded-lg ">
                            <p><strong>📞 Phone:</strong> {phone || "Not available"}</p>
                        </div>
                        <div className=" p-4 rounded-lg ">
                            <p><strong>⏰ Hours:</strong> {hours}</p>
                        </div>

                        <div className="flex gap-4 pt-4">
                            {phoneLink ? (
                                <Link
                                    href={phoneLink}
                                    className="flex-1 flex items-center justify-center gap-2 bg-[#1460B8] text-white rounded-full px-6 py-3 hover:bg-blue-700 transition-colors"
                                >
                                    <Phone size={18} />Call Now
                                </Link>
                            ) : (
                                <button
                                    disabled
                                    className="flex-1 flex items-center justify-center gap-2 bg-gray-300 text-gray-600 rounded-full px-6 py-3 cursor-not-allowed"
                                >
                                    <Phone size={18} />No Phone
                                </button>
                            )}

                            {validMapLink ? (
                                <Link
                                    href={mapLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-1 border rounded-full px-3 py-2 text-sm text-[#595959] border-blue-400 hover:bg-blue-50 transition"
                                >
                                    <SquareArrowOutUpRight className="w-4 h-4" />
                                    Direction
                                </Link>
                            ) : (
                                <button disabled className="flex-1 flex items-center justify-center gap-1 border rounded-full px-3 py-2 text-sm text-gray-400 border-gray-300 cursor-not-allowed">
                                    <SquareArrowOutUpRight className="w-4 h-4" />
                                    Direction
                                </button>
                            )}
                            <button
                                onClick={handleShare}
                                className="flex-1 flex items-center justify-center gap-2 border border-blue-400 text-[#595959] rounded-full  hover:bg-blue-50 transition-colors"
                            >
                                <Share2 size={18} />Share
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center rounded-lg shadow-sm p-6">
                        <Image src={qr} alt="QR Code" className="w-40 h-40 object-contain mb-4" />
                        <p className="font-semibold">Scan QR Code</p>
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