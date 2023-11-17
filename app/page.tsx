"use client";

import { ConnectScreen } from "@/components/screens/ConnectScreen";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Home() {
  const { connected } = useWallet();

  return (
    <main className="flex min-h-screen flex-col items-center">
      {connected ? <WalletMultiButton /> : <ConnectScreen />}
    </main>
  );
}
