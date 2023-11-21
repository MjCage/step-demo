import { IDL as stepStakingIdl } from "../target/types/step_staking";
import { STAKING_PROGRAM, STEP_TOKEN_MINT, XSTEP_TOKEN_MINT } from "@/utils/addresses";
import { AnchorProvider, BN, Program } from "@coral-xyz/anchor";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useWalletInfo } from "./useWalletInfo";
import {
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";

export const useStepStaking = () => {
  const { connection } = useConnection();
  const { publicKey, stepAta, xStepAta } = useWalletInfo();

  const [vaultPubkey, setVaultPubkey] = useState<PublicKey>();
  const [vaultBump, setVaultBump] = useState<number>();
  const [stepPerXStep, setStepPerXStep] = useState<number>();

  const program = useMemo(() => {
    const provider = new AnchorProvider(
      connection,
      {
        signTransaction: (tx) => {
          throw new Error("Not implemented");
        },
        signAllTransactions: () => {
          throw new Error("Not implemented");
        },
        publicKey: PublicKey.default,
      },
      { commitment: "confirmed" },
    );

    return new Program(stepStakingIdl, STAKING_PROGRAM, provider);
  }, [connection]);

  useEffect(() => {
    const fetchVaultInfos = async () => {
      const [vPubkey, vBump] = await PublicKey.findProgramAddress([STEP_TOKEN_MINT.toBuffer()], program.programId);
      setVaultPubkey(vPubkey);
      setVaultBump(vBump);
    };
    fetchVaultInfos();
  }, [program]);

  useEffect(() => {
    const fetchStepPerXStep = async () => {
      if (!vaultPubkey) return;

      const vaultBalance = (await connection.getTokenAccountBalance(vaultPubkey)).value.uiAmount;
      const xStepSupply = (await connection.getTokenSupply(XSTEP_TOKEN_MINT)).value.uiAmount;

      setStepPerXStep(Number(vaultBalance) / Number(xStepSupply));
    };

    fetchStepPerXStep();
  }, [connection, vaultPubkey]);

  const stakeStep = useCallback(
    async (amount: number) => {
      if (!publicKey || !vaultBump || !vaultPubkey || !stepAta) {
        throw new Error("Something went wrong!");
      }

      const stakeTx = new Transaction();
      let xStepAtaAddress = xStepAta;

      // If no xStep Ata exists yet
      if (!xStepAtaAddress) {
        xStepAtaAddress = await getAssociatedTokenAddress(XSTEP_TOKEN_MINT, publicKey);
        stakeTx.add(createAssociatedTokenAccountInstruction(publicKey, xStepAtaAddress, publicKey, XSTEP_TOKEN_MINT));
      }

      const stakeIx = await program.methods
        .stake(vaultBump, new BN(amount))
        .accountsStrict({
          tokenMint: STEP_TOKEN_MINT,
          xTokenMint: XSTEP_TOKEN_MINT,
          tokenFrom: stepAta,
          tokenFromAuthority: publicKey,
          tokenVault: vaultPubkey,
          xTokenTo: xStepAtaAddress,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .instruction();

      stakeTx.add(stakeIx);

      return stakeTx;
    },
    [publicKey, vaultBump, vaultPubkey, stepAta, xStepAta, program.methods],
  );

  const unstakeStep = useCallback(
    async (amount: number) => {
      if (!publicKey || !vaultBump || !vaultPubkey || !xStepAta) {
        throw new Error("Something went wrong!");
      }

      const unstakeTx = new Transaction();
      let stepAtaAddress = stepAta;

      // If no step Ata exists yet
      if (!stepAtaAddress) {
        stepAtaAddress = await getAssociatedTokenAddress(STEP_TOKEN_MINT, publicKey);
        unstakeTx.add(createAssociatedTokenAccountInstruction(publicKey, stepAtaAddress, publicKey, STEP_TOKEN_MINT));
      }

      const unstakeIx = await program.methods
        .unstake(vaultBump, new BN(amount))
        .accountsStrict({
          tokenMint: STEP_TOKEN_MINT,
          xTokenMint: XSTEP_TOKEN_MINT,
          xTokenFrom: xStepAta,
          xTokenFromAuthority: publicKey,
          tokenVault: vaultPubkey,
          tokenTo: stepAtaAddress,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .instruction();

      unstakeTx.add(unstakeIx);

      return unstakeTx;
    },
    [publicKey, vaultBump, vaultPubkey, stepAta, xStepAta, program.methods],
  );

  return {
    stepPerXStep,
    stakeStep,
    unstakeStep,
  };
};
