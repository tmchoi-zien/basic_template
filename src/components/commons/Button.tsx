import React from "react";
import Image from "next/image";

export const SIZE = {
  xs: "text-[10px] px-3 py-2",
  m: "text-[14px] px-5 py-2",
};
export const COLOR = {
  navy: "bg-navy text-white",
  white: "bg-white text-black border border-black",
  blue: "bg-show text-white",
  red: "bg-delete text-white",
  green: "bg-complete text-white",
  yellow: "bg-modify text-white",
};

export const ICON = {
  plus: "/icons/plus",
  download: "/icons/download",
  report: "/icons/report",
  refresh: "/icons/refresh",
};

export const TYPE = ["button", "submit"] as const;

export type SizeType = keyof typeof SIZE;
export type ColorType = keyof typeof COLOR;
export type ButtonType = (typeof TYPE)[number];
export type IconType = keyof typeof ICON;

export interface ButtonProps {
  size: SizeType;
  color: ColorType;
  type: ButtonType;
  text: string;
  icon?: IconType;
  isDisabled?: boolean;
  isFile?: boolean;
  onClick?: () => void; //이미지 업로드 컴포넌트 예외 상황
}

export default function Button({
  size,
  color,
  type,
  text,
  icon,
  isDisabled,
  onClick,
}: ButtonProps) {
  const fileName = !!icon
    ? color === "navy"
      ? `${ICON[icon]}_white.svg`
      : color === "white"
        ? `${ICON[icon]}_black.svg`
        : null
    : null;

  return (
    <button
      data-testid="button"
      type={type}
      className={`
        w-full
        ${SIZE[size]} 
        ${COLOR[color]} 
        rounded-xl text-black-0 
      `}
      onClick={onClick}
      disabled={isDisabled}
    >
      <div className="w-full flex gap-1 align-middle items-center justify-center">
        {fileName && (
          <span>
            <Image src={fileName} alt="icon" width="12" height="12" />
          </span>
        )}
        <span>{text}</span>
      </div>
    </button>
  );
}
