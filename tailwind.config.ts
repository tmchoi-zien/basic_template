import type { Config } from "tailwindcss";

const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_500 = { ...Array.from(Array(501)).map((_, i) => `${i}px`) };
const px0_1440 = { ...Array.from(Array(1441)).map((_, i) => `${i}px`) };

export default {
  mode: "jit", // JIT 모드 활성화
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"], // 파일 경로 추가
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "sidebar-pattern": "url('/images/sidebar_background.png')",
      },
      colors: {
        background: "#FAFAFA",
        sidebar: "#131C55",
        "menu-active": "#4256D0",
        // 메인 컬러
        navy: "#0E1B6B",
        // 태그 색상
        new: "#3182CE",
        re: "#DD6B20",
        windows: "#0078D4",
        linux: "#FCC624",
        pc: "#0E1B6B",
        mac: "#0E1B6B",
        os: "#5A67D8",
        dbms: "#38A169",
        mysql: "#00758F",
        mssql: "#CC2927",
        oracle: "#F80000",
        inbound: "#2D3748",
        outbound: "#48BB78",
        web: "#3182CE",
        app: "#805AD5",
        cs: "#ED8936",
        aws: "#FF9900",
        azure: "#0078D4",
        whiteGray: "#E6E6E6",
        infra: "#4A5568",
        pentest: "#E53E3E",
        cloud: "#38B2AC",
        sang: "#C00F0C",
        jung: "#E5A000",
        ha: "#FFCC00",
        delete: "#FF0000",
        modify: "#F6AD55",
        complete: "#38A169",
        show: "#3182CE",
        service: "#007BFF",
        "status-red": "#C5524C",
        "status-yellow": "#E8B931",
        "status-green": "#14AE5C",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
} satisfies Config;
