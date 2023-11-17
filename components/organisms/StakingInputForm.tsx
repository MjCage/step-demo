"use client";

import { FC, useMemo, useState } from "react";
import { IoSwapVerticalOutline } from "react-icons/io5";

import { BalanceInput } from "../molecules/BalanceInput";
import { TokenSymbol } from "@/utils/token-symbols";

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
  const [isStaking, setIsStaking] = useState(true);

  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");

  const currentConfig = useMemo(() => config[isStaking ? 0 : 1], [isStaking]);

  return (
    <div className="p-4 bg-[#2c2d30] rounded-lg w-full max-w-md flex flex-col items-center">
      <BalanceInput
        title={`You ${currentConfig.action}`}
        symbol={currentConfig.input}
        value={inputValue}
        className="w-full"
        onChange={(v) => {
          setInputValue(v);
          // ToDo: Adjust outputValue
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
        className="mt-5 w-full"
        value={outputValue}
        onChange={(v) => {
          setOutputValue(v);
          // ToDo: Adjust inputValue
        }}
      />
      <button
        type="button"
        className="w-full px-4 py-2 text-white bg-green-500 hover:bg-opacity-80 active:bg-opacity-70 rounded mt-6 text-xl font-semibold transition duration-200 ease-in-out"
      >
        {currentConfig.action.toUpperCase()}
      </button>
    </div>
  );
};
