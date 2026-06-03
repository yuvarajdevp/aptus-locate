// ============================================================================
// 1. layout/Header.jsx - FIXED
// ============================================================================
"use client";
import Image from "next/image";
import AptusLogo from '../../public/aptus_logo.webp';
import { usePathname, useRouter } from 'next/navigation';
import Link from "next/link";
import UnderLine from "@/components/UnderLine";
import MobileBranchNav from "@/layout/MobileBranchNav";
import { useEffect, useState } from "react";

export default function Header() {
  const pathName = usePathname();
  const router = useRouter();
  const [currentHash, setCurrentHash] = useState('');

  // Track hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    // Set initial hash
    setCurrentHash(window.location.hash);

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // ✅ FIXED: Properly handle article pages
  const getUrl = () => {
    const segments = pathName.split('/').filter(Boolean);

    // If we're on an article page: /branch-slug/articles/article-slug
    if (segments.length >= 3 && segments[segments.length - 2] === 'articles') {
      // Return just the branch slug
      return `/${segments.slice(0, -2).join('/')}`;
    }

    // If we're on the articles list page: /branch-slug/articles
    if (segments[segments.length - 1] === 'articles') {
      // Return just the branch slug
      return `/${segments.slice(0, -1).join('/')}`;
    }

    // Default: remove last segment
    return `/${segments.slice(0, -1).join('/')}`;
  };

  const shouldDisplayButton =
    pathName?.includes('whats-new') ||
    pathName.includes('overview') ||
    pathName.includes('contact') ||
    pathName.includes('articles') ||
    pathName.includes('gallery') ||
    pathName.includes('reviewForm');

  const navList = [
    { name: 'Overview', route: '/overview' },
    { name: 'Products', route: '/overview', scrollTo: 'products-section' },
    // { name: 'Products', route: '/products' },
    { name: 'Articles', route: '/articles' },
    { name: 'Gallery', route: '/gallery' },
    { name: 'Contact Us', route: '/contact' }
  ];

  // ✅ Smooth scroll to element
  const smoothScrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // ✅ Handle navigation with smooth scroll
  const handleNavClick = (e, item) => {
    e.preventDefault();

    const baseUrl = getUrl();
    const targetUrl = item.name === "Offers" ? item.route : `${baseUrl}${item.route}`;
    const currentPath = pathName.split('#')[0];
    const targetPath = targetUrl.split('#')[0];

    // Check if we're navigating to the same page
    if (currentPath === targetPath) {
      // Same page - just scroll if there's a scrollTo target
      if (item.scrollTo) {
        smoothScrollToElement(item.scrollTo);
        setCurrentHash(`#${item.scrollTo}`);
        window.history.pushState({}, '', `${targetUrl}#${item.scrollTo}`);
      } else {
        // Scroll to top and clear hash
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCurrentHash('');
        window.history.pushState({}, '', targetUrl);
      }
    } else {
      // Different page - navigate
      if (item.scrollTo) {
        router.push(`${targetUrl}#${item.scrollTo}`);
      } else {
        router.push(targetUrl);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="mx-auto flex max-w-screen-xl items-center justify-center px-4 py-3 md:justify-between">
        <div className="md:flex-none">
          <Link href="/" className="inline-block">
            <Image
              src={AptusLogo}
              alt="Aptus Logo"
              className="h-auto w-[120px] img-fluid md:w-[170px]"
            />
          </Link>
        </div>

        <div className="hidden md:flex align-middle justify-evenly gap-10">
          {shouldDisplayButton &&
            navList.map((data, index) => {
              const baseUrl = getUrl();
              const targetUrl = data.name === "Offers" ? data.route : `${baseUrl}${data.route}`;
              const currentPath = pathName.split('#')[0];
              const targetPath = targetUrl.split('#')[0];

              // ✅ Determine active state based on route AND hash
              let active = false;

              if (data.name === 'Articles') {
                // Articles tab: active if on any articles page
                active = currentPath.includes('/articles');
              } else if (data.scrollTo) {
                // Products tab: active only when hash matches
                active = currentPath === targetPath && currentHash === `#${data.scrollTo}`;
              } else if (currentPath === targetPath) {
                // Overview tab: active only when on overview with NO hash or different hash
                active = !currentHash || currentHash !== '#products-section';
              } else {
                // Other tabs: active if path matches
                active = currentPath === targetPath;
              }

              return (
                <ul key={index} className="navbar-nav m-md-2 p-md-2 p-1 position-relative">
                  <div className="d-flex flex-col gap-1">
                    <a
                      href={data.scrollTo ? `${targetUrl}#${data.scrollTo}` : targetUrl}
                      onClick={(e) => handleNavClick(e, data)}
                      className="text-decoration-none nav text-dark cursor-pointer"
                      {...(data.name === "Offers" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      <span className={`${active ? 'font-bold text-primary' : 'text-black'} p-1`}>
                        {data.name}
                      </span>
                    </a>

                    {/* Show underline only if active */}
                    <UnderLine Linewidth="100%" left="true" active={active} />
                  </div>
                </ul>
              );
            })}
        </div>

        <div className="hidden md:block w-[170px]" aria-hidden />
      </div>

      {shouldDisplayButton && <MobileBranchNav />}
    </header>
  );
}
