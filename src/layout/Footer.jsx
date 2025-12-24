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
      <section className="container mx-auto py-10 text-center">
        <h2 className="text-4xl font-bold text-[#0A2973] mb-6">
          {aboutDetails?.about}
        </h2>
        <p>{aboutDetails?.aboutDetail}</p>
      </section>

      {/* ✅ Tags Section */}
      <section className="py-10 text-center">
        <h2 className="text-4xl font-bold text-[#0A2973] mb-6">
          Popular searches
        </h2>
        <ul className="container mx-auto flex flex-wrap justify-center gap-5">
          {aboutDetails?.tags?.map((tag, i) => (
            <li key={i}>
              {tag?.name && (
                <Link
                  href={tag.link || "/"}
                  className={`px-4 py-2 rounded-2xl text-black text-[16px] font-medium ${tag.name ? colors[i % colors.length] : ""
                    } hover:opacity-80 transition inline-block`}
                >
                  {tag.name}
                </Link>
              )}
            </li>
          ))}

        </ul>
      </section>
      {/* ✅ Footer Bottom */}
      <footer className="bg-[#1461B9] text-white mt-10">
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
