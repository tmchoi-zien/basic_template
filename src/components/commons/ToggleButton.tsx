"use client";
import { useRef } from "react";
import {
  Path,
  FieldValues,
  UseFormWatch,
  UseFormRegister,
} from "react-hook-form";

import * as t from "@/locale/ko/test-id.json";
import Image from "next/image";

type Props<T extends FieldValues> = {
  name: Path<T>;
  register: UseFormRegister<T>;
  setValue: (name: Path<T>, value: boolean) => void;
  watch: UseFormWatch<T>;
  validationRules?: object;
};

export default function ToggleButton<T extends FieldValues>({
  name,
  register,
  setValue,
  watch,
  validationRules,
}: Props<T>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isChecked = watch(name); // getValues로 현재 상태 가져오기

  // SVG 클릭 시 setValue로 값 토글
  const handleSvgClick = () => {
    const currentValue = watch(name);
    setValue(name, !currentValue); // 현재 값의 반대값으로 토글
  };

  return (
    <label
      data-testid={t.component["toggle-button"]}
      className="flex items-center cursor-pointer"
    >
      {/* 숨겨진 checkbox */}
      <input
        id={name}
        type="checkbox"
        {...register(name, validationRules)} // 기존 폼에 연결된 값만 전달
        className="hidden"
        ref={inputRef}
      />

      {/* SVG 클릭 시 setValue로 체크 상태 변경 */}
      <div onClick={handleSvgClick} className="cursor-pointer">
        {isChecked ? (
          <Image
            src="/icons/toggle_on.svg"
            alt="Toggle On"
            width={40}
            height={30}
            role="button"
          />
        ) : (
          <Image
            src="/icons/toggle_off.svg"
            alt="Toggle Off"
            width={40}
            height={30}
            role="button"
          />
        )}
      </div>
    </label>
  );
}
