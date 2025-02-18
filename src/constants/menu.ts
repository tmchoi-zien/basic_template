export enum ROLE {
  MASTER = "마스터",
  INSPECTION_ADMIN = "점검 관리자",
  INSPECTOR = "점검 담당자",
  INSPECTION_REQUESTER = "점검 신청자",
  SECURITY_MANAGER = "기업보안 담당자",
}

const ANYONE = [
  ROLE.MASTER,
  ROLE.INSPECTOR,
  ROLE.INSPECTION_ADMIN,
  ROLE.INSPECTION_REQUESTER,
  ROLE.SECURITY_MANAGER,
];

export interface MenusType {
  title: string;
  pathname: string;
  description: string;
  linkable: boolean;
  permission: ROLE[];
  icon?: string;
  childrens?: MenusType[];
}

export const MENUS: MenusType[] = [
  {
    title: "홈",
    pathname: "/home",
    description: "홈",
    linkable: true,
    permission: [
      ROLE.MASTER,
      ROLE.INSPECTION_ADMIN,
      ROLE.INSPECTOR,
      ROLE.SECURITY_MANAGER,
    ],
    icon: "/icons/home.svg",
  },
  {
    title: "점검신청 현황",
    pathname: "/inspection-status",
    description: "점검신청 현황",
    linkable: false,
    permission: [ROLE.MASTER, ROLE.INSPECTION_ADMIN],
    icon: "/icons/inspection_status.svg",
    childrens: [
      {
        title: "최초점검",
        pathname: "/inspection-status/new",
        description: "점검신청 현황 > 최초점검",
        linkable: true,
        permission: [ROLE.MASTER, ROLE.INSPECTION_ADMIN],
      },
      {
        title: "이행점검",
        pathname: "/inspection-status/re",
        description: "점검신청 현황 > 이행점검",
        linkable: true,
        permission: [ROLE.MASTER, ROLE.INSPECTION_ADMIN],
      },
    ],
  },
  {
    title: "취약점점검",
    pathname: "/inspection",
    description: "취약점점검",
    linkable: false,
    permission: [ROLE.MASTER, ROLE.INSPECTION_ADMIN, ROLE.INSPECTOR],
    icon: "/icons/inspection.svg",
    childrens: [
      {
        title: "인프라점검",
        pathname: "/inspection/infra",
        description: "취약점점검 > 인프라점검",
        linkable: true,
        permission: [ROLE.MASTER, ROLE.INSPECTION_ADMIN, ROLE.INSPECTOR],
      },
      {
        title: "모의해킹점검",
        pathname: "/inspection/pentest",
        description: "취약점점검 > 모의해킹점검",
        linkable: true,
        permission: [ROLE.MASTER, ROLE.INSPECTION_ADMIN, ROLE.INSPECTOR],
      },
    ],
  },
  {
    title: "점검현황",
    pathname: "/asset",
    description: "점검현황 > 자산 점검현황",
    linkable: true,
    permission: [ROLE.MASTER, ROLE.INSPECTION_ADMIN, ROLE.SECURITY_MANAGER],
    icon: "/icons/asset.svg",
  },
  {
    title: "취약점 관리",
    pathname: "/vuln",
    description: "취약점 관리 > 취약점 조치 현황",
    linkable: true,
    permission: [
      ROLE.MASTER,
      ROLE.INSPECTION_ADMIN,
      ROLE.INSPECTOR,
      ROLE.SECURITY_MANAGER,
    ],
    icon: "/icons/vuln.svg",
  },
  {
    title: "보고",
    pathname: "/report",
    description: "보고 > 주간 보고",
    linkable: true,
    permission: [ROLE.MASTER, ROLE.INSPECTION_ADMIN, ROLE.SECURITY_MANAGER],
    icon: "/icons/report_white.svg",
  },
  {
    title: "운영관리",
    pathname: "/management",
    description: "운영관리",
    linkable: false,
    permission: [ROLE.MASTER, ROLE.INSPECTION_ADMIN, ROLE.INSPECTOR],
    icon: "/icons/management.svg",
    childrens: [
      {
        title: "Q&A",
        pathname: "/management/qna",
        description: "운영관리 > Q&A",
        linkable: true,
        permission: [ROLE.MASTER, ROLE.INSPECTION_ADMIN, ROLE.INSPECTOR],
      },
      {
        title: "지식DB",
        pathname: "/management/knowledgeDB",
        description: "운영관리 > 지식DB",
        linkable: true,
        permission: [ROLE.MASTER, ROLE.INSPECTION_ADMIN, ROLE.INSPECTOR],
      },
    ],
  },
  {
    title: "취약점점검 안내",
    pathname: "/inspection-guide",
    description: "취약점점검 안내",
    linkable: true,
    permission: [ROLE.MASTER, ROLE.INSPECTION_REQUESTER],
    icon: "/icons/inspection_guide.svg",
  },
  {
    title: "취약점점검 신청",
    pathname: "/inspection-request",
    description: "취약점점검 신청",
    linkable: true,
    permission: [ROLE.MASTER, ROLE.INSPECTION_REQUESTER],
    icon: "/icons/inspection_request.svg",
  },
  {
    title: "Q&A",
    pathname: "/qna",
    description: "Q&A",
    linkable: true,
    permission: [ROLE.MASTER, ROLE.INSPECTION_REQUESTER],
    icon: "/icons/qna.svg",
  },
];
