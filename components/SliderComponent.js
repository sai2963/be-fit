// SliderComponent.js - Client Component
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const SliderComponent = ({ slides }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="relative h-screen overflow-hidden">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950/70 via-gray-950/50 to-gray-950 z-10 pointer-events-none"></div>
            
            {/* Image Slider */}
            <div className="relative h-full w-full">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                            currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                    >
                        <img
                            src={slide.image}
                            alt={slide.title}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                position: 'absolute',
                                top: 0,
                                left: 0
                            }}
                            className=""
                            
                        />
                    </div>
                ))}
            </div>

            {/* Hero Content */}
            <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="text-center px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {slides[currentSlide].title}
                    </h1>
                    <p className="text-xl sm:text-2xl text-gray-300 mb-8">
                        {slides[currentSlide].subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:from-purple-500 hover:to-pink-500 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-purple-500/25">
                            Start Your Journey
                        </button>
                        <button className="px-8 py-4 bg-gray-800/80 backdrop-blur-sm rounded-lg text-white font-semibold hover:bg-gray-700 transform hover:scale-105 transition-all duration-200">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Slider Navigation */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            currentSlide === index 
                                ? 'bg-white scale-125' 
                                : 'bg-white/50 hover:bg-white/75'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default SliderComponent;
