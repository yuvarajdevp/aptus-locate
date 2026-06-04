import React from 'react';
import { Mail, Phone, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import { type } from '@/lib/typography';

const SOCIAL_LINKS = [
    { Icon: Facebook, label: 'Facebook', hover: 'hover:text-blue-600' },
    { Icon: Twitter, label: 'Twitter', hover: 'hover:text-blue-400' },
    { Icon: Linkedin, label: 'LinkedIn', hover: 'hover:text-blue-700' },
    { Icon: Youtube, label: 'YouTube', hover: 'hover:text-red-600' },
];

export default function ContactUs() {
    return (
        <section className="w-full bg-white">
            <div className="container mx-auto w-full px-4 py-6 sm:px-6 md:max-w-7xl md:py-4 lg:py-5">
                <div className="mb-4 md:mb-3">
                    <h2 className={`mb-1.5 ${type.eyebrow}`}>
                        Head Office Address
                    </h2>
                    <h1 className={`mb-2 text-gray-900 md:mb-2 ${type.sectionTitle}`}>
                        Aptus Value Housing Finance India Ltd
                    </h1>
                    <p className={`max-w-3xl leading-relaxed ${type.body}`}>
                        No. 8B, Doshi Towers, 8th Floor, No: 205, Poonamallee High Road,
                        <br className="hidden sm:inline" />
                        {' '}Kilpauk, Chennai 600 010, Tamil Nadu, India
                    </p>
                </div>

                <div className="border-t border-gray-200 pt-4 md:pt-4">
                    <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center md:gap-x-8 md:gap-y-3 lg:gap-x-10">
                        <div className="flex min-w-0 items-start gap-3 md:max-w-md">
                            <div className="shrink-0 rounded-lg bg-green-500 p-2.5 md:p-3">
                                <Mail className="h-5 w-5 text-white md:h-6 md:w-6" />
                            </div>
                            <a
                                href="mailto:customercare@aptusindia.com"
                                className={`min-w-0 flex-1 pt-0.5 font-semibold text-gray-900 transition-colors hover:text-green-600 break-words ${type.body}`}
                            >
                                customercare@aptusindia.com
                            </a>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="shrink-0 rounded-lg bg-green-500 p-2.5 md:p-3">
                                <Phone className="h-5 w-5 text-white md:h-6 md:w-6" />
                            </div>
                            <a
                                href="tel:044-45650000"
                                className={`pt-0.5 font-semibold text-gray-900 transition-colors hover:text-green-600 ${type.body}`}
                            >
                                044-45650000
                            </a>
                        </div>

                        <div className="flex items-center gap-3 pt-0 md:ml-auto md:pt-0">
                            {SOCIAL_LINKS.map(({ Icon, label, hover }) => (
                                <a
                                    key={label}
                                    href="#"
                                    className={`text-gray-400 transition-colors ${hover}`}
                                    aria-label={label}
                                >
                                    <Icon className="h-5 w-5 md:h-6 md:w-6" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
