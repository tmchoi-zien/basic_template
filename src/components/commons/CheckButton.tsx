import React, { ChangeEvent } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

export interface Props<T extends FieldValues> {
  type: "checkbox" | "radio";
  text?: string;
  name: Path<T>;
  value?: string;
  register: UseFormRegister<T>;
  validationRules?: RegisterOptions<T>;
  disabled?: boolean;
}
export default function CheckButton<T extends FieldValues>({
  type,
  value,
  text,
  name,
  register,
  validationRules,
  disabled,
}: Props<T>) {
  return (
    <div data-testid="check-button" className="flex items-center">
      <label
        className={`flex gap-1 items-center px-2 text-xs text-black-90 ${
          disabled ? "opacity-50 !cursor-default" : ""
        }`}
      >
        <input
          {...register(name, validationRules)}
          type={type}
          value={value}
          disabled={disabled}
          className="accent-navy"
        />
        {text && <span>{text}</span>}
      </label>
    </div>
  );
}
