import CheckButton from "./CheckButton";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import * as t from "@/locale/ko/test-id.json";

interface OptionType {
  name: string;
  disabled?: boolean;
  [key: string]: any;
}

export interface RadioGroupProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  validationRules?: RegisterOptions<T>;
  options: OptionType[];
}

export default function RadioGroup<T extends FieldValues>({
  name,
  register,
  validationRules = {},
  options,
  ...rest
}: RadioGroupProps<T>) {
  return (
    <div
      data-testid={t.component["radio-group"]}
      className="w-full flex"
      {...rest}
    >
      {options?.map((option, idx) => {
        return (
          <CheckButton
            key={idx}
            text={option.name}
            type="radio"
            name={name}
            value={option.name}
            register={register}
            validationRules={validationRules}
            disabled={option.disabled}
          />
        );
      })}
    </div>
  );
}
