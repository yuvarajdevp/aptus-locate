"use client";

import { usePathname } from "next/navigation";
import PageLoadingShell from "./PageLoadingShell";
import OverviewPageSkeleton from "./OverviewPageSkeleton";
import ArticlesPageSkeleton from "./ArticlesPageSkeleton";
import ArticleDetailPageSkeleton from "./ArticleDetailPageSkeleton";
import ProductsPageSkeleton from "./ProductsPageSkeleton";
import ContactPageSkeleton from "./ContactPageSkeleton";
import GalleryPageSkeleton from "./GalleryPageSkeleton";
import {
    getSlugRouteSkeletonType,
    ROUTE_SKELETON,
} from "@/lib/routeSkeleton";

export default function SlugRouteLoading() {
    const pathname = usePathname() || "";
    const skeletonType = getSlugRouteSkeletonType(pathname);

    const renderContent = () => {
        switch (skeletonType) {
            case ROUTE_SKELETON.ARTICLE_DETAIL:
                return <ArticleDetailPageSkeleton />;
            case ROUTE_SKELETON.OVERVIEW:
                return <OverviewPageSkeleton />;
            case ROUTE_SKELETON.ARTICLES_LIST:
                return <ArticlesPageSkeleton />;
            case ROUTE_SKELETON.PRODUCTS:
                return <ProductsPageSkeleton />;
            case ROUTE_SKELETON.CONTACT:
                return <ContactPageSkeleton />;
            case ROUTE_SKELETON.GALLERY:
                return <GalleryPageSkeleton />;
            default:
                return <OverviewPageSkeleton />;
        }
    };

    return <PageLoadingShell>{renderContent()}</PageLoadingShell>;
}
