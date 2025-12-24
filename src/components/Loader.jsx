'use client'
import React from 'react'
// import { Bars, ThreeDots } from 'react-loader-spinner';

import '@/style/Loader.css'
// import Image from 'next/image';
const Loader = () => {
    return (
        <div className='flex-row d-flex justify-content-center loader-overlay' style={{ height: "100vh" }}>
            <div className='flex-column d-flex justify-content-center loader'>
                <h1>Loading...</h1>
            </div>


        </div>

    )
}

export default Loader