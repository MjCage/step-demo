"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { StakingInputForm } from "../organisms/StakingInputForm";
import Image from "next/image";

export const StakingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <Image src="/step-logo.svg" alt="Step logo" width={116} height={42} className="absolute top-0 left-0 m-8" />
      <div className="absolute top-0 right-0 bg-[#2c2d30] rounded m-8">
        <WalletMultiButton />
      </div>
      <StakingInputForm />
    </div>
  );
};
