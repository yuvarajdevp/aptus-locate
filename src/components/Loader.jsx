import React from "react";
import Image from "next/image";

export default function Loader() {
    return (
        <div className="fixed inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="  p-8 flex flex-col items-center">
                {/* Logo/Image */}
                <div className="mb-6">
                    <Image
                        src="/aptus_logo.webp" // Update with your logo path
                        alt="Aptus Finance"
                        width={220}
                        height={120}
                        className="object-contain"
                    />
                </div>

                {/* 4 Animated Dots */}
                <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "450ms" }}></div>
                </div>
            </div>
        </div>
    );
}