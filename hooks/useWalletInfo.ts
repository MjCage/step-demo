import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useState, useEffect } from "react";

const STEP_TOKEN_MINT = new PublicKey("StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT");
const XSTEP_TOKEN_MINT = new PublicKey("xStpgUCss9piqeFUk2iLVcvJEGhAdJxJQuwLkXP555G");

export const useWalletInfo = () => {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();

  const [solBalance, setSolBalance] = useState<number | null>(null);
  const [stepBalance, setStepBalance] = useState<number | null>(null);
  const [xStepBalance, setXStepBalance] = useState<number | null>(null);

  const fetchBalances = async () => {
    if (publicKey && connected) {
      try {
        const balance = await connection.getBalance(publicKey);
        setSolBalance(balance / LAMPORTS_PER_SOL);

        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
          mint: STEP_TOKEN_MINT,
        });
        setStepBalance(tokenAccounts.value[0]?.account.data.parsed.info.tokenAmount.uiAmount || 0);

        const xTokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
          mint: XSTEP_TOKEN_MINT,
        });
        setXStepBalance(xTokenAccounts.value[0]?.account.data.parsed.info.tokenAmount.uiAmount || 0);
      } catch (error) {
        console.error("Error fetching balances", error);
      }
    } else {
      setSolBalance(null);
      setStepBalance(null);
      setXStepBalance(null);
    }
  };

  useEffect(() => {
    fetchBalances();
  }, [publicKey, connected]);

  return {
    solBalance,
    stepBalance,
    xStepBalance,
    refetchBalances: fetchBalances,
  };
};
