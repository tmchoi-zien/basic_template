"use client";
import React from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import * as t from "@/locale/ko/test-id.json";

interface Props<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  validationRules?: RegisterOptions<T>;
  label?: string;
  placeholder?: string;
  rows?: number;
  readOnly?: boolean;
  inline?: boolean;
}

export default function TextFieldBox<T extends FieldValues>({
  name,
  register,
  validationRules,
  label,
  placeholder,
  rows = 10,
  readOnly = false,
  inline = true,
  ...rest
}: Props<T>) {
  return (
    <>
      {inline ? (
        // 한 줄 배치
        <div
          data-testid={t.component["text-field-box"]}
          className="flex items-center w-full space-x-4"
          {...rest}
        >
          {!!label && (
            <label className="shrink-0 font-semibold text-gray-700">
              {label}
            </label>
          )}
          <textarea
            {...register(name, validationRules)}
            placeholder={placeholder}
            disabled={readOnly}
            className="flex-grow px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={rows}
          />
        </div>
      ) : (
        // 두 줄 배치
        <div
          data-testid={t.component["text-field-box"]}
          className="flex flex-col w-full space-y-2"
          {...rest}
        >
          {!!label && (
            <label className="font-semibold text-gray-700">{label}</label>
          )}
          <textarea
            {...register(name, validationRules)}
            placeholder={placeholder}
            disabled={readOnly}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={rows}
          />
        </div>
      )}
    </>
  );
}
