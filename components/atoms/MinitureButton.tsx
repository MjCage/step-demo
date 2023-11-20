import { FC } from "react";

interface MinitureButtonProps {
  label: string;
  className?: string;
  onClick?: () => void;
}

export const MinitureButton: FC<MinitureButtonProps> = ({ label, className, onClick }) => {
  return (
    <button
      type="button"
      className={`text-primary bg-primary-bg text-[9px] font-semibold leading-4 px-1 rounded-sm transition duration-500 ease-in-out
                hover:bg-primary hover:text-black ${className ?? ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
