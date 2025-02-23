"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

import { MenusType } from "@/constants/menu";

interface MenuItemProps {
  menu: MenusType;
}

export default function MenuItem({ menu }: MenuItemProps) {
  const [showChildren, setShowChildren] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const onClickMenu = (menu: MenusType) => {
    if (menu.linkable) {
      router.push(menu.pathname);
    } else {
      setShowChildren(!showChildren);
    }
  };

  return (
    <div
      data-testid="menu-item"
      className="w-full flex flex-col items-start py-1"
    >
      <div className="w-full flex items-center">
        <div
          className={`flex w-full items-center justify-between py-1 px-2 rounded-md cursor-pointer
            ${menu.pathname === pathname ? "bg-menu-active" : ""} 
            ${menu.pathname !== pathname ? "opacity-50" : ""}
          `}
          onClick={() => onClickMenu(menu)}
        >
          <div className="flex w-full gap-1 items-center">
            {menu.icon && (
              <span>
                <Image src={menu.icon} alt="home" width="16" height="16" />
              </span>
            )}
            {menu.title}
          </div>
          {menu.childrens && (
            <div onClick={() => setShowChildren(showChildren)}>
              <Image
                src={`${
                  showChildren ? "/icons/arrow_up.svg" : "/icons/arrow_down.svg"
                }`}
                alt="up"
                width="12"
                height="12"
              />
            </div>
          )}
        </div>
      </div>
      {showChildren &&
        menu.childrens &&
        menu.childrens.map((subMenu, idx) => {
          return (
            <div
              key={idx}
              className={`w-full pl-8 py-1 cursor-pointer rounded-md
                ${subMenu.pathname === pathname ? "bg-menu-active" : ""} 
                ${subMenu.pathname !== pathname ? "opacity-50" : ""}
              `}
              onClick={() => onClickMenu(subMenu)}
            >
              {subMenu.title}
            </div>
          );
        })}
    </div>
  );
}
