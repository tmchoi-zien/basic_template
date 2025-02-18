import React, { useState } from "react";
import Button, { ButtonProps } from "./Button";
import * as t from "@/locale/ko/test-id.json";

export interface TabType {
  id: number;
  name: string;
  [key: string]: any;
}

export interface Props {
  tabs?: TabType[];
  tab?: TabType;
  setTab?: (tab: TabType) => void;
  buttons?: ButtonProps[];
}

export default function Tab({ tabs, tab, setTab, buttons }: Props) {
  return (
    <div
      data-testid={t.component["tab"]}
      className="flex items-center justify-between"
    >
      {/* 좌측 탭들 */}
      <div className="flex space-x-4">
        {tabs?.map((item) => (
          <button
            key={item.id}
            onClick={() => setTab && setTab(item)}
            className={`px-4 py-2 focus:outline-none text-lg ${
              item.id === tab?.id
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-700"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      <ul className="flex flex-row space-x-4">
        {/* 우측 버튼들 */}
        {buttons &&
          buttons.map((button, index) => (
            <li key={index}>
              <Button
                color="navy"
                size="xs"
                icon={button.icon}
                text={button.text}
                type="button"
                onClick={button.onClick}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}
