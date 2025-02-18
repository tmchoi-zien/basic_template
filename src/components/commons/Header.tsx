"use client";
import { useContext, useEffect, useState } from "react";

import { MENUS } from "@/constants/menu";
import { usePathname } from "next/navigation";
import { GlobalContext } from "@/contexts/GlobalContext";
import Button from "./Button";
import { login, logout, auth_check } from "@/api/old/internal";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const { info } = useContext(GlobalContext);
  const auth = useAuth();
  const pathname = usePathname();
  const [title, setTitle] = useState<string>();

  useEffect(() => {
    setTitle(getDescription());
  }, [pathname]);

  const getDescription = () => {
    for (const menu of MENUS) {
      if (!menu.childrens) {
        if (menu.pathname === pathname) return menu.description;
      } else {
        for (const subMenu of menu.childrens) {
          if (subMenu.pathname === pathname) return subMenu.description;
        }
      }
    }
  };

  const handlelogin = async () => {
    const response = await login({
      id: "zien09",
      pw: "qwer1234",
    });
    if (response?.data.result === "success") {
      const { ac_token, re_token } = response.headers;
      auth.login({
        accessToken: ac_token,
        refreshToken: re_token,
      });
      console.log("로그인 성공");
    }
  };

  const handleLogout = async () => {
    const response = await logout();
    if (response?.data.status === "success") {
      auth.logout();
    }
    console.log("로그아웃 성공");
  };

  return (
    <header data-testid="header" className="w-full h-16 flex bg-white p-5">
      <div className="w-full h-full flex items-center flex-row justify-between">
        <div>{title}</div>
        <div className="flex gap-2">
          <span>OOO 님</span>
          <span>{info.role}</span>
          {auth.isLogin ? (
            <Button
              color="white"
              size="xs"
              text="로그아웃"
              type="button"
              onClick={handleLogout}
            />
          ) : (
            <Button
              color="white"
              size="xs"
              text="로그인"
              type="button"
              onClick={handlelogin}
            />
          )}
        </div>
      </div>
    </header>
  );
}
