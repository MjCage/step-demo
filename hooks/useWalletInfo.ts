import { STEP_TOKEN_MINT, XSTEP_TOKEN_MINT } from "@/utils/addresses";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useState, useEffect, useCallback } from "react";

export const useWalletInfo = () => {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();

  const [solBalance, setSolBalance] = useState<number | null>(null);
  const [stepBalance, setStepBalance] = useState<number | null>(null);
  const [xStepBalance, setXStepBalance] = useState<number | null>(null);

  const [stepAta, setStepAta] = useState<PublicKey | null>(null);
  const [xStepAta, setXStepAta] = useState<PublicKey | null>(null);

  const fetchBalances = useCallback(async () => {
    if (publicKey && connected) {
      try {
        const balance = await connection.getBalance(publicKey);
        setSolBalance(balance / LAMPORTS_PER_SOL);

        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
          mint: STEP_TOKEN_MINT,
        });
        setStepAta(tokenAccounts.value[0]?.pubkey);
        setStepBalance(tokenAccounts.value[0]?.account.data.parsed.info.tokenAmount.uiAmount || 0);

        const xTokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
          mint: XSTEP_TOKEN_MINT,
        });
        setXStepAta(xTokenAccounts.value[0]?.pubkey);
        setXStepBalance(xTokenAccounts.value[0]?.account.data.parsed.info.tokenAmount.uiAmount || 0);
      } catch (error) {
        console.error("Error fetching balances", error);
      }
    } else {
      setSolBalance(null);
      setStepBalance(null);
      setXStepBalance(null);
      setStepAta(null);
      setXStepAta(null);
    }
  }, [publicKey, connected, connection]);

  useEffect(() => {
    fetchBalances();
  }, [fetchBalances]);

  useEffect(() => {
    let subId: number | null = null;

    if (publicKey) {
      subId = connection.onAccountChange(publicKey, fetchBalances, "confirmed");
    }

    return () => {
      if (subId) {
        connection.removeAccountChangeListener(subId);
      }
    };
  }, [publicKey, connection]);

  return {
    publicKey,
    solBalance,
    stepBalance,
    xStepBalance,
    stepAta,
    xStepAta,
  };
};
