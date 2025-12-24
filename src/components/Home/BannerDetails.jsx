
// home/branchDetails

import React from 'react'
import Image from "next/image";
import HomeDetailsBanner from '@/assets/homedetailsbanner.webp'; // adjust extension

export default function BannerDetails() {
    return (
        <section className=" container-fluid mx-auto w-full">

            <Image
                src={HomeDetailsBanner}
                alt="Banner"
                className="img-fluid w-full"
            />

        </section>
    )
}
``