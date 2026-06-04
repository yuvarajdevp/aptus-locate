"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll to top banner on branch sub-pages (not products — products uses #products-section).
 */
export default function ScrollToPageTop({ enabled = true }) {
    const pathname = usePathname() || "";

    useEffect(() => {
        if (!enabled) return;

        const isProductsPage = pathname.endsWith("/products");
        if (isProductsPage) return;

        const hash = window.location.hash;
        if (hash && hash !== "#") return;

        const scrollToBanner = () => {
            const banner = document.getElementById("branch-top-banner");
            if (banner) {
                banner.scrollIntoView({ behavior: "instant", block: "start" });
            }
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        };

        scrollToBanner();
        requestAnimationFrame(scrollToBanner);
    }, [pathname, enabled]);

    return null;
}
