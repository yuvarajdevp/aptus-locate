"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function MobileActions() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isLandingPage = pathname === "/";
  const isHomePage = pathname?.split("/").filter(Boolean).length === 1;

  if (!isMobile) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg border border-gray-300">
        {isHomePage && (
          <>
            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-full">
              Ask Help
            </button>
            <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-full">
              Get Brochure
            </button>
            <button className="px-4 py-2 bg-gray-700 text-white text-sm rounded-full">
              Search
            </button>
          </>
        )}
        {isLandingPage && (
          <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-full">
            Get Brochure
          </button>
        )}
      </div>
    </div>
  );
}
