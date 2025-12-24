import React from 'react';
import { Mail, Phone, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';

export default function ContactUs() {
    return (
        <div className="  flex items-center justify-center p-6">
            <div className="bg-white rounded-lg  m-4 w-full px-12 py-6">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-gray-500 text-sm font-semibold tracking-wider uppercase mb-2">
                        Head Office Address
                    </h2>
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        Aptus Value Housing Finance India Ltd
                    </h1>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        No. 8B, Doshi Towers, 8th Floor, No: 205, Poonamallee High Road,<br />
                        Kilpauk, Chennai 600 010, Tamil Nadu, India
                    </p>
                </div>

                {/* Contact Information */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 py-8 border-t border-gray-200">
                    {/* Email */}
                    <div className="flex items-center gap-3">
                        <div className="bg-green-500 p-3 rounded-lg">
                            <Mail className="w-6 h-6 text-white" />
                        </div>
                        <a
                            href="mailto:customercare@aptusindia.com"
                            className="text-xl font-semibold text-gray-900 hover:text-green-600 transition-colors"
                        >
                            customercare@aptusindia.com
                        </a>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-3">
                        <div className="bg-green-500 p-3 rounded-lg">
                            <Phone className="w-6 h-6 text-white" />
                        </div>
                        <a
                            href="tel:044-45650000"
                            className="text-xl font-semibold text-gray-900 hover:text-green-600 transition-colors"
                        >
                            044-45650000
                        </a>
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex items-center gap-4">
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
        </div>
    );
}
