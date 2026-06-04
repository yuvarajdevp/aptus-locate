"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LayoutGrid, Package, Newspaper, Images, Phone } from "lucide-react";
import {
  getBranchBasePath,
  getBranchNavActive,
  isBranchSubPage,
  MOBILE_ICON_NAV_ITEMS,
  BRANCH_HEADER_SCROLL_OFFSET,
} from "@/lib/branchNav";
import { cn } from "@/lib/utils";
import { type } from "@/lib/typography";

const ICONS = {
  overview: LayoutGrid,
  products: Package,
  articles: Newspaper,
  gallery: Images,
  contact: Phone,
};

const ICON_GRADIENT =
  "bg-gradient-to-br from-[#1E2A78] via-[#1460B8] to-[#BDD261]";
const LABEL_GRADIENT =
  "bg-gradient-to-r from-[#1E2A78] to-[#BDD261] bg-clip-text text-transparent";

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
    const headerOffset = BRANCH_HEADER_SCROLL_OFFSET;
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
      className="w-full border-b border-gray-100 bg-white px-2 pb-2 pt-1 md:hidden"
      aria-label="Branch sections"
    >
      <ul className="flex items-start justify-between gap-0">
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
                aria-current={active ? "page" : undefined}
                className="flex w-full flex-col items-center gap-0.5 no-underline"
              >
                <span
                  className={cn(
                    "relative flex items-center justify-center transition-all duration-200",
                    active ? "h-11 w-11" : "h-10 w-10"
                  )}
                >
                  {active && (
                    <span
                      aria-hidden
                      className="absolute -inset-0.5 rounded-full border border-[#1460B8]/35 bg-[#E8FAFF] shadow-[0_0_0_2px_rgba(20,96,184,0.12)]"
                    />
                  )}
                  <span
                    className={cn(
                      "relative z-10 flex items-center justify-center rounded-full p-[2px] shadow-sm",
                      ICON_GRADIENT,
                      active ? "h-9 w-9 shadow-md" : "h-8 w-8 opacity-75"
                    )}
                  >
                    <span className="flex h-full w-full items-center justify-center rounded-full bg-white">
                      <Icon
                        className={cn(
                          "h-4 w-4",
                          active ? "text-[#1460B8]" : "text-[#1460B8]/70"
                        )}
                        strokeWidth={active ? 2.25 : 1.75}
                      />
                    </span>
                  </span>
                </span>
                <span
                  className={cn(
                    "max-w-[3.75rem] text-center leading-tight",
                    type.navLabel,
                    active ? LABEL_GRADIENT : "text-gray-500"
                  )}
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
