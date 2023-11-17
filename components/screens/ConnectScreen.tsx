"use client";

import { WalletModalButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";
import React, { useState, useEffect } from "react";

export const ConnectScreen: React.FC = () => {
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [textShown, setTextShown] = useState(false);
  const [typedText, setTypedText] = useState("");

  const textToType = "Are you ready to stake STEP?!";

  useEffect(() => {
    setAnimationTriggered(true);
    setTimeout(() => setImageLoaded(true), 1000);
  }, []);

  useEffect(() => {
    if (imageLoaded) {
      let i = 0;
      setTypedText(textToType.charAt(0)); // Add the first character initially
      const typingInterval = setInterval(() => {
        i++; // Increment first to avoid adding the first character twice
        if (i < textToType.length) {
          setTypedText((prev) => prev + textToType.charAt(i));
        } else {
          clearInterval(typingInterval);
          setTextShown(true);
        }
      }, 100);

      return () => clearInterval(typingInterval);
    }
  }, [imageLoaded]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <div className={`transition-opacity duration-1000 ease-in ${animationTriggered ? "opacity-100" : "opacity-0"}`}>
        <Image src="/step-logo.svg" alt="Step logo" width={233} height={85} />
      </div>
      <div className={`mt-12 transition-opacity duration-1000 ${imageLoaded ? "opacity-100" : "opacity-0"}`}>
        <span className="text-lg font-semibold">{typedText}</span>
      </div>
      <div className={`mt-6 transition duration-300 ${textShown ? "opacity-100" : "opacity-0"}`}>
        <WalletModalButton>Connect your Wallet</WalletModalButton>
      </div>
    </div>
  );
};
