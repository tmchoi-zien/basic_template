import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  label?: string;
  options: string[];
  placeholder: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  validationRules?: RegisterOptions<T>;
  inline?: boolean;
}

export default function Select<T extends FieldValues>({
  label,
  options,
  placeholder,
  name,
  register,
  validationRules = {},
  inline = false,
  ...rest
}: Props<T>) {
  return (
    <div className="w-full flex space-x-4 items-center" {...rest}>
      {label && (
        <label className="shrink-0 font-semibold text-gray-700">{label}</label>
      )}
      <select
        data-testid="select"
        {...register(name, validationRules)}
        className="border rounded text-sm leading-[21px] font-medium px-[15px] py-[11px] border-solid border-[#e9e9e9]"
      >
        <option value={""}>{placeholder}</option>
        {options?.map((option) => {
          return (
            <option value={option} key={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}
