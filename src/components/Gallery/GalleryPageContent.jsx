'use client';
import React, { useState } from 'react';

// Helper function to check if URL is a YouTube video
function isYouTubeUrl(url) {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
}

// Helper function to extract YouTube video ID from any URL format
function getYouTubeVideoId(url) {
    if (!url) return '';

    let videoId = '';

    // Handle YouTube Shorts: youtube.com/shorts/VIDEO_ID
    if (url.includes('/shorts/')) {
        videoId = url.split('/shorts/')[1].split('?')[0];
    }
    // Handle embed URL: youtube.com/embed/VIDEO_ID
    else if (url.includes('/embed/')) {
        videoId = url.split('/embed/')[1].split('?')[0];
    }
    // Handle regular YouTube: youtube.com/watch?v=VIDEO_ID
    else if (url.includes('watch?v=')) {
        videoId = url.split('watch?v=')[1].split('&')[0];
    }
    // Handle short URL: youtu.be/VIDEO_ID
    else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
    }

    return videoId;
}

// Helper function to convert any YouTube URL to embed format
function getYouTubeEmbedUrl(url) {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
}

// Helper function to get YouTube thumbnail
function getYouTubeThumbnail(url, quality = 'maxresdefault') {
    const videoId = getYouTubeVideoId(url);
    if (!videoId) return '';

    // Quality options: maxresdefault (1920x1080), sddefault (640x480), hqdefault (480x360), mqdefault (320x180), default (120x90)
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

// Mock data for images
const mockImages = [
    {
        id: 'img1',
        title: 'Home Loan Process at Aptus',
        url: '/gallery1.jpg',  // ✅ Reference directly with /
        thumbnail: '/gallery1.jpg',
        description: 'Beautiful aerial view of our campus facilities',
        date: '2024-12-15',
        category: 'Facilities'
    },
    {
        id: 'img2',
        title: 'Home Loan Process at Aptus',
        url: '/gallery2.jpg',  // ✅ Reference directly with /
        thumbnail: '/gallery2.jpg',
        description: 'State-of-the-art technology laboratory',
        date: '2024-12-08',
        category: 'Facilities'
    },
    {
        id: 'img3',
        title: 'Home Loan Process at Aptus',
        url: '/gallery3.jpg',  // ✅ Changed from /assets/ to /
        thumbnail: '/gallery3.jpg',
        description: 'Annual graduation ceremony celebration',
        date: '2024-12-01',
        category: 'Events'
    },
    {
        id: 'img4',
        title: 'low cibil score',
        url: '/gallery4.jpg',  // ✅ Changed from /assets/ to /
        thumbnail: '/gallery4.jpg',
        description: 'Modern library with extensive resources',
        date: '2024-11-28',
        category: 'Facilities'
    },
    {
        id: 'img5',
        title: 'Sports Day',
        url: '/gallery5.jpg',  // ✅ Changed from /assets/ to /
        thumbnail: '/gallery5.jpg',
        description: 'Annual sports day competition',
        date: '2024-11-25',
        category: 'Events'
    },
    {
        id: 'img6',
        title: 'Science Exhibition',
        url: '/gallery6.jpg',  // ✅ Changed from /assets/ to /
        thumbnail: '/gallery6.jpg',
        description: 'Students presenting their science projects',
        date: '2024-11-20',
        category: 'Events'
    },
    {
        id: 'img7',
        title: 'Computer Lab',
        url: '/gallery7.jpg',  // ✅ Changed from /assets/ to /
        thumbnail: '/gallery7.jpg',
        description: 'Advanced computer laboratory facilities',
        date: '2024-11-10',
        category: 'Facilities'
    },
    {
        id: 'img8',
        title: 'Computer Lab',
        url: '/gallery8.jpg',  // ✅ Changed from /assets/ to /
        thumbnail: '/gallery8.jpg',
        description: 'Advanced computer laboratory facilities',
        date: '2024-11-10',
        category: 'Facilities'
    },
    {
        id: 'img9',
        title: 'Computer Lab',
        url: '/gallery9.jpg',  // ✅ Changed from /assets/ to /
        thumbnail: '/gallery9.jpg',
        description: 'Advanced computer laboratory facilities',
        date: '2024-11-10',
        category: 'Facilities'
    },
    {
        id: 'img10',
        title: 'Computer Lab',
        url: '/gallery10.jpg',  // ✅ Changed from /assets/ to /
        thumbnail: '/gallery10.jpg',
        description: 'Advanced computer laboratory facilities',
        date: '2024-11-10',
        category: 'Facilities'
    }
];

// Mock data for videos
const mockVideos = [
    {
        id: 'vid1',
        title: 'Home Loan Process at Aptus',
        videoUrl: 'https://youtube.com/shorts/y7fzX5cMoaI?si=6foyGllW2yopGqmp',
        duration: '5:32',
        description: 'Unlocking Homeownership: Affordable Housing Loan with Low Cibil Score   Aptus India is dedicated to helping individuals with low cibil score',
        date: '2024-12-18',
    },
    {
        id: 'vid2',
        title: 'low cibil score',
        videoUrl: 'https://youtu.be/d_wAFHZkDEs?si=QOfF6ZXvz8BnPw-b',
        duration: '8:45',
        description: 'Unlocking Homeownership: Affordable Housing Loan with Low Cibil Score   Aptus India is dedicated to helping individuals with low cibil score',
        date: '2024-12-10',
    },
    {
        id: 'vid3',
        title: 'Affordable Housing loan',
        videoUrl: 'https://youtu.be/7kFfzK17E3w?si=kZ_lwkFP0P52VZ0W',
        duration: '12:20',
        description: 'Unlocking Homeownership: Affordable Housing Loan with Low Cibil Score   Aptus India is dedicated to helping individuals with low cibil score',
        date: '2024-12-05',
    },
    {
        id: 'vid4',
        title: 'Affordable Housing loan',
        videoUrl: 'https://youtube.com/shorts/8OP2PEoUmwI?si=pgczdpuGcCy3IGDo',
        duration: '12:20',
        description: 'Unlocking Homeownership: Affordable Housing Loan with Low Cibil Score   Aptus India is dedicated to helping individuals with low cibil score',
        date: '2024-12-05',
    },
    {
        id: 'vid5',
        title: 'Affordable Housing loan',
        videoUrl: 'https://youtu.be/7zfYV5GpIJU?si=VrUSJp95s7TI-K3G',
        duration: '12:20',
        description: 'Unlocking Homeownership: Affordable Housing Loan with Low Cibil Score   Aptus India is dedicated to helping individuals with low cibil score',
        date: '2024-12-05',
    },
    {
        id: 'vid6',
        title: 'Affordable Housing loan',
        videoUrl: 'https://youtube.com/shorts/at-3p8Ijz4I?si=Hsgsvu0odYsiViHJ',
        duration: '12:20',
        description: 'Unlocking Homeownership: Affordable Housing Loan with Low Cibil Score   Aptus India is dedicated to helping individuals with low cibil score',
        date: '2024-12-05',
    },
    {
        id: 'vid7',
        title: 'Affordable Housing loan',
        videoUrl: 'https://youtube.com/shorts/WfSsJ8TaklY?si=Ru2m6CSsguPhg9Cg',
        duration: '12:20',
        description: 'Unlocking Homeownership: Affordable Housing Loan with Low Cibil Score   Aptus India is dedicated to helping individuals with low cibil score',
        date: '2024-12-05',
    }
    // {
    //     id: 'vid8',
    //     title: 'Local Video Example',
    //     videoUrl: 'https://youtube.com/shorts/WfSsJ8TaklY?si=H8m0ywmYdYylekEI', // Local video file
    //     thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400', // Custom thumbnail for local video
    //     duration: '6:15',
    //     description: 'This is an example of a local video file stored in your project',
    //     date: '2024-11-28',
    // }
];

export default function GalleryPageContent() {
    const [activeTab, setActiveTab] = useState('images');
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);

    return (
        <div className="bg-gray-50 ">
            {/* Tabs Section */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center space-x-1 gap-4">
                        <TabButton
                            active={activeTab === 'images'}
                            onClick={() => setActiveTab('images')}
                            count={mockImages.length}
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Images
                        </TabButton>
                        <TabButton
                            active={activeTab === 'videos'}
                            onClick={() => setActiveTab('videos')}
                            count={mockVideos.length}
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Videos
                        </TabButton>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-12">
                {activeTab === 'images' ? (
                    <ImagesGrid images={mockImages} onImageClick={setSelectedImageIndex} />
                ) : (
                    <VideosGrid videos={mockVideos} onVideoClick={setSelectedVideoIndex} />
                )}
            </div>

            {/* Image Lightbox Modal with Carousel */}
            {selectedImageIndex !== null && (
                <ImageLightbox
                    images={mockImages}
                    currentIndex={selectedImageIndex}
                    onClose={() => setSelectedImageIndex(null)}
                    onNavigate={setSelectedImageIndex}
                />
            )}

            {/* Video Player Modal with Carousel */}
            {selectedVideoIndex !== null && (
                <VideoModal
                    videos={mockVideos}
                    currentIndex={selectedVideoIndex}
                    onClose={() => setSelectedVideoIndex(null)}
                    onNavigate={setSelectedVideoIndex}
                />
            )}
        </div>
    );
}

function TabButton({ active, onClick, children, count }) {
    return (
        <button
            onClick={onClick}
            className={`px-6 py-4 font-semibold transition-all duration-200 border-b-2 flex items-center ${active
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
        >
            {children}
            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${active ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'
                }`}>
                {count}
            </span>
        </button>
    );
}

function ImagesGrid({ images, onImageClick }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((image, index) => (
                <div
                    key={image.id}
                    className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
                    onClick={() => onImageClick(index)}
                >
                    <div className="relative h-64 overflow-hidden bg-gray-200">
                        <img
                            src={image.thumbnail}
                            alt={image.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />

                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                            <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                        </div>

                        {/* <span className="absolute top-3 left-3 px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full shadow-md">
                            {image.category}
                        </span> */}
                    </div>
                </div>
            ))}
        </div>
    );
}

