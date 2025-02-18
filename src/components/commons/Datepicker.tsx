import { useEffect, useRef, useState } from "react";
import { Path, FieldValues, UseFormWatch } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ko } from "date-fns/locale";
import Image from "next/image";
import { format } from "date-fns";

export interface Props<T extends FieldValues> {
  label: string;
  name: Path<T>;
  setValue: (name: Path<T>, value: string) => void;
  watch: UseFormWatch<T>;
}

export default function DatepickerBox<T extends FieldValues>({
  label,
  name,
  setValue,
  watch,
  ...rest
}: Props<T>) {
  const ref = useRef<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  useEffect(() => {
    const value = watch(name);
    setSelectedDate(value ? new Date(value) : null);
  }, []);

  const handleOnClick = () => {
    if (ref.current) {
      ref.current.setOpen(true);
    }
  };

  const handleChangeDate = (newValue: any) => {
    setSelectedDate(newValue);
    const dateString = format(newValue, "yyyy-MM-dd");
    setValue(name, dateString);
  };

  return (
    <div className="mb-3" {...rest}>
      <label className="text-base font-semibold text-gray-700">{label}</label>
      <div className="flex justify-between flex-grow text-sm text-gray-700 min-h-[38px] px-3 py-2 border border-gray-300 rounded-md mt-1 ">
        <DatePicker
          ref={ref}
          dateFormat="yyyy-MM-dd" // 날짜 형태
          shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
          locale={ko}
          selected={selectedDate}
          onChange={handleChangeDate}
          className="font-semibold"
        />
        <Image
          src="/icons/edit.svg"
          alt="icon"
          width={15}
          height={15}
          className="cursor-pointer"
          onClick={handleOnClick}
        />
      </div>
    </div>
  );
}
