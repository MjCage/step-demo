import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { WalletContextProvider } from "@/contexts/WalletProvider";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Demo Step Staking App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={jakarta.className}>
        <WalletContextProvider>{children}</WalletContextProvider>
      </body>
    </html>
  );
}
