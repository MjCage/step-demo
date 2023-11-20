import { SendTransactionOptions } from "@solana/wallet-adapter-base";
import { Connection, Transaction } from "@solana/web3.js";

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

    // ToDo: Add toast for signing tx

    const signature = await sendTransaction(transaction, connection, { minContextSlot });

    // ToDo: Add toast for transaction sent to blockchain waiting for confirmation

    await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });

    // ToDo: Show toast for successful tx plus signature
  } catch {
    // ToDo: Add toast for failed tx
  }
};
