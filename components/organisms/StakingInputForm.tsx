"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { IoSwapVerticalOutline } from "react-icons/io5";

import { BalanceInput } from "../molecules/BalanceInput";
import { TokenSymbol } from "@/utils/token-symbols";
import { useWalletInfo } from "@/hooks/useWalletInfo";
import { capitalizeFirstLetter } from "@/utils/string-helper";

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
  const { solBalance, stepBalance, xStepBalance } = useWalletInfo();

  const [isStaking, setIsStaking] = useState(true);

  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");

  const [buttonText, setButtonText] = useState("Stake");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const currentConfig = useMemo(() => config[isStaking ? 0 : 1], [isStaking]);

  useEffect(() => {
    const inputAmount = Number(inputValue);

    if (isNaN(inputAmount) || inputAmount === 0) {
      setButtonText(capitalizeFirstLetter(currentConfig.action));
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
  }, [inputValue, currentConfig, solBalance]);

  return (
    <div className="p-4 bg-accent rounded-lg w-full max-w-md flex flex-col items-center">
      <BalanceInput
        title={`You ${currentConfig.action}`}
        symbol={currentConfig.input}
        balance={currentConfig.input === TokenSymbol.STEP ? stepBalance : xStepBalance}
        value={inputValue}
        className="w-full"
        onChange={(v) => {
          setInputValue(v);
          // ToDo: Adjust outputValue
        }}
        onMaxBalance={(v) => {
          setInputValue(v);
          /// ToDo: Adjust outputValue
        }}
      />
      <button
        type="button"
        className="mt-5 text-2xl text-black p-2 bg-white rounded-full hover:bg-opacity-80 transition duration-300 ease-in-out"
        onClick={() => setIsStaking((state) => !state)}
      >
        <IoSwapVerticalOutline />
      </button>
      <BalanceInput
        title="You recieve"
        symbol={currentConfig.output}
        balance={currentConfig.output === TokenSymbol.STEP ? stepBalance : xStepBalance}
        className="mt-3 w-full"
        value={outputValue}
        onChange={(v) => {
          setOutputValue(v);
          // ToDo: Adjust inputValue
        }}
      />
      <button
        type="button"
        className="w-full px-4 py-2 text-white bg-primary hover:bg-opacity-80 active:bg-opacity-70 rounded mt-6 text-xl font-semibold transition duration-200 ease-in-out disabled:bg-gray-600"
        disabled={buttonDisabled}
      >
        {buttonText}
      </button>
    </div>
  );
};
