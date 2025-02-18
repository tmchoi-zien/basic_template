import React from "react";

import Button, { ColorType } from "./Button";

export interface Props {
  title?: string;
  content: string;
  button: {
    text: string;
    color: ColorType;
    onClick(): void;
  }[];
  onClose(): void;
}
export default function AlertModal({ title, content, button, onClose }: Props) {
  return (
    <>
      <div
        data-testid="alert-modal"
        className="w-[330px] fixed top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 bg-white rounded-xl p-[28px] z-50 text-center"
      >
        {title && <p className="text-black-100 font-semibold">{title}</p>}
        <p
          className="text-xs text-black-80 pt-[8px] pb-[24px] font-medium break-words whitespace-normal"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <ul className="flex gap-8">
          {button.map((item) => (
            <li
              key={item.text}
              className={`${button.length === 2 ? "w-1/2" : "w-full"}`}
            >
              <Button
                size="xs"
                color={item.color}
                type={"button"}
                text={item.text}
                isDisabled={false}
                onClick={item.onClick}
              ></Button>
            </li>
          ))}
        </ul>
      </div>
      <div
        className="fixed w-full h-full top-0 left-0 z-40 bg-black bg-opacity-50"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      />
    </>
  );
}
