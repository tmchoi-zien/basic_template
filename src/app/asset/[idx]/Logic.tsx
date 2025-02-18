"use client";
import { useQuery } from "react-query";
import { usePathname } from "next/navigation";

import { getAssetDetail, getAssetInfo } from "@/api";
import { AssetContentType, AssetInfoType } from "@/types/api";
import assetDetailDto from "@/dto/sampleDto";
import { getErrorMessage } from "@/utils";

export default function AssetDetailLogic() {
  const pathname = usePathname();
  const assetIdx = parseInt(pathname.split("/")[2]);

  const {
    data: infoData,
    isLoading: infoLoading,
    error: infoError,
  } = useQuery<AssetInfoType, Error>(`/aseet/info-${assetIdx}`, () =>
    getAssetInfo(assetIdx),
  );
  const {
    data: contentsData,
    isLoading: contentsLoading,
    error: contentsError,
  } = useQuery<AssetContentType[], Error>(`/aseet/contents-${assetIdx}`, () =>
    getAssetDetail(assetIdx),
  );

  const dataDto =
    !!infoData && !!contentsData
      ? assetDetailDto(infoData, contentsData)
      : null;

  return {
    data: dataDto,
    isLoading: infoLoading || contentsLoading,
    error: getErrorMessage([infoError, contentsError]),
  };
}
