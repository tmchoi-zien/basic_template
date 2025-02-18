import Image from "next/image";
import Button, { ButtonProps } from "./Button";

interface Props {
  label?: string;
  text: string;
  inline?: boolean;
  field?: boolean;
  isHtml?: boolean;
  icon?: string;
  onIconClick?: () => void;
  button?: ButtonProps | null;
}

export default function TextBox({
  label,
  text,
  inline = true,
  field = false,
  isHtml = false,
  icon,
  onIconClick,
  button,
  ...rest
}: Props) {
  return (
    <>
      {inline ? (
        // 한 줄 배치
        <div
          {...rest}
          className={`flex w-full space-x-4 ${field ? "items-start" : "items-center"}`}
        >
          {!!label && (
            <label className="shrink-0 font-semibold text-gray-700">
              {label}
            </label>
          )}
          {field ? (
            <>
              {isHtml ? (
                <div
                  className="w-full h-[200px] text-sm px-3 py-2 overflow-auto whitespace-pre"
                  data-testid="dangerous-html"
                  dangerouslySetInnerHTML={
                    isHtml ? { __html: text } : undefined
                  }
                />
              ) : (
                <div className="w-full min-h-[38px] h-[200px] text-sm px-3 py-2 overflow-auto whitespace-pre">
                  {text}
                </div>
              )}
            </>
          ) : (
            <>
              {isHtml ? (
                <div
                  className="flex-grow text-sm min-h-[38px] px-3 py-2"
                  data-testid="dangerous-html"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              ) : (
                <div className="flex justify-between flex-grow text-sm min-h-[38px] px-3 py-2">
                  <span>{text}</span>
                  {icon && (
                    <Image
                      src={icon}
                      alt="icon"
                      width={15}
                      height={15}
                      onClick={onIconClick}
                      className="cursor-pointer"
                    />
                  )}
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        // 두 줄 배치
        <div {...rest} className="font-semibold text-gray-700 mb-3">
          {!!label && (
            <label className="text-base font-semibold text-gray-700">
              {label}
            </label>
          )}
          {field ? (
            <>
              {isHtml ? (
                <div
                  className="w-full h-[400px] text-sm px-3 py-2 mt-3 overflow-auto whitespace-pre"
                  data-testid="dangerous-html"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              ) : (
                <div className="w-full min-h-[38px] h-[400px] text-sm px-3 py-2 mt-3 overflow-auto whitespace-pre">
                  {text}
                </div>
              )}
            </>
          ) : (
            <>
              {isHtml ? (
                <div
                  className="w-full text-sm px-3 py-2 mt-1"
                  data-testid="dangerous-html"
                  dangerouslySetInnerHTML={
                    isHtml ? { __html: text } : undefined
                  }
                />
              ) : (
                <div className="flex justify-between items-center w-full min-h-[38px] text-sm px-3 py-2 mt-1">
                  <span>{text}</span>
                  {icon && (
                    <Image
                      src={icon}
                      alt="icon"
                      width={15}
                      height={15}
                      onClick={onIconClick}
                      className="cursor-pointer"
                    />
                  )}
                  {button && (
                    <ul className="flex">
                      <li>
                        <Button
                          color={button.color}
                          size={button.size}
                          text={button.text}
                          type={button.type}
                          icon={button.icon}
                          isDisabled={button.isDisabled}
                          isFile={button.isFile}
                          onClick={button.onClick}
                        />
                      </li>
                    </ul>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
