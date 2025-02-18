import { FieldErrors } from "react-hook-form";
import ReactQuill from "react-quill-new";
import "quill/dist/quill.snow.css"; // 기본 테마 스타일

interface Props<T> {
  label: string;
  name: keyof T;
  value?: string;
  setValue: (name: keyof T, value: any) => void;
  trigger: (name: keyof T) => Promise<boolean>;
  error?: string;
}

export default function TextEditor<T extends Record<string, any>>({
  label,
  name,
  value,
  setValue,
  trigger,
  error,
}: Props<T>) {
  const handleOnChange = (value: string) => {
    setValue(name, value === "<p><br</p>" ? "" : value);
    trigger(name);
  };

  return (
    <div data-testid="text-editor">
      <label className="shrink-0 font-semibold text-gray-700">{label}</label>
      <ReactQuill
        defaultValue={value}
        onChange={handleOnChange}
        className="mt-3"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
