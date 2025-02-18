/**
 * 한 페이지에서 다수의 useQuery를 활용할 떄 erorr message를 관리하는 함수
 * 
 * example: 


export default function Logic() {
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

 */

export function getErrorMessage(errors: (Error | null)[]): string | null {
  for (const error of errors) {
    if (!!error) {
      return JSON.stringify(error);
    }
  }
  return null;
}
