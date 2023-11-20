import { AnchorProvider, BN, Program } from "@coral-xyz/anchor";

import { IDL as stepStakingIdl } from "../target/types/step_staking";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { STEP_TOKEN_MINT, XSTEP_TOKEN_MINT } from "./addresses";
import { createAssociatedTokenAccountInstruction, getAssociatedTokenAddress } from "@solana/spl-token";

const getProgram = (connection: Connection) => {
  const provider = new AnchorProvider(
    connection,
    {
      signTransaction: () => {
        throw new Error("Not implemented");
      },
      signAllTransactions: () => {
        throw new Error("Not implemented");
      },
      publicKey: PublicKey.default,
    },
    { commitment: "confirmed" },
  );

  return new Program(stepStakingIdl, new PublicKey("Stk5NCWomVN3itaFjLu382u9ibb5jMSHEsh6CuhaGjB"), provider);
};

export const stakeStep = async (
  connection: Connection,
  user: PublicKey,
  stepAta: PublicKey,
  xStepAta: PublicKey | null,
  amount: number,
) => {
  const program = getProgram(connection);

  const [vaultPubkey, vaultBump] = await PublicKey.findProgramAddress([STEP_TOKEN_MINT.toBuffer()], program.programId);

  const stakeTx = new Transaction();

  // If no xStep Ata exists yet
  if (!xStepAta) {
    xStepAta = await getAssociatedTokenAddress(XSTEP_TOKEN_MINT, user);
    stakeTx.add(createAssociatedTokenAccountInstruction(user, xStepAta, user, XSTEP_TOKEN_MINT));
  }

  const stakeIx = await program.methods
    .stake(vaultBump, new BN(amount))
    .accountsStrict({
      tokenMint: STEP_TOKEN_MINT,
      xTokenMint: XSTEP_TOKEN_MINT,
      tokenFrom: stepAta,
      tokenFromAuthority: user,
      tokenVault: vaultPubkey,
      xTokenTo: xStepAta,
      tokenProgram: TOKEN_PROGRAM_ID,
    })
    .instruction();

  stakeTx.add(stakeIx);

  return stakeTx;
};
