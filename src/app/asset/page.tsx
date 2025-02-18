"use client";
import Image from "next/image";
import { Tooltip } from "react-tooltip";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";

import Tag, { TYPE } from "@/components/commons/Tag";
import Table from "@/components/commons/Table";
import Button from "@/components/commons/Button";
import Loading from "@/components/commons/Loading";
import useModal from "@/components/modals/useModal";
import AssetLogic from "./Logic";

export default function Asset() {
  const { data, isLoading, error, refetch, page, setPage, totalPages } =
    AssetLogic();
  const { openAssetDetail, openModifyInspectionStatus } = useModal();
  const router = useRouter();
  if (isLoading) return <Loading />;
  if (error) return <>에러.. 여기엔 alert띄우자{error}</>;
  if (!data) return <>no data</>;

  const { content } = data;

  const rows = content.map((item) => {
    return {
      // #: 인덱스
      assetIdx: <>{item.assetIdx}</>,
      // 자산명
      serviceName: (
        <div className="flex gap-1">
          <div>{item.serviceName}</div>
          <Image
            data-testid="asset-icon"
            className="cursor-pointer"
            src={"/icons/external_link.svg"}
            alt={"상세보기"}
            width={12}
            height={12}
            onClick={() => openAssetDetail(item.assetIdx)}
          />
        </div>
      ),
      // 담당자
      manager: (
        <div className="flex flex-col gap-1">
          {item.manager1 && <div>자산 : {item.manager1}</div>}
          {item.manager2 && <div>인프라 : {item.manager2}</div>}
          {item.manager3 && <div>모의해킹 : {item.manager3}</div>}
          {item.manager4 && <div>클라우드 : {item.manager4}</div>}
        </div>
      ),
      // 점검대상 식별
      inspectionTarger: (
        <div className="flex gap-1 justify-center">
          <div>{item.countInfra}건</div>/<div>{item.countPentest}건</div>
          {/* /
          <div>{item.countCloud}건</div> */}
        </div>
      ),
      // 취약점 점검
      newInspection: (
        <div className="flex gap-1 justify-center">
          <div data-testid="new-infra-status" className="flex">
            <RenderStatus
              workType="new"
              type="infra"
              status={item.infraWorkDone}
              tooltipContent={item.infraWorkTooltip}
            />
          </div>
          /
          <div data-testid="new-pentest-status" className="flex">
            <RenderStatus
              workType="new"
              type="pentest"
              status={item.pentestWorkDone}
              tooltipContent={item.pentestWorkTooltip}
            />
          </div>
          {/* /
          <div data-testid="new-cloud-status" className="flex">{item.countCloud}</div> */}
        </div>
      ),
      // 이행점검
      reInspection: (
        <div className="flex gap-1 justify-center">
          <div data-testid="re-infra-status" className="flex">
            <RenderStatus
              workType="re"
              type="infra"
              status={item.infraFixDone}
            />
          </div>
          /
          <div data-testid="re-pentest-status" className="flex">
            <RenderStatus
              workType="re"
              type="pentest"
              status={item.pentestFixDone}
            />
          </div>
          {/* /
          <div data-testid="re-cloud-status" className="flex">{item.cloudFixDone}</div> */}
        </div>
      ),
      // 현황
      status: (
        <span className="cursor-pointer">
          <Tag
            type={item.status as keyof typeof TYPE}
            text={item.status}
            onClick={() =>
              openModifyInspectionStatus({
                name: item.serviceName,
                assetIdx: item.assetIdx,
                onClose: (res) => {
                  if (res === "refresh") {
                    refetch();
                  }
                },
              })
            }
          />
        </span>
      ),
      // 자세히보기
      button: (
        <Button
          color="navy"
          size="xs"
          text="자세히보기"
          type="button"
          onClick={() => {
            router.push(`/asset/${item.assetIdx}`);
          }}
        />
      ),
    };
  });

  const columns: ColumnDef<(typeof rows)[0], any>[] = [
    {
      id: "assetIdx",
      header: "#",
      accessorKey: "assetIdx",
      cell: ({ row }) => {
        return row.original.assetIdx;
      },
    },
    {
      id: "serviceName",
      header: "자산명",
      accessorKey: "serviceName",
      cell: ({ row }) => {
        return row.original.serviceName;
      },
    },
    {
      id: "manager",
      header: "담당자",
      accessorKey: "manager",
      cell: ({ row }) => {
        return row.original.manager;
      },
    },
    {
      id: "inspectionManager",
      header: ({ header }) => {
        return (
          <div className="flex flex-col gap-1 items-center">
            <span>점검대상 식별</span>
            <span className="text-xs">인프라 / 모의해킹 / 클라우드</span>
          </div>
        );
      },
      accessorKey: "inspectionManager",
      cell: ({ row }) => {
        return row.original.inspectionTarger;
      },
    },
    {
      id: "newInspection",
      header: ({ header }) => {
        return (
          <div className="flex flex-col gap-1 items-center">
            <span>취약점 점검</span>
            <span className="text-xs">인프라 / 모의해킹 / 클라우드</span>
          </div>
        );
      },
      accessorKey: "newInspection",
      cell: ({ row }) => {
        return row.original.newInspection;
      },
    },
    {
      id: "reInspection",
      header: ({ header }) => {
        return (
          <div className="flex flex-col gap-1 items-center">
            <span>이행 점검</span>
            <span className="text-xs">인프라 / 모의해킹 / 클라우드</span>
          </div>
        );
      },
      accessorKey: "reInspection",
      cell: ({ row }) => {
        return row.original.reInspection;
      },
    },
    {
      id: "status",
      header: "현황",
      accessorKey: "status",
      cell: ({ row }) => {
        return row.original.status;
      },
    },
    {
      id: "button",
      header: "",
      accessorKey: "button",
      cell: ({ row }) => {
        return row.original.button;
      },
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* 페이지 타이틀 */}
        <div className="text-lg font-bold">점검 현황</div>

        <div className="bg-white rounded-lg shadow-md p-6 w-full">
          {/* 테이블 */}
          <Table
            columns={columns}
            rows={rows}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </>
  );
}

interface renderStatusProps {
  workType: "new" | "re";
  type: "infra" | "pentest" | "cloud";
  status: boolean | null;
  tooltipContent?: string | null;
}

const RenderStatus = ({
  workType,
  type,
  status,
  tooltipContent,
}: renderStatusProps) => {
  return (
    <>
      {status === null ? (
        <Image
          src="icons/pending.svg"
          data-testid="pending-icon"
          alt="대기"
          width="12"
          height="12"
        />
      ) : !status ? (
        <>
          <Image
            id={`request-${workType}-${type}`}
            src="icons/progress.svg"
            data-testid="progress-icon"
            alt="진행"
            width="12"
            height="12"
          />
          {tooltipContent && (
            <Tooltip
              anchorSelect={`#request-${workType}-${type}`}
              content={tooltipContent}
            />
          )}
        </>
      ) : status ? (
        <>
          <Image
            id={`complete-${workType}-${type}`}
            src="icons/complete.svg"
            data-testid="complete-icon"
            alt="완료"
            width="12"
            height="12"
          />
          {tooltipContent && (
            <Tooltip
              anchorSelect={`complete-${workType}-${type}`}
              content={tooltipContent}
            />
          )}
        </>
      ) : null}
    </>
  );
};
