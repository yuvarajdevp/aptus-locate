import React from "react";
import BannerCarousel from "@/components/Home/BannerCarousel";
import { resolveBannerSlides } from "@/lib/resolveBannerSlides";

/**
 * @param {Object} props
 * @param {string} [props.state] - Branch/state name for targeted banners
 * @param {string} [props.branchType] - Branch type (e.g. HFC, MTC) for targeted banners
 * @param {string} [props.bannerRef] - Optional Strapi banner ref/slug key
 * @param {string} [props.scrollTargetId] - If set, banner click scrolls to this section (e.g. callback form)
 */
export default async function BannerDetails({
  state,
  branchType,
  bannerRef,
  scrollTargetId,
}) {
  const { slides } = await resolveBannerSlides({ state, branchType, bannerRef });

  return <BannerCarousel slides={slides} scrollTargetId={scrollTargetId} />;
}
