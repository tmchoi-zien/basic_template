"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import AssetDetailLogic from "./Logic";

import Tag, { TYPE } from "@/components/commons/Tag";
import Table from "@/components/commons/Table";
import Loading from "@/components/commons/Loading";
import useModal from "@/components/modals/useModal";
import Button from "@/components/commons/Button";

export default function AssetDetail() {
  const { data, isLoading, error } = AssetDetailLogic();
  const {
    openInfraDetail,
    openPentestDetail,
    openAddInfra,
    openAddPentest,
    openAddCloud,
    openAddAsset,
  } = useModal();
  if (isLoading) return <Loading />;
  if (error) return <>에러.. 여기엔 alert띄우자{error}</>;
  if (!data) return <>no data</>;

  const { info, contents } = data;

  const rows = contents.map((item) => {
    return {
      // #
      inspectionIdx: item.inspectionIdx,
      // 점검구분
      type: item.type,
      // 점검대상
      inspectionTarger: (
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <Tag
              type={
                item.inspectionTypeCategory.toLowerCase() as keyof typeof TYPE
              }
              text={item.inspectionTypeCategory}
            />
            <Tag
              type={item.inspectionType.toLowerCase() as keyof typeof TYPE}
              text={item.inspectionType}
            />
          </div>
          <div className="flex gap-1">
            <div>{item.name}</div>
            <Image
              data-testid="target-icon"
              className="cursor-pointer"
              src={"/icons/external_link.svg"}
              alt={"상세보기"}
              width={12}
              height={12}
              onClick={() => {
                item.type === "인프라점검" &&
                  openInfraDetail(item.inspectionIdx);
                item.type === "모의해킹점검" &&
                  openPentestDetail(item.inspectionIdx);
              }}
            />
          </div>
        </div>
      ),
      // 현황
      status: (
        <Tag type={item.status as keyof typeof TYPE} text={item.status} />
      ),
      // 삭제
      delete: (
        <Image
          src="/icons/trash.svg"
          alt="delete"
          data-testid="trash-icon"
          width={16}
          height={16}
        />
      ),
    };
  });

  const columns: ColumnDef<(typeof rows)[0], any>[] = [
    {
      id: "inspectionIdx",
      header: "#",
      accessorKey: "inspectionIdx",
      cell: ({ row }) => {
        return row.original.inspectionIdx;
      },
    },
    {
      id: "type",
      header: "점검구분",
      accessorKey: "type",
      cell: ({ row }) => {
        return row.original.type;
      },
    },
    {
      id: "inspectionTarger",
      header: "점검대상",
      accessorKey: "inspectionTarger",
      cell: ({ row }) => {
        return row.original.inspectionTarger;
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
      id: "delete",
      header: "삭제",
      accessorKey: "delete",
      cell: ({ row }) => {
        return row.original.delete;
      },
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* 페이지 타이틀 */}
        <div className="text-lg font-bold">{`[${info.serviceName}] 점검현황`}</div>
        <div className="flex gap-2 justify-between">
          <div data-testid="sub-title-tags" className="flex gap-2">
            <Tag type="default" text={`${info.year}년도`} />
            <Tag type={info.status as keyof typeof TYPE} text={info.status} />
          </div>
          <div data-testid="sub-title-buttons" className="flex gap-2">
            <Button
              color="white"
              size="xs"
              type="button"
              text="인프라 추가"
              icon="plus"
              onClick={openAddInfra}
            />
            <Button
              color="white"
              size="xs"
              type="button"
              text="모의해킹 추가"
              icon="plus"
              onClick={openAddPentest}
            />
            <Button
              color="white"
              size="xs"
              type="button"
              text="클라우드 추가"
              icon="plus"
              onClick={openAddCloud}
            />
            <Button
              color="white"
              size="xs"
              type="button"
              text="자산정보 자세히보기"
              icon="plus"
              onClick={openAddAsset}
            />
          </div>
        </div>

        {/* 테이블 */}
        <Table columns={columns} rows={rows} />
      </div>
    </>
  );
}
