'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';

export default function NotFound() {
    const [seconds, setSeconds] = useState(5); // countdown seconds
    const [showLoader, setShowLoader] = useState(false); // show loader
    const router = useRouter();

    useEffect(() => {
        if (seconds === 0) {
            // Show loader and redirect after 1 second
            setShowLoader(true);
            const redirectTimeout = setTimeout(() => {
                router.push("/"); // redirect to homepage
            }, 1000);

            return () => clearTimeout(redirectTimeout);
        }

        const timer = setInterval(() => {
            setSeconds(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [seconds, router]);

    if (showLoader) return <Loader />; // show loader during redirect

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-lg mb-4">The page you are looking for does not exist.</p>
            <p className="text-lg">Redirecting to home page in {seconds} seconds...</p>
        </div>
    );
}
