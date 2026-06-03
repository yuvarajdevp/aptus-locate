"use client";

import { useState } from "react";
import Image from "next/image";
// import homebanner from "@/assets/overviewbanner.webp";

export default function CallbackPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        pincode: "",
        service: "",
    });

    const [errors, setErrors] = useState({});

    // handle input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // validation function
    const validate = () => {
        let newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
        if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = "Phone number must be 10 digits";
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format";
        if (!/^[0-9]{6}$/.test(formData.pincode)) newErrors.pincode = "Pincode must be 6 digits";
        if (!formData.service) newErrors.service = "Please select an option";
        return newErrors;
    };

    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            console.log("Form submitted ✅", formData);
            alert("Form submitted successfully!");
        }
    };

    return (
        <div className="flex h-full w-full flex-col">
            {/* Background / Banner Image */}
            {/* <div className="w-full md:absolute inset-0 -z-10">
                <div className="relative w-full h-full md:h-full">
                    <Image
                        src={homebanner}
                        alt="Branch banner"
                        fill
                        priority
                        className="object-contain w-full h-full"
                    />
                </div>
            </div> */}

            {/* Form Section */}
            <div className="flex h-full w-full flex-col pb-0 md:pb-10 lg:pb-0">
                <div className="flex h-full min-h-0 w-full min-w-0 max-w-full flex-col rounded-xl border border-blue-400 bg-white p-4 shadow-md sm:p-6">
                    <h2 className="mb-4 shrink-0 text-center text-xl font-bold text-blue-900">
                        Request a Call Back
                    </h2>

                    <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col gap-4">
                        {/* Full Name */}
                        <div>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2"
                            />
                            {errors.fullName && (
                                <p className="text-red-500 text-sm">{errors.fullName}</p>
                            )}
                        </div>

                        {/* Phone Number */}
                        <div>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2"
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm">{errors.phone}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Id"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email}</p>
                            )}
                        </div>

                        {/* Pincode */}
                        <div>
                            <input
                                type="text"
                                name="pincode"
                                placeholder="Pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2"
                            />
                            {errors.pincode && (
                                <p className="text-red-500 text-sm">{errors.pincode}</p>
                            )}
                        </div>

                        {/* Dropdown */}
                        <div>
                            <select
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2"
                            >
                                <option value="">What you're looking for ...</option>
                                <option value="home-loan">Home Loan</option>

                            </select>
                            {errors.service && (
                                <p className="text-red-500 text-sm">{errors.service}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="mt-auto w-full rounded-full bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>


    );
}
