import { TokenSymbol, getTokenIconSrc } from "@/utils/token-symbols";
import Image from "next/image";
import { FC } from "react";

interface BalanceInputProps {
  title: string;
  symbol: TokenSymbol;
  value: string;
  className?: string;
  onChange: (newValue: string) => void;
}

// ToDo: Validate before onChange

export const BalanceInput: FC<BalanceInputProps> = ({ title, symbol, value, className, onChange }) => {
  return (
    <div className={className}>
      <div className="flex items-center justify-between text-sm font-light">
        <span>{title}</span>
        <span>Balance: 0 {symbol}</span>
      </div>
      <div className="flex items-center w-full rounded bg-[#1c1c1c] mt-2 p-2">
        <div className="flex items-center gap-2 ml-2 text-sm">
          <Image src={getTokenIconSrc(symbol)} alt="Icon of the input currency" width={32} height={32} />
          {symbol}
        </div>
        <input
          className="w-full bg-transparent text-2xl p-2 text-right focus:outline-none"
          value={value}
          placeholder="0.00"
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};
