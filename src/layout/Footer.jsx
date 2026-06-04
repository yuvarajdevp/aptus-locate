import React from "react";
import Link from "next/link";
import { type } from "@/lib/typography";

const Footer = ({ aboutDetails }) => {
  // console.log(aboutDetails, "aboutDetails");

  const colors = [
    "bg-[#E3F4FF]",
    "bg-[#FFE3E3]",
    "bg-[#E3FFE7]",
    "bg-[#FFF3E3]",
    "bg-[#EDE3FF]",
    "bg-[#FFD6E3]",
    "bg-[#E3F9FF]",
    "bg-[#FFF9E3]",
  ];

  return (
    <>
      {/* ✅ About Section */}
      <section className="container mx-auto px-4 py-8 text-center md:py-10">
        <h2 className={`mb-4 ${type.sectionTitle} text-primary`}>
          {aboutDetails?.about}
        </h2>
        <p className={`mx-auto max-w-3xl ${type.body}`}>{aboutDetails?.aboutDetail}</p>
      </section>

      {/* ✅ Tags Section */}
      <section className="px-4 py-6 text-center md:py-10">
        <h2 className={`mb-4 text-primary md:mb-6 ${type.cardTitle}`}>
          Popular searches
        </h2>
        <ul className="mx-auto grid w-full max-w-screen-xl grid-cols-2 gap-2 md:flex md:flex-wrap md:justify-center md:gap-4">
          {aboutDetails?.tags?.map((tag, i) => (
            <li key={i} className="min-w-0">
              {tag?.name && (
                <Link
                  href={tag.link || "/"}
                  className={`block w-full rounded-xl px-2 py-1.5 ${type.caption} font-medium leading-tight text-black transition hover:opacity-80 md:inline-block md:w-auto md:rounded-2xl md:px-4 md:py-2 md:text-body-sm ${
                    tag.name ? colors[i % colors.length] : ""
                  }`}
                >
                  {tag.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </section>
      {/* ✅ Footer Bottom */}
      <footer className="mt-6 bg-primary text-primary-foreground md:mt-10">
        <div className="container mx-auto px-3 py-3 sm:px-4 sm:py-4">
          <div
            className={`flex flex-nowrap items-center justify-between gap-1 sm:gap-3 ${type.footer}`}
          >
            <span className="shrink-0 whitespace-nowrap">
              All rights reserved &copy; {new Date().getFullYear()}
            </span>
            <span className="shrink-0 whitespace-nowrap text-center">
              Privacy policy | Terms of use
            </span>
            <span className="shrink-0 whitespace-nowrap text-right">
              Powered by Tuskmelon
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
