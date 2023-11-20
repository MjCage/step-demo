"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { StakingInputForm } from "../organisms/StakingInputForm";
import Image from "next/image";

export const StakingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center h-screen w-full p-3 mb-20">
      <Image src="/step-logo.svg" alt="Step logo" width={116} height={42} className="absolute top-0 left-0 m-8" />
      <div className="absolute top-0 right-0 bg-accent rounded m-8">
        <WalletMultiButton />
      </div>
      <div className="flex items-center gap-6 text-white mt-32 text-[28px] font-medium">
        <Image src="/icons/stake-icon.svg" alt="Icon of the input currency" width={32} height={32} />
        <h1>Stake STEP</h1>
      </div>
      <h2 className="text-sm mt-7 mb-10 font-light text-gray-text">Stake STEP to receive xSTEP</h2>
      <StakingInputForm />
    </div>
  );
};
