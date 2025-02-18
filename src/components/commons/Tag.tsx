import React from "react";

const SIZE = {
  s: "text-xs px-[15px] py-[9px] min-h-22",
  xs: "text-xs px-[8px] py-[4px] min-h-22",
};

export const TYPE = {
  new: {
    color: "bg-new",
    size: SIZE.xs,
  },
  re: {
    color: "bg-re",
    size: SIZE.xs,
  },
  windows: {
    color: "bg-windows",
    size: SIZE.xs,
  },
  linux: {
    color: "bg-linux",
    size: SIZE.xs,
  },
  os: {
    color: "bg-os",
    size: SIZE.xs,
  },
  dbms: {
    color: "bg-dbms",
    size: SIZE.xs,
  },
  mysql: {
    color: "bg-mysql",
    size: SIZE.xs,
  },
  mssql: {
    color: "bg-mssql",
    size: SIZE.xs,
  },
  oracle: {
    color: "bg-oracle",
    size: SIZE.xs,
  },
  사내: {
    color: "bg-inbound",
    size: SIZE.xs,
  },
  대외: {
    color: "bg-outbound",
    size: SIZE.xs,
  },
  웹: {
    color: "bg-web",
    size: SIZE.xs,
  },
  모바일: {
    color: "bg-app",
    size: SIZE.xs,
  },
  service: {
    color: "bg-service",
    size: SIZE.xs,
  },
  pc: {
    color: "bg-pc",
    size: SIZE.xs,
  },
  mac: {
    color: "bg-mac",
    size: SIZE.xs,
  },
  "c/s": {
    color: "bg-cs",
    size: SIZE.xs,
  },
  aws: {
    color: "bg-aws",
    size: SIZE.xs,
  },
  azure: {
    color: "bg-azure",
    size: SIZE.xs,
  },
  normal: {
    color: "bg-whiteGray",
    size: SIZE.xs,
  },
  인프라: {
    color: "bg-infra",
    size: SIZE.xs,
  },
  모의해킹: {
    color: "bg-pentest",
    size: SIZE.xs,
  },
  클라우드: {
    color: "bg-cloud",
    size: SIZE.xs,
  },
  상: {
    color: "bg-sang",
    size: SIZE.xs,
  },
  중: {
    color: "bg-jung",
    size: SIZE.xs,
  },
  하: {
    color: "bg-ha",
    size: SIZE.xs,
  },
  delete: {
    color: "bg-delete",
    size: SIZE.xs,
  },
  modify: {
    color: "bg-modify",
    size: SIZE.xs,
  },
  complete: {
    color: "bg-complete",
    size: SIZE.xs,
  },
  show: {
    color: "bg-show",
    size: SIZE.xs,
  },
  statusRed: {
    color: "bg-status-red",
    size: SIZE.xs,
  },
  statusYellow: {
    color: "bg-status-yellow",
    size: SIZE.xs,
  },
  statusGreen: {
    color: "bg-status-green",
    size: SIZE.xs,
  },
  점검요청중: {
    color: "bg-status-red",
    size: SIZE.xs,
  },
  점검요청: {
    color: "bg-status-red",
    size: SIZE.xs,
  },
  이행대기: {
    color: "bg-status-red",
    size: SIZE.xs,
  },
  중단됨: {
    color: "bg-status-red",
    size: SIZE.xs,
  },
  이행점검요청중: {
    color: "bg-status-yellow",
    size: SIZE.xs,
  },
  이행점검요청: {
    color: "bg-status-yellow",
    size: SIZE.xs,
  },
  점검진행: {
    color: "bg-status-yellow",
    size: SIZE.xs,
  },
  이행진행: {
    color: "bg-status-yellow",
    size: SIZE.xs,
  },
  점검완료: {
    color: "bg-status-green",
    size: SIZE.xs,
  },
  조치완료: {
    color: "bg-status-green",
    size: SIZE.xs,
  },
  default: {
    color: "bg-whiteGray",
    size: SIZE.xs,
  },
};

interface Props {
  type: keyof typeof TYPE;
  text: string;
  onClick?: () => void;
  size?: keyof typeof SIZE;
}
export default function Tag({ type, text, size, onClick }: Props) {
  return (
    <span
      data-testid="tag"
      className={`${TYPE[type].color} ${size ? SIZE[size] : TYPE[type].size} text-white inline-block h-fit rounded-full`}
      onClick={onClick}
    >
      {text}
    </span>
  );
}
