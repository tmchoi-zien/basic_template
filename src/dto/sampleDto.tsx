import { STATUS } from "@/constants/common";
import { AssetContentType, AssetInfoType } from "@/types/api";

export default function assetDetailDto(
  info: AssetInfoType,
  contents: AssetContentType[],
) {
  return {
    info: {
      serviceName: info.serviceName,
      year: info.year,
      status: STATUS[info.status as keyof typeof STATUS],
    },
    contents: contents?.map((item) => {
      const type =
        item.type === "Infra"
          ? "인프라점검"
          : item.type === "Pentest"
            ? "모의해킹점검"
            : item.type === "Cloud"
              ? "클라우드점검"
              : "";
      return {
        inspectionIdx: item.inspectionIdx,
        type,
        inspectionType: item.inspectionType,
        inspectionTypeCategory: item.inspectionTypeCategory,
        name: item.name,
        status: STATUS[item.status as keyof typeof STATUS],
      };
    }),
  };
}
