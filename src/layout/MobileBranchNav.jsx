"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LayoutGrid, Package, Newspaper, Images } from "lucide-react";
import {
  getBranchBasePath,
  getBranchNavActive,
  isBranchSubPage,
  MOBILE_ICON_NAV_ITEMS,
} from "@/lib/branchNav";

const ICONS = {
  overview: LayoutGrid,
  products: Package,
  articles: Newspaper,
  gallery: Images,
};

const ICON_GRADIENT =
  "bg-gradient-to-br from-primary via-primary-light to-secondary";
const LABEL_GRADIENT =
  "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent";

export default function MobileBranchNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [currentHash, setCurrentHash] = useState("");

  useEffect(() => {
    const syncHash = () => setCurrentHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  if (!isBranchSubPage(pathname)) return null;

  const basePath = getBranchBasePath(pathname);

  const smoothScrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (!element) return;
    const headerOffset = 120;
    const top =
      element.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleNavClick = (e, item) => {
    e.preventDefault();
    const targetUrl = `${basePath}${item.route}`;
    const currentPath = pathname.split("#")[0];
    const targetPath = targetUrl.split("#")[0];

    if (currentPath === targetPath) {
      if (item.scrollTo) {
        smoothScrollToElement(item.scrollTo);
        setCurrentHash(`#${item.scrollTo}`);
        window.history.pushState({}, "", `${targetUrl}#${item.scrollTo}`);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setCurrentHash("");
        window.history.pushState({}, "", targetUrl);
      }
      return;
    }

    if (item.scrollTo) {
      router.push(`${targetUrl}#${item.scrollTo}`);
    } else {
      router.push(targetUrl);
    }
  };

  return (
    <nav
      className="w-full border-b border-gray-100 bg-white px-1 pb-3 pt-1 md:hidden"
      aria-label="Branch sections"
    >
      <ul className="flex items-start justify-around gap-0.5">
        {MOBILE_ICON_NAV_ITEMS.map((item) => {
          const Icon = ICONS[item.icon] || LayoutGrid;
          const active = getBranchNavActive(item, pathname, currentHash);
          const targetUrl = `${basePath}${item.route}`;
          const href = item.scrollTo ? `${targetUrl}#${item.scrollTo}` : targetUrl;

          return (
            <li key={item.name} className="flex min-w-0 flex-1 flex-col items-center">
              <a
                href={href}
                onClick={(e) => handleNavClick(e, item)}
                className="flex flex-col items-center gap-1 no-underline"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full p-[3px] shadow-sm sm:h-14 sm:w-14 ${ICON_GRADIENT} ${
                    active ? "opacity-100" : "opacity-70"
                  }`}
                >
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-white">
                    <Icon className="h-5 w-5 text-primary sm:h-6 sm:w-6" strokeWidth={1.75} />
                  </span>
                </span>
                <span
                  className={`text-center text-[10px] font-semibold leading-tight sm:text-xs ${
                    active ? LABEL_GRADIENT : "text-gray-500"
                  }`}
                >
                  {item.name}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
