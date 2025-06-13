"use client";
import React, { useEffect, useState } from "react";
import CTAButtons from "./CTAButtons";
import { motion } from "framer-motion";
console.log(motion)
const quotes = [
  "Hunger ends where kindness begins.",
  "Feed the future, don’t waste the present.",
  "Your excess is someone’s necessity.",
  "From waste to worth.",
  "Every meal saved is a life touched.",
];

function HeroContent() {
  const [displayText, setDisplayText] = useState("");
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentQuote = quotes[quoteIndex];
    if (charIndex < currentQuote.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + currentQuote[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayText("");
        setCharIndex(0);
        setQuoteIndex((prev) => (prev + 1) % quotes.length);
      }, 2000); // Wait before moving to the next quote
      return () => clearTimeout(timeout);
    }
  }, [charIndex, quoteIndex]);

  return (
    <header className="flex flex-col items-center mx-auto max-w-screen-lg">
      <h1 className="mb-6 text-6xl font-bold leading-none text-center max-md:text-5xl max-sm:text-4xl min-h-[4rem]">
        {displayText}
        <span className="animate-pulse">|</span>
      </h1>
       <motion.p
        className="mb-10 text-2xl text-center max-w-[792px] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-pulse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        Connect food donors with those in need through our AI-powered
        distribution platform — saving food waste and feeding communities in
        real-time.
      </motion.p> 
    

      <CTAButtons />
    </header>
  );
}

export default HeroContent;
