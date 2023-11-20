import { SendTransactionOptions } from "@solana/wallet-adapter-base";
import { Connection, Transaction } from "@solana/web3.js";
import toast from "react-hot-toast";

export const handleTx = async (
  connection: Connection,
  transaction: Transaction,
  sendTransaction: (
    transaction: Transaction,
    connection: Connection,
    options?: SendTransactionOptions,
  ) => Promise<string>,
) => {
  try {
    const {
      context: { slot: minContextSlot },
      value: { blockhash, lastValidBlockHeight },
    } = await connection.getLatestBlockhashAndContext();

    const signature = await sendTransaction(transaction, connection, { minContextSlot });

    const txPromise = connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });

    toast.promise(txPromise, {
      loading: "Transaction was sent! Please wait.",
      success: () => `Transaction successful!`,
      error: () => "Ups, something went wrong. Try again!",
    });
  } catch {
    toast.error("Ups, something went wrong. Try again!");
  }
};
