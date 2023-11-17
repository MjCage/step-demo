"use client";

import { ConnectScreen } from "@/components/screens/ConnectScreen";
import { StakingScreen } from "@/components/screens/StakingScreen";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Home() {
  const { connected } = useWallet();

  return <main className="min-h-screen w-full">{connected ? <StakingScreen /> : <ConnectScreen />}</main>;
}
