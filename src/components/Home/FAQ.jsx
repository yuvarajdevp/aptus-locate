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

            <div className="container-fluid my-20">
                <div className="m-0 p-0">
                    <Image
                        src={banner_app}
                        alt="Logo"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <div className="container mx-auto">


                <h2 className="text-3xl font-bold mb-10 text-start text-[#002F6C] text-[40px]">
                    Frequently Asked Questions
                </h2>

                <div className="max-w mx-auto p-8 bg-[#E8FAFF] rounded-xl ">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                            className=" group flex justify-between items-center text-left font-medium text-lg no-underline text-[#3051A0] [&::after]:hidden"
                                        >
                                            <span>{faq.question}</span>
                                            <span className="ml-2">
                                                {/* Plus (default) */}
                                                <Plus className="h-5 w-5 group-data-[state=open]:hidden transition-transform duration-300 text-[#6F6C90] bg-[#F7F7FF] rounded" />
                                                <Minus className="h-5 w-5 hidden group-data-[state=open]:block transition-transform duration-300 text-[#F7F7FF] bg-[#028DE8] rounded" />

                                            </span>
                                        </AccordionTrigger>

                                        <AccordionContent className="mt-2 text-gray-600">
                                            <p className="mb-2 text-base">{faq.answer}</p>
                                            {faq.cta && (
                                                <a
                                                    href="#"
                                                    className="font-medium hover:underline text-[#3051A0]"
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
