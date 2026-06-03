import React from "react";
import Link from "next/link";

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
      <section className="container mx-auto py-10 text-center px-lg-0 px-2">
        <h2 className="text-4xl font-bold text-primary mb-6">
          {aboutDetails?.about}
        </h2>
        <p>{aboutDetails?.aboutDetail}</p>
      </section>

      {/* ✅ Tags Section */}
      <section className="px-4 py-8 text-center md:py-10">
        <h2 className="mb-4 text-xl font-bold text-primary md:mb-6 md:text-4xl">
          Popular searches
        </h2>
        <ul className="mx-auto grid w-full max-w-screen-xl grid-cols-2 gap-2 md:flex md:flex-wrap md:justify-center md:gap-4">
          {aboutDetails?.tags?.map((tag, i) => (
            <li key={i} className="min-w-0">
              {tag?.name && (
                <Link
                  href={tag.link || "/"}
                  className={`block w-full rounded-xl px-2 py-1.5 text-[11px] font-medium leading-tight text-black transition hover:opacity-80 md:inline-block md:w-auto md:rounded-2xl md:px-4 md:py-2 md:text-base ${
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
      <footer className="mt-10 bg-primary text-primary-foreground">
        <div className="container mx-auto flex flex-wrap justify-between py-5 text-sm">
          <p>All rights reserved &copy; {new Date().getFullYear()}</p>
          <p>Powered by Tuskmelon</p>
          <p>Privacy policy | Terms of use</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
