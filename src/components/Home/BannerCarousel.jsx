"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import staticFallbackBanner from "@/assets/homedetailsbanner.webp";

const isExternalLink = (url) => /^https?:\/\//i.test(url || "");

const scrollToSection = (targetId) => {
  const element = document.getElementById(targetId);
  if (!element) return;
  const headerOffset = 120;
  const top =
    element.getBoundingClientRect().top + window.pageYOffset - headerOffset;
  window.scrollTo({ top, behavior: "smooth" });
  window.history.pushState({}, "", `#${targetId}`);
};

const carouselResponsive = {
  all: {
    breakpoint: { max: 4000, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const resolveSlideImages = (slide) => {
  const desktopSrc = slide?.desktopSrc || staticFallbackBanner;
  const mobileSrc = slide?.mobileSrc || desktopSrc || staticFallbackBanner;
  return { desktopSrc, mobileSrc };
};

function BannerItem({ slide, scrollTargetId }) {
  const { desktopSrc, mobileSrc } = resolveSlideImages(slide);
  const link = scrollTargetId ? "" : slide?.link?.trim();

  const content = (
    <div className="relative w-full min-w-0 overflow-hidden bg-[#F3F4F6]">
      <Image
        src={desktopSrc}
        alt="Banner"
        width={1600}
        height={450}
        priority
        sizes="100vw"
        className="hidden h-auto w-full object-cover md:block"
        unoptimized
      />
      <Image
        src={mobileSrc}
        alt="Banner"
        width={900}
        height={500}
        priority
        sizes="100vw"
        className="block h-auto w-full object-cover md:hidden"
        unoptimized
      />
    </div>
  );

  if (scrollTargetId) {
    return (
      <button
        type="button"
        onClick={() => scrollToSection(scrollTargetId)}
        className="block w-full cursor-pointer border-0 bg-transparent p-0 text-left"
        aria-label="Go to request callback form"
      >
        {content}
      </button>
    );
  }

  if (!link) return content;

  if (isExternalLink(link)) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block w-full">
        {content}
      </a>
    );
  }

  return (
    <Link href={link} className="block w-full">
      {content}
    </Link>
  );
}

function CarouselArrow({ onClick, direction = "prev" }) {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      onClick={() => onClick?.()}
      className={`absolute top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white shadow-md transition hover:bg-black/65 md:flex ${
        isPrev ? "left-3 md:left-5" : "right-3 md:right-5"
      }`}
      aria-label={isPrev ? "Previous banner" : "Next banner"}
    >
      {isPrev ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
    </button>
  );
}

export default function BannerCarousel({ slides = [], scrollTargetId }) {
  const [isMobile, setIsMobile] = useState(false);

  const safeSlides = useMemo(
    () => (Array.isArray(slides) && slides.length ? slides : [{ id: "fallback-static" }]),
    [slides]
  );
  const isSingleSlide = safeSlides.length <= 1;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section className="banner-carousel relative w-full max-w-full overflow-hidden">
      <Carousel
        responsive={carouselResponsive}
        infinite={!isSingleSlide}
        autoPlay={!isSingleSlide}
        autoPlaySpeed={5000}
        arrows={!isSingleSlide}
        showDots={!isSingleSlide}
        swipeable
        draggable={!isSingleSlide}
        keyBoardControl
        pauseOnHover
        partialVisible={false}
        transitionDuration={400}
        customLeftArrow={<CarouselArrow direction="prev" />}
        customRightArrow={<CarouselArrow direction="next" />}
        renderDotsOutside={isMobile}
        containerClass="banner-carousel-container"
        itemClass="banner-carousel-item"
        dotListClass={`banner-carousel-dots ${isMobile ? "banner-carousel-dots--below" : ""}`}
      >
        {safeSlides.map((slide, slideIndex) => (
          <BannerItem
            key={slide?.id || slideIndex}
            slide={slide}
            scrollTargetId={scrollTargetId}
          />
        ))}
      </Carousel>

      <style jsx global>{`
        .banner-carousel {
          width: 100%;
        }
        .banner-carousel .banner-carousel-container,
        .banner-carousel .react-multi-carousel-list,
        .banner-carousel .react-multi-carousel-track {
          width: 100% !important;
        }
        .banner-carousel .banner-carousel-item,
        .banner-carousel .react-multi-carousel-item {
          width: 100% !important;
          min-width: 100% !important;
          max-width: 100% !important;
          flex: 0 0 100% !important;
          padding-right: 0 !important;
        }
        .banner-carousel .react-multi-carousel-list {
          overflow: hidden !important;
        }
        .banner-carousel .banner-carousel-dots {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          margin: 0;
          padding: 0;
          list-style: none;
          z-index: 20;
        }
        .banner-carousel .banner-carousel-dots--below {
          position: static;
          transform: none;
          justify-content: center;
          margin-top: 10px;
          padding-bottom: 4px;
        }
        .banner-carousel .banner-carousel-dots--below li button {
          background: #9ca3af !important;
        }
        .banner-carousel .banner-carousel-dots--below .react-multi-carousel-dot--active button {
          background: #374151 !important;
        }
        .banner-carousel .react-multi-carousel-dot button {
          width: 8px;
          height: 8px;
          border: none;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.55);
        }
        .banner-carousel .react-multi-carousel-dot--active button {
          background: #ffffff;
        }
      `}</style>
    </section>
  );
}
