
// ============================================================================
// 2. components/TopBar.jsx - FIXED
// ============================================================================
"use client";
import { usePathname, useRouter } from "next/navigation";

const TopBar = ({
  showAadhaar,
  currentPage,
  dynamicPath,
  shouldDisplayMenu,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const navList = [
    {
      name: "Overview",
      index: 0,
      route: "/overview",
    },
    {
      name: "Products",
      index: 1,
      route: "/overview",
      scrollTo: "products-section",
    },
    {
      name: "Articles",
      index: 2,
      route: "/articles",
    },
    {
      name: "Gallery",
      index: 3,
      route: "/gallery",
    },
    {
      name: "Contact Us",
      index: 4,
      route: "/contact",
    }
    // {
    //   name: "Products",
    //   index: 5,
    //   route: "/products",
    // }
  ];

  if (!shouldDisplayMenu) return null;

  // ✅ FIXED: Get proper base path for navigation
  const getBasePath = () => {
    const segments = pathname.split('/').filter(Boolean);

    // If we're on an article page: /branch-slug/articles/article-slug
    if (segments.length >= 3 && segments[segments.length - 2] === 'articles') {
      return `/${segments.slice(0, -2).join('/')}`;
    }

    // If we're on the articles list page: /branch-slug/articles
    if (segments[segments.length - 1] === 'articles') {
      return `/${segments.slice(0, -1).join('/')}`;
    }

    // Use dynamicPath if available, otherwise extract from pathname
    return dynamicPath || `/${segments.slice(0, -1).join('/')}`;
  };

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

  // ✅ Handle navigation click
  const handleNavClick = (e, item) => {
    e.preventDefault();

    const basePath = getBasePath();
    const targetUrl = `${basePath}${item.route}`;
    const currentPath = pathname.split('#')[0];
    const targetPath = targetUrl.split('#')[0];

    // Check if we're on the same page
    if (currentPath === targetPath) {
      // Same page - just scroll
      if (item.scrollTo) {
        smoothScrollToElement(item.scrollTo);
        window.history.pushState({}, '', `${targetUrl}#${item.scrollTo}`);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <ul className="flex flex-wrap justify-center gap-4 py-2">
      {navList.map((item, index) => {
        const basePath = getBasePath();
        const targetUrl = `${basePath}${item.route}`;
        const currentPath = pathname.split('#')[0];
        const targetPath = targetUrl.split('#')[0];

        // ✅ FIXED: Active state for Articles
        let isActive = false;

        if (item.name === 'Articles') {
          // Articles is active if we're on any articles page
          isActive = currentPath.includes('/articles');
        } else if (item.scrollTo) {
          // Products: active if on overview page
          isActive = currentPath.includes('/overview');
        } else {
          // Other tabs: active if path matches
          isActive = currentPath === targetPath;
        }

        return (
          <li key={index}>
            <a
              href={item.scrollTo ? `${targetUrl}#${item.scrollTo}` : targetUrl}
              onClick={(e) => handleNavClick(e, item)}
              className={`text-sm px-3 py-1 font-medium rounded-md transition cursor-pointer inline-block ${isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-blue-100"
                }`}
            >
              {item.name}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default TopBar;