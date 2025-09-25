"use client";

import React, { useState, useRef, useEffect } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import restaurantLoaderAnimation from "../../public/Restaurant website Pre loader.json";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  const foodPlaceholders = [
    "Want something spicy?",
    "Hungry for dosa?",
    "Craving filter coffee?",
    "Looking for chicken?",
    "Need some cheese?",
    "Want masala?",
    "Feeling beefy?",
    "Search anything..."
  ];

  // Rotate placeholders with slide-up animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPlaceholder((prev) => (prev + 1) % foodPlaceholders.length);
        setTimeout(() => {
          setIsAnimating(false);
        }, 50);
      }, 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFocus = () => {
    lottieRef.current?.play?.();
  };

  const handleBlur = () => {
    lottieRef.current?.stop?.();
  };

  const handleClear = () => {
    setSearchQuery("");
    onSearch("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-8 px-4">
      <div className="relative">
        <div className="rounded-2xl p-[2px] bg-gradient-to-r from-[#6B715C] via-[#903E10] to-[#6B715C]">
          <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={foodPlaceholders[currentPlaceholder]}
          className={`block w-full text-base h-[60px] px-6 pr-16 text-slate-900 bg-white rounded-2xl appearance-none focus:outline-none focus:ring-4 focus:ring-[#6B715C]/20 peer invalid:border-red-500 invalid:focus:border-red-500 overflow-ellipsis overflow-hidden text-nowrap transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg placeholder:text-gray-400 ${
            isAnimating 
              ? 'placeholder:opacity-0 placeholder:translate-y-2' 
              : 'placeholder:opacity-100 placeholder:translate-y-0'
          }`}
        />
        </div>

        {/* Lottie Animation Icon */}
        <div className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center pointer-events-none">
          <Lottie
            lottieRef={lottieRef}
            animationData={restaurantLoaderAnimation}
            loop={true}
            autoplay={false}
            style={{ width: 70, height: 70 }}
          />
        </div>

        {/* Clear Button */}
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute top-4 right-14 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors duration-200 rounded-full hover:bg-gray-100"
            aria-label="Clear search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
