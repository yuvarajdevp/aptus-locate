import React from "react";
import BranchPageBanner from "@/components/Home/BranchPageBanner";
import ContactUs from "@/components/ContactUs";

export default async function ContactContent({ slug }) {
    return (
        <>
            <BranchPageBanner slug={slug} />
            <ContactUs />
        </>
    );
}
