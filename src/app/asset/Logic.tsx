"use client";
import { useState } from "react";
import { useQuery } from "react-query";

import { getAssetList } from "@/api";
import { assetListDto } from "@/dto/assetListDto";
import { AssetType, ListType } from "@/types/api";

export default function AssetLogic() {
  const year = String(new Date().getFullYear());
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const serviceName = "serviceName";

  const { data, isLoading, error, refetch } = useQuery<
    ListType<AssetType>,
    Error
  >(["/asset", page], () => getAssetList(year, page, serviceName), {
    onSuccess: (res) => {
      setTotalPages(res.totalPages);
    },
  });

  const dataDto = data ? assetListDto(data) : null;

  return {
    data: dataDto,
    isLoading,
    error,
    refetch,
    page,
    setPage,
    totalPages,
  };
}
