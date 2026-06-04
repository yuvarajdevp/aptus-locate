"use client";

import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Minus } from "lucide-react";
import Image from "next/image";
import banner_app from "@/assets/banner_app.webp";
import { type } from "@/lib/typography";
export default function FAQ() {
    const faqData = [
        {
            id: 1,
            question: "Can I get a loan to build a house on my own land?",
            answer:
                "Yes, you can avail a Self–Construction Loan to construct a house or flat on land that you legally own.",
            cta: "Apply For Loan",
        },
        {
            id: 2,
            question: "Can I take a loan to renovate or expand my existing home?",
            answer:
                "Yes, Home Renovation & Extension Loans help you finance interior upgrades, additional rooms, or structure modifications.",
            cta: "Apply For Loan",
        },
        {
            id: 3,
            question:
                "Can I get a loan to buy a newly constructed flat or house from a builder?",
            answer: "Yes, you can get a loan to buy a newly constructed property.",
        },
        {
            id: 4,
            question: "What documents are required for a self-construction loan?",
            answer: "You will need identity proof, property documents, and income proof.",
        },
        {
            id: 5,
            question: "Can I purchase an already–built home using a loan?",
            answer: "Yes, loans are available for already built homes.",
        },
        {
            id: 6,
            question: "What kind of properties are eligible?",
            answer: "Residential properties, approved plots, and some resale properties.",
        },
        {
            id: 7,
            question: "Is there a limit to the loan amount?",
            answer: "Yes, the loan limit depends on eligibility and property value.",
        },
        {
            id: 8,
            question: "Are there additional checks for resale properties?",
            answer:
                "Yes, resale properties require additional checks on property age and legal clearance.",
        },
    ];

    const firstCol = faqData.slice(0, Math.ceil(faqData.length / 2));
    const secondCol = faqData.slice(Math.ceil(faqData.length / 2));

    return (
        <>
            <section className="my-12 w-full overflow-hidden md:my-20">
                <Image
                    src={banner_app}
                    alt="Aptus Bandhu Partner app"
                    width={1920}
                    height={400}
                    className="h-auto w-full object-cover object-center"
                    priority
                />
            </section>

            <div className="container mx-auto max-w-screen-xl px-4">


                <h2 className={`mb-6 text-start text-[#002F6C] sm:mb-10 ${type.sectionTitle}`}>
                    Frequently Asked Questions
                </h2>

                <div className="max-w mx-auto  bg-[#E8FAFF] rounded-xl px-lg-8 px-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                        {[firstCol, secondCol].map((col, colIndex) => (
                            <Accordion
                                key={colIndex}
                                type="single"
                                collapsible
                                className="space-y-4"
                            >
                                {col.map((faq) => (
                                    <AccordionItem
                                        key={faq.id}
                                        value={`item-${faq.id}`}
                                        className="rounded-lg border bg-white shadow-sm p-4"
                                    >
                                        <AccordionTrigger
                                            className={`group flex items-center justify-between text-left no-underline text-[#3051A0] [&::after]:hidden ${type.body} font-medium`}
                                        >
                                            <span>{faq.question}</span>
                                            <span className="ml-2">
                                                {/* Plus (default) */}
                                                <Plus className="h-5 w-5 group-data-[state=open]:hidden transition-transform duration-300 text-[#6F6C90] bg-[#F7F7FF] rounded" />
                                                <Minus className="h-5 w-5 hidden group-data-[state=open]:block transition-transform duration-300 text-[#F7F7FF] bg-[#028DE8] rounded" />

                                            </span>
                                        </AccordionTrigger>

                                        <AccordionContent className={`mt-2 ${type.bodySm}`}>
                                            <p className={`mb-2 ${type.body}`}>{faq.answer}</p>
                                            {faq.cta && (
                                                <a
                                                    href="#"
                                                    className={`font-medium text-[#3051A0] hover:underline ${type.link}`}
                                                >
                                                    {faq.cta}
                                                </a>
                                            )}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
