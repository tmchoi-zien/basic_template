import {
  FieldValues,
  Path,
  RegisterOptions,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import * as t from "@/locale/ko/test-id.json";

interface Props<T extends FieldValues> {
  label?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  validationRules?: RegisterOptions<T>;
  id?: string;
  placeholder?: string;
  readOnly?: boolean;
  inline?: boolean;
  isError?: boolean;
  error?: string;
  [key: string]: any;
}

export default function InputBox<T extends FieldValues>({
  label,
  placeholder,
  id,
  readOnly = false,
  name,
  inline = false,
  register,
  validationRules = {},
  isError = false,
  error,
  ...rest
}: Props<T>) {
  return (
    <>
      {/* {inline ? (
        <div
          data-testid="input-box"
          className={"flex items-center w-full space-x-4 min-h-[100px]"}
          {...rest}
        >
          {!!label && (
            <label className="shrink-0 font-semibold text-gray-700">
              {label}
            </label>
          )}
          <input
            type="text"
            id={id}
            placeholder={!!placeholder ? placeholder : ""}
            disabled={readOnly}
            {...register(name, validationRules)}
            className="flex-grow text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <span>{error}</span>}
        </div>
      ) : (
        <div
          data-testid="input-box"
          className="flex flex-col w-full min-h-[100px]"
          {...rest}
        >
          {!!label && (
            <label className="font-semibold text-gray-700 mb-3">{label}</label>
          )}
          <input
            type="text"
            id={id}
            placeholder={!!placeholder ? placeholder : ""}
            disabled={readOnly}
            {...register(name, validationRules)}
            className="w-full text-sm  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div>
            {error && <span className="text-xs text-[red]">{error}</span>}
          </div>
        </div>
      )} */}

      <div
        data-testid={t.component["input-box"]}
        className={`
          ${
            inline
              ? "flex items-center w-full space-x-4 mb-3"
              : "flex flex-col w-full mb-3"
          }
            ${isError ? "min-h-[100px]" : ""}
          `}
        {...rest}
      >
        {!!label && (
          <label
            className={
              inline
                ? "shrink-0 font-semibold text-gray-700"
                : "font-semibold text-gray-700 mb-1"
            }
          >
            {label}
          </label>
        )}
        <input
          type="text"
          id={id}
          placeholder={!!placeholder ? placeholder : ""}
          disabled={readOnly}
          {...register(name, validationRules)}
          className={`${inline ? "flex-grpow" : "w-full"} text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {error && (
          <div>
            <span className="text-xs text-[red]">{error}</span>
          </div>
        )}
      </div>
    </>
  );
}
