"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Share2, Search } from "lucide-react";
import {
  APTUS_HELP_PHONE_TEL,
  HOME_SEARCH_HASH,
  isBranchSearchPage,
  isBranchSubPage,
} from "@/lib/branchNav";

async function shareCurrentPage() {
  try {
    if (navigator.share) {
      await navigator.share({
        title: "Aptus Branch Locator",
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    }
  } catch (error) {
    if (error?.name !== "AbortError") {
      console.error("Share error:", error);
    }
  }
}

export default function MobileActions() {
  const pathname = usePathname();
  const isSearchPage = isBranchSearchPage(pathname);
  const isDetailPage = isBranchSubPage(pathname);

  if (!isSearchPage && !isDetailPage) return null;

  const searchHref = `/${HOME_SEARCH_HASH}`;

  if (isSearchPage) {
    return (
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-50 w-full md:hidden">
        <div className="pointer-events-auto w-full px-3 pb-3 pt-1">
          <div className="mx-auto flex h-[52px] w-full max-w-lg overflow-hidden rounded-full bg-primary shadow-[0_4px_20px_rgba(25,67,140,0.35)]">
            <a
              href={APTUS_HELP_PHONE_TEL}
              className="flex min-w-0 flex-1 items-center justify-center gap-2 px-3 text-sm font-medium text-primary-foreground no-underline hover:bg-white/10"
            >
              <Phone className="h-4 w-4 shrink-0" aria-hidden />
              <span>Call us</span>
            </a>
            <div className="w-px shrink-0 bg-white/25" aria-hidden />
            <button
              type="button"
              onClick={shareCurrentPage}
              className="flex min-w-0 flex-1 items-center justify-center gap-2 border-0 bg-transparent px-3 text-sm font-medium text-primary-foreground hover:bg-white/10"
            >
              <Share2 className="h-4 w-4 shrink-0" aria-hidden />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-50 w-full md:hidden">
      <div className="pointer-events-auto w-full px-3 pb-3 pt-1">
        <div className="relative mx-auto w-full max-w-lg">
          <div className="flex h-[52px] w-full items-stretch overflow-hidden rounded-full bg-primary shadow-[0_4px_20px_rgba(25,67,140,0.35)]">
            <a
              href={APTUS_HELP_PHONE_TEL}
              className="flex min-w-0 flex-1 items-center justify-center gap-2 px-2 text-sm font-medium text-primary-foreground no-underline hover:bg-white/10"
            >
              <Phone className="h-4 w-4 shrink-0" aria-hidden />
              <span>Call us</span>
            </a>

            <span className="w-[52px] shrink-0" aria-hidden />

            <button
              type="button"
              onClick={shareCurrentPage}
              className="flex min-w-0 flex-1 items-center justify-center gap-2 border-0 bg-transparent px-2 text-sm font-medium text-primary-foreground hover:bg-white/10"
            >
              <Share2 className="h-4 w-4 shrink-0" aria-hidden />
              <span>Share</span>
            </button>
          </div>

          <Link
            href={searchHref}
            className="absolute left-1/2 top-0 flex h-[52px] w-[52px] -translate-x-1/2 -translate-y-[38%] items-center justify-center rounded-full border-[3px] border-white bg-gradient-to-br from-primary via-primary-light to-secondary text-primary-foreground shadow-lg no-underline"
            aria-label="Search branches"
          >
            <Search className="h-5 w-5" strokeWidth={2.25} />
          </Link>
        </div>
      </div>
    </div>
  );
}