function VideosGrid({ videos, onVideoClick }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => {
                const isYouTube = isYouTubeUrl(video.videoUrl);
                const thumbnailUrl = isYouTube
                    ? getYouTubeThumbnail(video.videoUrl, 'hqdefault')
                    : (video.thumbnail || 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400');

                return (
                    <div
                        key={video.id}
                        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                        onClick={() => onVideoClick(index)}
                    >
                        <div className="relative h-52 overflow-hidden bg-gray-200">
                            <img
                                src={thumbnailUrl}
                                alt={video.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />

                            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                                    <svg className="w-8 h-8 text-indigo-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>

                            {/* <span className="absolute bottom-3 right-3 px-2 py-1 bg-black bg-opacity-80 text-white text-xs font-semibold rounded">
                                {video.duration}
                            </span> */}
                        </div>

                        {/* <div className="p-5">
                            <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                                {video.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                {video.description}
                            </p>

                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <div className="flex items-center">
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {new Date(video.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </div>
                            </div>
                        </div> */}
                    </div>
                );
            })}
        </div>
    );
}

function ImageLightbox({ images, currentIndex, onClose, onNavigate }) {
    const currentImage = images[currentIndex];
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === images.length - 1;

    const handlePrevious = (e) => {
        e.stopPropagation();
        if (!isFirst) onNavigate(currentIndex - 1);
    };

    const handleNext = (e) => {
        e.stopPropagation();
        if (!isLast) onNavigate(currentIndex + 1);
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Close Button */}
            <button
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
                onClick={onClose}
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Previous Button */}
            {!isFirst && (
                <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-3 transition-all z-10"
                    onClick={handlePrevious}
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            )}

            {/* Next Button */}
            {!isLast && (
                <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-3 transition-all z-10"
                    onClick={handleNext}
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            )}

            {/* Image Counter */}
            <div className="absolute top-4 left-4 text-white bg-black bg-opacity-50 px-4 py-2 rounded-full text-sm font-semibold z-10">
                {currentIndex + 1} / {images.length}
            </div>

            {/* Image */}
            <div className="max-w-5xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
                <img
                    src={currentImage.url}
                    alt={currentImage.title}
                    className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
            </div>
        </div>
    );
}

