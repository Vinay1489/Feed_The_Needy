"use client";
import React, { useState } from "react";
import TestimonialCard from "./TestimonialCard";

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    quote:
      "The expiry prediction tool has reduced our waste by 40%. Now we can ensure all our day-old bread helps feed families instead of landfills.",
    name: "Sarah Johnson",
    role: "Food Donor - Local Bakery",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/ce8020a937925541b4c162d35975c3417b305359",
  },
  {
    id: 2,
    quote:
      "Connecting with local shelters through this platform has streamlined our donation process and helped us reach more people in need.",
    name: "Michael Chen",
    role: "Restaurant Owner",
    image:
      "t2.jpg",
  },
  {
    id: 3,
    quote:
      "As a volunteer, the scheduling system has made it so much easier to find opportunities that match my availability and skills.",
    name: "Priya Sharma",
    role: "Weekly Volunteer",
    image:
      "t3.jpg",
  },
  {
    id: 4,
    quote:
      "The analytics dashboard helps us track impact in real-time, allowing us to better allocate resources where they're needed most.",
    name: "David Wilson",
    role: "NGO Program Director",
    image:
      "t4.jpg",
  },
];

function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="relative w-full">
      <TestimonialCard testimonial={testimonials[currentIndex]} />

      <div className="flex gap-2 justify-center mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full ${
              index === currentIndex
                ? "bg-blue-600"
                : "bg-blue-600 bg-opacity-20"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        className="absolute left-6 top-2/4 p-3 rounded-full -translate-y-2/4 hover:bg-gray-100 transition-colors"
        onClick={goToPrevious}
        aria-label="Previous testimonial"
      >
        <div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[16px] h-[16px]"
          >
            <path
              d="M10 12L6 8L10 4"
              stroke="#020817"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      <button
        className="absolute right-6 top-2/4 p-3 rounded-full -translate-y-2/4 hover:bg-gray-100 transition-colors"
        onClick={goToNext}
        aria-label="Next testimonial"
      >
        <div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[16px] h-[16px]"
          >
            <path
              d="M6 12L10 8L6 4"
              stroke="#020817"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
    </div>
  );
}

export default TestimonialCarousel;
