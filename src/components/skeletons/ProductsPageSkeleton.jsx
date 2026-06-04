import BannerSkeleton from "./BannerSkeleton";
import ProductsSkeleton from "./ProductsSkeleton";
import FAQSkeleton from "./FAQSkeleton";

export default function ProductsPageSkeleton() {
    return (
        <>
            <BannerSkeleton />
            <ProductsSkeleton count={6} />
            <FAQSkeleton />
        </>
    );
}
