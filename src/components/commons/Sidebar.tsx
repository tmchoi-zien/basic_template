"use client";
import { useContext, useEffect, useState } from "react";

import { MENUS, MenusType, ROLE } from "@/constants/menu";

import MenuItem from "./MenuItem";
import { GlobalContext } from "@/contexts/GlobalContext";

/**
 * todo: 하위항목 펼치기/접기 애니메이션 추가할 것
 */

export default function Sidebar() {
  const { info } = useContext(GlobalContext);
  const [menus, setMenus] = useState<MenusType[]>();

  useEffect(() => {
    setMenus(filterMenus());
  }, [info]);

  const filterMenus = () => {
    return !!info.role
      ? MENUS.filter((menu) => menu.permission.includes(info.role as ROLE))
      : MENUS;
  };

  return (
    <div
      data-testid="side-bar"
      className="w-[250px] h-full bg-sidebar text-white"
    >
      <div className="w-full h-full bg-sidebar-pattern flex flex-col items-center p-5">
        <div className="w-full text-2xl text-center pb-10">Z-ONE 2.0</div>
        <div className="w-full flex flex-col items-center px-2">
          {menus &&
            menus.map((menu, idx) => {
              return <MenuItem menu={menu} key={idx} />;
            })}
        </div>
      </div>
    </div>
  );
}
