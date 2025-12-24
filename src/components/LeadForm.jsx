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
        <div className="w-full">
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
            <div className="w-full md:pb-10">
                <div className="m w-full bg-white border border-blue-400 rounded-xl shadow-md p-6 mx-auto md:mx-0">
                    <h2 className="text-xl font-bold text-center text-blue-900 mb-4">
                        Request a Call Back
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
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
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-full"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>


    );
}
