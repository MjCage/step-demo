import { TokenSymbol, getTokenIconSrc } from "@/utils/token-symbols";
import Image from "next/image";
import { FC } from "react";
import { MinitureButton } from "../atoms/MinitureButton";

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
        <span>{title}</span>
        <div className="text-gray-text flex items-center gap-1">
          Balance: {(balance ?? 0).toString()}
          {(balance ?? 0) > 0 && onMaxBalance && (
            <>
              <MinitureButton label="HALF" onClick={() => onMaxBalance(((balance ?? 0) / 2).toFixed(9))} />
              <MinitureButton label="MAX" onClick={() => onMaxBalance((balance ?? 0).toString())} />
            </>
          )}
        </div>
      </div>
      <div className="flex items-center w-full rounded-lg bg-black mt-4 px-1 py-2 min-h-[64px]">
        <div className="flex items-center gap-2 ml-2 text-sm">
          <Image src={getTokenIconSrc(symbol)} alt="Icon of the input currency" width={32} height={32} />
          {symbol}
        </div>
        <input
          className="w-full bg-transparent text-lg p-2 text-right focus:outline-none"
          value={value}
          placeholder="0.00"
          onChange={(e) => onChange(formatNumber(e.target.value))}
        />
      </div>
    </div>
  );
};
