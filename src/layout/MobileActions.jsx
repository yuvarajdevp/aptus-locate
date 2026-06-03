"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Phone, Search } from "lucide-react";
import {
  APTUS_HELP_PHONE_TEL,
  getBranchBasePath,
  HOME_SEARCH_HASH,
  isBranchSubPage,
} from "@/lib/branchNav";

export default function MobileActions() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (!isBranchSubPage(pathname) && !isHome) return null;

  const basePath = isHome ? "" : getBranchBasePath(pathname);
  const contactHref = basePath ? `${basePath}/contact` : null;
  const searchHref = `/${HOME_SEARCH_HASH}`;

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
              <span>Call Now</span>
            </a>

            <span className="w-[52px] shrink-0" aria-hidden />

            {contactHref ? (
              <Link
                href={contactHref}
                className="flex min-w-0 flex-1 items-center justify-center gap-1.5 px-2 text-sm font-medium text-primary-foreground no-underline hover:bg-white/10"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
                <span>Contact Us</span>
              </Link>
            ) : (
              <span className="flex-1" aria-hidden />
            )}
          </div>

          <Link
            href={searchHref}
            className="absolute left-1/2 top-0 flex h-[52px] w-[52px] -translate-x-1/2 -translate-y-[38%] items-center justify-center rounded-full border-[3px] border-white bg-gradient-to-br from-primary via-primary-light to-secondary text-primary-foreground shadow-lg no-underline"
            aria-label="Search branches on home page"
          >
            <Search className="h-5 w-5" strokeWidth={2.25} />
          </Link>
        </div>
      </div>
    </div>
  );
}
