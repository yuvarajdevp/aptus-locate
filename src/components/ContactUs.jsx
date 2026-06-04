import React from 'react';
import { Mail, Phone, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import { type } from '@/lib/typography';

export default function ContactUs() {
    return (
        <section className="w-full bg-white">
            <div className="container mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-8 md:py-10">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <h2 className={`mb-2 ${type.eyebrow}`}>
                        Head Office Address
                    </h2>
                    <h1 className={`mb-4 sm:mb-6 ${type.pageTitle}`}>
                        Aptus Value Housing Finance India Ltd
                    </h1>
                    <p className={`${type.body} leading-relaxed`}>
                        No. 8B, Doshi Towers, 8th Floor, No: 205, Poonamallee High Road,<br />
                        Kilpauk, Chennai 600 010, Tamil Nadu, India
                    </p>
                </div>

                {/* Contact Information */}
                <div className="flex flex-col gap-6 border-t border-gray-200 py-6 sm:py-8">
                    {/* Email */}
                    <div className="flex w-full items-start gap-3">
                        <div className="shrink-0 rounded-lg bg-green-500 p-3">
                            <Mail className="h-6 w-6 text-white" />
                        </div>
                        <a
                            href="mailto:customercare@aptusindia.com"
                            className={`min-w-0 flex-1 ${type.body} font-semibold text-gray-900 transition-colors hover:text-green-600 break-words`}
                        >
                            customercare@aptusindia.com
                        </a>
                    </div>

                    {/* Phone */}
                    <div className="flex w-full items-start gap-3">
                        <div className="shrink-0 rounded-lg bg-green-500 p-3">
                            <Phone className="h-6 w-6 text-white" />
                        </div>
                        <a
                            href="tel:044-45650000"
                            className={`${type.body} font-semibold text-gray-900 transition-colors hover:text-green-600`}
                        >
                            044-45650000
                        </a>
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex items-center justify-start gap-4 pt-1">
                        <a
                            href="#"
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                            aria-label="Facebook"
                        >
                            <Facebook className="w-6 h-6" />
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-blue-400 transition-colors"
                            aria-label="Twitter"
                        >
                            <Twitter className="w-6 h-6" />
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-blue-700 transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-6 h-6" />
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-red-600 transition-colors"
                            aria-label="YouTube"
                        >
                            <Youtube className="w-6 h-6" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
