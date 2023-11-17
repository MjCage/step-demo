import { TokenSymbol, getTokenIconSrc } from "@/utils/token-symbols";
import Image from "next/image";
import { FC } from "react";

interface BalanceInputProps {
  title: string;
  symbol: TokenSymbol;
  balance: number | null;
  value: string;
  className?: string;
  onChange: (newValue: string) => void;
  onMaxBalance?: (maxBalance: string) => void;
}

const formatNumber = (input: string) => {
  const cleaned = input.replace(/[^\d.]/g, "");

  let [whole, decimal] = cleaned.split(".");
  whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (decimal) {
    decimal = decimal.substring(0, 9);
  }

  return decimal !== undefined ? `${whole}.${decimal}` : whole;
};

export const BalanceInput: FC<BalanceInputProps> = ({
  title,
  symbol,
  balance,
  value,
  className,
  onChange,
  onMaxBalance,
}) => {
  return (
    <div className={className}>
      <div className="flex items-end justify-between text-sm font-light mt-2">
        <span className="text-lg leading-5">{title}</span>
        <div className="leading-5">
          Balance:{" "}
          <button
            type="button"
            className={!onMaxBalance ? "" : "hover:underline"}
            disabled={!onMaxBalance}
            onClick={() => onMaxBalance?.((balance ?? 0).toString())}
          >
            {(balance ?? 0).toString()} {symbol}
          </button>
        </div>
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
          onChange={(e) => onChange(formatNumber(e.target.value))}
        />
      </div>
    </div>
  );
};