function VideoModal({ videos, currentIndex, onClose, onNavigate }) {
    const currentVideo = videos[currentIndex];
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === videos.length - 1;
    const isYouTube = isYouTubeUrl(currentVideo.videoUrl);

    const handlePrevious = (e) => {
        e.stopPropagation();
        if (!isFirst) onNavigate(currentIndex - 1);
    };

    const handleNext = (e) => {
        e.stopPropagation();
        if (!isLast) onNavigate(currentIndex + 1);
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Close Button */}
            <button
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
                onClick={onClose}
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Previous Button */}
            {!isFirst && (
                <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-3 transition-all z-10"
                    onClick={handlePrevious}
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            )}

            {/* Next Button */}
            {!isLast && (
                <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-3 transition-all z-10"
                    onClick={handleNext}
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            )}

            {/* Video Counter */}
            <div className="absolute top-4 left-4 text-white bg-black bg-opacity-50 px-4 py-2 rounded-full text-sm font-semibold z-10">
                {currentIndex + 1} / {videos.length}
            </div>

            {/* Video Player Container */}
            <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
                {/* Video Player */}
                <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                    {isYouTube ? (
                        <iframe
                            key={currentVideo.id}
                            src={getYouTubeEmbedUrl(currentVideo.videoUrl)}
                            className="absolute inset-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={currentVideo.title}
                        />
                    ) : (
                        <video
                            key={currentVideo.id}
                            className="absolute inset-0 w-full h-full"
                            controls
                            autoPlay
                        >
                            <source src={currentVideo.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>

                {/* Video Info */}
                {/* <div className="bg-white rounded-lg p-6 mt-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{currentVideo.title}</h3>
                    <p className="text-gray-600 mb-4">{currentVideo.description}</p>

                    <div className="flex items-center justify-between text-sm border-t pt-4">
                        <div className="flex items-center space-x-6">
                        </div>
                        <div className="text-gray-500">
                            {new Date(currentVideo.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}