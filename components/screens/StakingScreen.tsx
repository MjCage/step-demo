"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const StakingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <div className="absolute top-0 right-0 bg-[#2c2d30] rounded m-8">
        <WalletMultiButton />
      </div>
    </div>
  );
};
