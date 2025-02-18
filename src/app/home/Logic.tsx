"use client";
import { useQuery } from "react-query";

import { getErrorMessage } from "@/utils";

import {
  getHomeAllVuln,
  getHomeInfraVuln,
  getHomeInfraWork,
  getHomePentestVuln,
  getHomePentestWork,
} from "@/api";
import { HomeAllVuln, HomeVulnType, HomeWorkType } from "@/types/api";
import homeDashboardDto from "@/dto/homeDashboadDto";

export default function HomeLogic() {
  const {
    data: infraWork,
    isLoading: infraWorkLoading,
    error: infraWorkError,
  } = useQuery<HomeWorkType, Error>("home/infra-work", getHomeInfraWork);
  const {
    data: pentestWork,
    isLoading: pentestWorkLoading,
    error: pentestWorkError,
  } = useQuery<HomeWorkType, Error>("home/pentest-work", getHomePentestWork);

  const {
    data: infraVuln,
    isLoading: infraVulnLoading,
    error: infraVulnError,
  } = useQuery<HomeVulnType, Error>("home/infra-vuln", getHomeInfraVuln);
  const {
    data: pentestVuln,
    isLoading: pentestVulnLoading,
    error: pentestVulnError,
  } = useQuery<HomeVulnType, Error>("home/pentest-vuln", getHomePentestVuln);

  const {
    data: allVuln,
    isLoading: allVulnLoading,
    error: allVulnError,
  } = useQuery<HomeAllVuln, Error>("home/all-vuln", getHomeAllVuln);

  const combinedData =
    infraWork && pentestWork && infraVuln && pentestVuln && allVuln
      ? homeDashboardDto({
          infraWork,
          pentestWork,
          infraVuln,
          pentestVuln,
          allVuln,
        })
      : null;

  return {
    data: combinedData,
    isLoading:
      infraWorkLoading ||
      pentestWorkLoading ||
      infraVulnLoading ||
      pentestVulnLoading ||
      allVulnLoading,
    error: getErrorMessage([
      infraWorkError,
      pentestWorkError,
      infraVulnError,
      pentestVulnError,
      allVulnError,
    ]),
  };
}
