"use client";
import { useRef } from "react";
import * as t from "@/locale/ko/test-id.json";
import Button from "./Button";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import Image from "next/image";

interface Props<T extends FieldValues> {
  name: Path<T>;
  files: string[];
  register: UseFormRegister<T>;
  validationRules: RegisterOptions<T>;
  deleteFile: (name: string) => void;
  error?: string;
}

export default function FileUpload<T extends FieldValues>({
  name,
  files,
  register,
  validationRules,
  deleteFile,
  error,
}: Props<T>) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current && fileInputRef.current.click(); // 숨겨진 파일 입력을 클릭
  };

  return (
    <div data-testid={t.component["file-upload"]} className="flex flex-col">
      {/* 커스텀 버튼 */}
      <div className="flex flex-col gap-2 items-start mb-3">
        <Button
          color="white"
          size="m"
          text="파일 업로드"
          type="button"
          onClick={handleButtonClick}
        />
      </div>

      {/* 업로드된 파일 목록 */}
      <div className="flex flex-col gap-1">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex gap-2 text-xs font-semibold items-center"
          >
            <span>{file}</span> {/* 파일 이름 표시 */}
            <Image
              src="/icons/trash.svg"
              alt="del"
              width={10}
              height={10}
              className="cursor-pointer"
              onClick={() => deleteFile(file)}
            />
          </div>
        ))}
      </div>

      {/* 숨겨진 파일 입력 */}
      <input
        type="file"
        multiple
        {...register(name, validationRules)}
        ref={(e) => {
          register(name).ref(e);
          fileInputRef.current = e;
        }}
        style={{ display: "none" }} // 화면에 보이지 않게 숨김
      />
    </div>
  );
}
