import { useEffect, useRef, useState } from "react";
import { ko } from "date-fns/locale";
import { addDays, format } from "date-fns";
import { Path, FieldValues, UseFormWatch } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Image from "next/image";

export interface Props<T extends FieldValues> {
  label?: string;
  inline?: boolean;
  name: Path<T>;
  setValue: (name: Path<T>, value: string[]) => void;
  watch: UseFormWatch<T>;
}

export default function DateRangepicker<T extends FieldValues>({
  label,
  inline = false,
  name,
  setValue,
  watch,
  ...rest
}: Props<T>) {
  const ref = useRef<any>(null);
  const [selectedDate, setSelectedDate] = useState<[Date | null, Date | null]>([
    new Date(),
    addDays(new Date(), 5),
  ]);

  useEffect(() => {
    const value = watch(name);
    if (value) {
      setSelectedDate([new Date(value[0]), new Date(value[1])]);
    }
  }, []);

  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setSelectedDate([start, end]);
    if (start && end) {
      setValue(name, [format(start, "yyyy-MM-dd"), format(end, "yyyy-MM-dd")]);
    }
  };

  const handleOnClick = () => {
    if (ref.current) {
      ref.current.setOpen(true);
    }
  };

  return (
    <div className="flex w-full space-x-4 items-center" {...rest}>
      <label className="text-base font-semibold text-gray-700">{label}</label>
      <div className="flex flex-grow text-sm min-h-[38px] px-3 py-2">
        <DatePicker
          ref={ref}
          dateFormat="yyyy-MM-dd" // 날짜 형태
          shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
          onChange={onChange}
          startDate={selectedDate[0]}
          endDate={selectedDate[1]}
          locale={ko}
          selectsRange
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
