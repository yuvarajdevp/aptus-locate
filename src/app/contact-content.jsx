import React from "react";
import BranchPageBanner from "@/components/Home/BranchPageBanner";
import ContactUs from "@/components/ContactUs";

export default async function ContactContent({ slug }) {
    return (
        <div className="bg-white">
            <BranchPageBanner slug={slug} />
            <ContactUs />
        </div>
    );
}
