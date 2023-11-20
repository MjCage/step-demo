"use client";

import { ConnectScreen } from "@/components/screens/ConnectScreen";
import { StakingScreen } from "@/components/screens/StakingScreen";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const { connected } = useWallet();

  useEffect(() => {
    if (connected) {
      toast.success("Connected to wallet!");
    } else {
      toast.success("Disconnected from wallet!");
    }
  }, [connected]);

  return <main className="min-h-screen w-full">{connected ? <StakingScreen /> : <ConnectScreen />}</main>;
}
