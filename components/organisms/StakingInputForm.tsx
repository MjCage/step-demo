"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { IoMdArrowDown } from "react-icons/io";
import { TbArrowBarToDown, TbArrowBarUp } from "react-icons/tb";

import { BalanceInput } from "../molecules/BalanceInput";
import { TokenSymbol } from "@/utils/token-symbols";
import { useWalletInfo } from "@/hooks/useWalletInfo";
import { capitalizeFirstLetter } from "@/utils/string-helper";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, Transaction } from "@solana/web3.js";
import { handleTx } from "@/utils/handle-tx";
import { useStepStaking } from "@/hooks/useStepStaking";

const config = [
  {
    action: "stake",
    input: TokenSymbol.STEP,
    output: TokenSymbol.xSTEP,
  },
  {
    action: "unstake",
    input: TokenSymbol.xSTEP,
    output: TokenSymbol.STEP,
  },
];

export const StakingInputForm: FC = () => {
  const { connection } = useConnection();
  const { sendTransaction } = useWallet();
  const { solBalance, stepBalance, xStepBalance } = useWalletInfo();
  const { stepPerXStep, stakeStep, unstakeStep } = useStepStaking();

  const [isStaking, setIsStaking] = useState(true);

  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");

  const [buttonText, setButtonText] = useState("Stake");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const currentConfig = useMemo(() => config[isStaking ? 0 : 1], [isStaking]);

  useEffect(() => {
    const inputAmount = Number(inputValue);

    if (isNaN(inputAmount) || inputAmount === 0) {
      setButtonText("Enter an amount");
      setButtonDisabled(true);
    } else {
      if (currentConfig.input === TokenSymbol.STEP && inputAmount > (stepBalance ?? 0)) {
        setButtonText("Insufficient STEP balance");
        setButtonDisabled(true);
      } else if (currentConfig.input === TokenSymbol.xSTEP && inputAmount > (xStepBalance ?? 0)) {
        setButtonText("Insufficient xSTEP balance");
        setButtonDisabled(true);
      } else if ((solBalance ?? 0) < 0.005) {
        setButtonText("Insufficient SOL balance");
        setButtonDisabled(true);
      } else {
        setButtonText(capitalizeFirstLetter(currentConfig.action));
        setButtonDisabled(false);
      }
    }
  }, [inputValue, currentConfig, solBalance, stepBalance, xStepBalance]);

  const handleAction = async () => {
    if (Number.isNaN(inputValue)) {
      return;
    }

    let tx: Transaction;
    if (isStaking) {
      tx = await stakeStep(Number(inputValue) * LAMPORTS_PER_SOL);
    } else {
      tx = await unstakeStep(Number(inputValue) * LAMPORTS_PER_SOL);
    }

    await handleTx(connection, tx, sendTransaction);
  };

  return (
    <div className="w-full max-w-[450px]">
      <div className="flex text-sm font-semibold">
        <button
          type="button"
          className={`w-[150px] py-3 flex items-center justify-center gap-4 rounded-t-lg duration-500 ease-in-out ${
            isStaking ? "bg-gray-bg text-primary" : "bg-gray-inactive hover:text-primary"
          }`}
          onClick={() => {
            if (!isStaking) {
              const temp = inputValue;
              setInputValue(outputValue);
              setOutputValue(temp);
            }

            setIsStaking(true);
          }}
        >
          <TbArrowBarToDown className="w-5 h-5" />
          Stake
        </button>
        <button
          type="button"
          className={`w-[150px] py-3 flex items-center justify-center gap-4 rounded-t-lg duration-500 ease-in-out ${
            !isStaking ? "bg-gray-bg text-primary" : "bg-gray-inactive hover:text-primary"
          }`}
          onClick={() => {
            if (isStaking) {
              const temp = inputValue;
              setInputValue(outputValue);
              setOutputValue(temp);
            }

            setIsStaking(false);
          }}
        >
          <TbArrowBarUp className="w-5 h-5" />
          Unstake
        </button>
      </div>
      <div className="p-5 bg-gray-bg rounded-lg rounded-tl-none w-full flex flex-col items-center">
        <BalanceInput
          title={`You ${currentConfig.action}`}
          symbol={currentConfig.input}
          balance={currentConfig.input === TokenSymbol.STEP ? stepBalance : xStepBalance}
          value={inputValue}
          className="w-full"
          onChange={(v) => {
            setInputValue(v);
            if (v !== "") {
              setOutputValue((Number(v) / (stepPerXStep ?? 1) ** (isStaking ? 1 : -1)).toFixed(9));
            } else {
              setOutputValue("");
            }
          }}
          onMaxBalance={(v) => {
            setInputValue(v);
            setOutputValue((Number(v) / (stepPerXStep ?? 1) ** (isStaking ? 1 : -1)).toFixed(9));
          }}
        />
        <IoMdArrowDown className="w-9 h-9 mt-2 text-secondary" />
        <BalanceInput
          title="You recieve"
          symbol={currentConfig.output}
          balance={currentConfig.output === TokenSymbol.STEP ? stepBalance : xStepBalance}
          className="mt-3 w-full"
          value={outputValue}
          onChange={(v) => {
            setOutputValue(v);
            if (v !== "") {
              setInputValue((Number(v) * (stepPerXStep ?? 1) ** (isStaking ? 1 : -1)).toFixed(9));
            } else {
              setInputValue("");
            }
          }}
        />
      </div>
      <button
        type="button"
        className="w-full h-full max-h-[60px] px-4 py-2 text-primary bg-primary-bg rounded-sm mt-5 font-semibold transition duration-500 ease-in-out
                hover:bg-primary hover:text-black disabled:text-disabled-text disabled:bg-disabled-bg"
        disabled={buttonDisabled}
        onClick={handleAction}
      >
        {buttonText}
      </button>
    </div>
  );
};
