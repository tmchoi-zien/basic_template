import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { useRouter } from "next/navigation";
import { cleanText } from "@/utils/jest";

import Provider from "@/components/Provider";
import AssetLogic from "./Logic";
import { AssetListType } from "@/types/api";
import { assetListDto } from "@/dto/assetListDto";
import Asset from "./page";

jest.mock("./Logic");
jest.mock("next/navigation");

const mock: AssetListType = {
  content: [
    {
      assetIdx: 5,
      workType: "New",
      serviceName: "샘플데이터추출",
      type: null,
      inspectionType: null,
      openDay: "2025-01-03",
      dueDay: null,
      infraRequestDay: "12/30",
      pentestRequestDay: null,
      countInfra: 13,
      countPentest: 0,
      countInfraWorkDone: 10,
      countPentestWorkDone: null,
      countInfraFixDone: 0,
      countPentestFixDone: null,
      countInfraReIng: 0,
      countPentestReIng: 0,
      countInfraReRequest: 0,
      countPentestReRequest: 0,
      status: "RI",
      statusInfraWorkDone: false,
      statusInfraFixDone: false,
      statusPentestWorkDone: null,
      statusPentestFixDone: null,
      infraRemainedVulnCount: null,
      infraFindVulnCount: null,
      pentestRemainedVulnCount: null,
      pentestFindVulnCount: null,
      percent: null,
      reportPath: null,
      year: 2024,
      sso1SaUser: "hr.park",
      sso1Name: "박한렬",
      sso1PositionLevel: "선임연구원",
      sso2SaUser: null,
      sso2Name: null,
      sso2PositionLevel: null,
      sso3SaUser: null,
      sso3Name: null,
      sso3PositionLevel: null,
      sso4SaUser: null,
      sso4Name: null,
      sso4PositionLevel: null,
    },
    {
      assetIdx: 4,
      workType: "New",
      serviceName: "infra",
      type: null,
      inspectionType: null,
      openDay: "2024-12-04",
      dueDay: null,
      infraRequestDay: "12/04",
      pentestRequestDay: null,
      countInfra: 7,
      countPentest: 3,
      countInfraWorkDone: 0,
      countPentestWorkDone: 0,
      countInfraFixDone: 0,
      countPentestFixDone: 0,
      countInfraReIng: 0,
      countPentestReIng: 0,
      countInfraReRequest: 0,
      countPentestReRequest: 0,
      status: "PRI",
      statusInfraWorkDone: false,
      statusInfraFixDone: false,
      statusPentestWorkDone: false,
      statusPentestFixDone: false,
      infraRemainedVulnCount: null,
      infraFindVulnCount: null,
      pentestRemainedVulnCount: null,
      pentestFindVulnCount: null,
      percent: null,
      reportPath: null,
      year: 2024,
      sso1SaUser: "mk.son",
      sso1Name: "손민경",
      sso1PositionLevel: "팀장",
      sso2SaUser: null,
      sso2Name: null,
      sso2PositionLevel: null,
      sso3SaUser: null,
      sso3Name: null,
      sso3PositionLevel: null,
      sso4SaUser: null,
      sso4Name: null,
      sso4PositionLevel: null,
    },
    {
      assetIdx: 3,
      workType: "New",
      serviceName: "점검신청 test 01",
      type: null,
      inspectionType: null,
      openDay: "2025-02-16",
      dueDay: null,
      infraRequestDay: "11/21",
      pentestRequestDay: "11/25",
      countInfra: 2,
      countPentest: 1,
      countInfraWorkDone: 2,
      countPentestWorkDone: 1,
      countInfraFixDone: 0,
      countPentestFixDone: 0,
      countInfraReIng: 0,
      countPentestReIng: 0,
      countInfraReRequest: 0,
      countPentestReRequest: 0,
      status: "PRI",
      statusInfraWorkDone: true,
      statusInfraFixDone: false,
      statusPentestWorkDone: true,
      statusPentestFixDone: false,
      infraRemainedVulnCount: 36,
      infraFindVulnCount: null,
      pentestRemainedVulnCount: 5,
      pentestFindVulnCount: null,
      percent: null,
      reportPath: null,
      year: 2024,
      sso1SaUser: "mk.son",
      sso1Name: "손민경",
      sso1PositionLevel: "팀장",
      sso2SaUser: null,
      sso2Name: null,
      sso2PositionLevel: null,
      sso3SaUser: null,
      sso3Name: null,
      sso3PositionLevel: null,
      sso4SaUser: null,
      sso4Name: null,
      sso4PositionLevel: null,
    },
    {
      assetIdx: 2,
      workType: "New",
      serviceName: "dd",
      type: null,
      inspectionType: null,
      openDay: "2024-11-30",
      dueDay: null,
      infraRequestDay: "11/19",
      pentestRequestDay: "11/19",
      countInfra: 4,
      countPentest: 1,
      countInfraWorkDone: 4,
      countPentestWorkDone: 1,
      countInfraFixDone: 0,
      countPentestFixDone: 1,
      countInfraReIng: 0,
      countPentestReIng: 0,
      countInfraReRequest: 4,
      countPentestReRequest: 0,
      status: "PR",
      statusInfraWorkDone: true,
      statusInfraFixDone: false,
      statusPentestWorkDone: true,
      statusPentestFixDone: true,
      infraRemainedVulnCount: 72,
      infraFindVulnCount: null,
      pentestRemainedVulnCount: null,
      pentestFindVulnCount: null,
      percent: null,
      reportPath: null,
      year: 2024,
      sso1SaUser: "mk.son",
      sso1Name: "손민경",
      sso1PositionLevel: "팀장",
      sso2SaUser: null,
      sso2Name: null,
      sso2PositionLevel: null,
      sso3SaUser: null,
      sso3Name: null,
      sso3PositionLevel: null,
      sso4SaUser: null,
      sso4Name: null,
      sso4PositionLevel: null,
    },
    {
      assetIdx: 1,
      workType: "New",
      serviceName: "Test Project",
      type: null,
      inspectionType: null,
      openDay: "2024-11-30",
      dueDay: null,
      infraRequestDay: "11/18",
      pentestRequestDay: "11/19",
      countInfra: 4,
      countPentest: 1,
      countInfraWorkDone: 0,
      countPentestWorkDone: 0,
      countInfraFixDone: 0,
      countPentestFixDone: 0,
      countInfraReIng: 0,
      countPentestReIng: 0,
      countInfraReRequest: 0,
      countPentestReRequest: 0,
      status: "I",
      statusInfraWorkDone: false,
      statusInfraFixDone: false,
      statusPentestWorkDone: false,
      statusPentestFixDone: false,
      infraRemainedVulnCount: null,
      infraFindVulnCount: null,
      pentestRemainedVulnCount: null,
      pentestFindVulnCount: null,
      percent: null,
      reportPath: null,
      year: 2024,
      sso1SaUser: "mk.son",
      sso1Name: "손민경",
      sso1PositionLevel: "팀장",
      sso2SaUser: "jj.yu",
      sso2Name: "유재중",
      sso2PositionLevel: "팀장",
      sso3SaUser: "ws.kim",
      sso3Name: "김우성",
      sso3PositionLevel: "사원",
      sso4SaUser: "ws.kim",
      sso4Name: "김우성",
      sso4PositionLevel: "사원",
    },
  ],
  pageable: {
    sort: {
      empty: false,
      sorted: true,
      unsorted: false,
    },
    offset: 0,
    pageSize: 10,
    pageNumber: 0,
    paged: true,
    unpaged: false,
  },
  totalElements: 5,
  last: true,
  totalPages: 1,
  number: 0,
  size: 10,
  sort: {
    empty: false,
    sorted: true,
    unsorted: false,
  },
  numberOfElements: 5,
  first: true,
  empty: false,
};
const dtoData = assetListDto(mock);

describe("page : /asset", () => {
  (AssetLogic as jest.Mock).mockReturnValue({
    data: dtoData,
    isLoading: false,
    error: null,
    setPage: null,
  });
  const pushMock = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({
    push: pushMock,
  });

  beforeEach(() => {
    render(
      <Provider>
        <Asset />
      </Provider>,
    );
  });
  it("타이틀 표출", () => {
    const title = screen.getByText("점검 현황");
    expect(title).toBeInTheDocument();
  });

  describe("점검현황 테이블", () => {
    let table: HTMLElement;
    beforeEach(() => {
      table = screen.getByTestId("table");
    });

    it("table 표출 여부", () => {
      expect(table).toBeInTheDocument();
    });
    it("columns 확인", () => {
      [
        "#",
        "자산명",
        "점검대상",
        "담당자",
        "점검대상 식별인프라 / 모의해킹 / 클라우드",
        "취약점 점검인프라 / 모의해킹 / 클라우드",
        "이행 점검인프라 / 모의해킹 / 클라우드",
        "현황",
        "자세히보기",
      ].forEach((column) => {
        expect(table).toHaveTextContent(cleanText(column));
      });
    });

    dtoData.content.forEach((item, idx) => {
      describe(`${idx} 로우 확인`, () => {
        let row: HTMLElement;
        beforeEach(() => {
          row = screen.getByTestId(`row-${idx}`);
        });

        it("row 표출 확인", () => {
          expect(row).toBeInTheDocument();
        });
        describe("자산명 컬럼 확인", () => {
          let icon: HTMLElement;
          beforeEach(() => {
            icon = within(row).getByTestId("asset-icon");
          });
          it("icon 표출 확인", () => {
            expect(icon).toBeInTheDocument();
          });
          it("icon 클릭 시 자산 상세보기 팝업 표출", async () => {
            fireEvent.click(icon);
            await waitFor(() => {
              const popup = screen.getByTestId("popup-asset-detail");
              expect(popup).toBeInTheDocument;
            });
          });
        });

        describe("취약점 점검 컬럼 확인", () => {
          describe("취약점 점검 - 인프라 테스트", () => {
            let infra: HTMLElement;
            beforeEach(() => {
              infra = within(row).getByTestId("new-infra-status");
            });
            it("인프라 점검 호버링 툴팁 표출", () => {
              const pending = within(infra).getByTestId("pending-icon");
              const progress = within(infra).getByTestId("progress-icon");
              const complete = within(infra).getByTestId("complete-icon");
              if (progress) {
                fireEvent.mouseOver(progress);
                waitFor(() => {
                  const tooltip = screen.getByTestId("tooltip-progress");
                  expect(tooltip).toHaveTextContent(
                    cleanText("인프라 점검 신청일"),
                  );
                });
              }
              if (complete) {
                fireEvent.mouseOver(complete);
                waitFor(() => {
                  const tooltip = screen.getByTestId("tooltip-complete");
                  expect(tooltip).toHaveTextContent(
                    cleanText("인프라 점검 완료일"),
                  );
                });
              }
            });
          });

          describe("취약점 점검 - 모의해킹 테스트", () => {
            let pentest: HTMLElement;
            beforeEach(() => {
              pentest = within(row).getByTestId("new-pentest-status");
            });

            it("모의해킹 점검 호버링 툴팁 표출", () => {
              const pending = within(pentest).getByTestId("pending-icon");
              const progress = within(pentest).getByTestId("progress-icon");
              const complete = within(pentest).getByTestId("complete-icon");

              if (progress) {
                fireEvent.mouseOver(progress);
                waitFor(() => {
                  const tooltip = screen.getByTestId("tooltip-progress");
                  expect(tooltip).toHaveTextContent(
                    cleanText("모의해킹 점검 신청일"),
                  );
                });
              }
              if (complete) {
                fireEvent.mouseOver(complete);
                waitFor(() => {
                  const tooltip = screen.getByTestId("tooltip-complete");
                  expect(tooltip).toHaveTextContent(
                    cleanText("모의해킹 점검 완료일"),
                  );
                });
              }
            });
          });

          describe("취약점 점검 - 클라우드 테스트", () => {
            let cloud: HTMLElement;
            beforeEach(() => {
              cloud = within(row).getByTestId("new-cloud-status");
            });

            it("클라우드 점검 호버링 툴팁 표출", () => {
              const pending = within(cloud).getByTestId("pending-icon");
              const progress = within(cloud).getByTestId("progress-icon");
              const complete = within(cloud).getByTestId("complete-icon");

              if (progress) {
                fireEvent.mouseOver(progress);
                waitFor(() => {
                  const tooltip = screen.getByTestId("tooltip-progress");
                  expect(tooltip).toHaveTextContent(
                    cleanText("클라우드 점검 신청일"),
                  );
                });
              }
              if (complete) {
                fireEvent.mouseOver(complete);
                waitFor(() => {
                  const tooltip = screen.getByTestId("tooltip-complete");
                  expect(tooltip).toHaveTextContent(
                    cleanText("클라우드 점검 완료일"),
                  );
                });
              }
            });
          });
        });

        describe("이행점검 컬럼 확인", () => {
          describe("이행점검 - 인프라 테스트", () => {
            let infra: HTMLElement;
            beforeEach(() => {
              infra = within(row).getByTestId("re-infra-status");
            });
            it("인프라 점검 호버링 툴팁 표출", () => {
              const pending = within(infra).getByTestId("pending-icon");
              const progress = within(infra).getByTestId("progress-icon");
              const complete = within(infra).getByTestId("complete-icon");
              if (progress) {
                fireEvent.mouseOver(progress);
                waitFor(() => {
                  const tooltip = screen.getByTestId("tooltip-progress");
                  expect(tooltip).toHaveTextContent(
                    cleanText("인프라 이행점검 신청일"),
                  );
                });
              }
              if (complete) {
                fireEvent.mouseOver(complete);
                waitFor(() => {
                  const tooltip = screen.getByTestId("tooltip-complete");
                  expect(tooltip).toHaveTextContent(
                    cleanText("인프라 이행점검 완료일"),
                  );
                });
              }
            });
          });

          describe("이행점검 - 모의해킹 테스트", () => {
            let pentest: HTMLElement;
            beforeEach(() => {
              pentest = within(row).getByTestId("re-pentest-status");
            });

            it("모의해킹 점검 호버링 툴팁 표출", () => {
              const pending = within(pentest).getByTestId("pending-icon");
              const progress = within(pentest).getByTestId("progress-icon");
              const complete = within(pentest).getByTestId("complete-icon");

              if (progress) {
                fireEvent.mouseOver(progress);
                waitFor(() => {
                  const tooltip = screen.getByTestId("tooltip-progress");
                  expect(tooltip).toHaveTextContent(
                    cleanText("모의해킹 이행점검 신청일"),
                  );
                });
              }
              if (complete) {
                fireEvent.mouseOver(complete);
                waitFor(() => {
                  const tooltip = screen.getByTestId("tooltip-complete");
                  expect(tooltip).toHaveTextContent(
                    cleanText("모의해킹 이행점검 완료일"),
                  );
                });
              }
            });
          });

          describe("이행점검 - 클라우드 테스트", () => {
            let cloud: HTMLElement;
            beforeEach(() => {
              cloud = within(row).getByTestId("re-cloud-status");
            });

            it("클라우드 점검 호버링 툴팁 표출", () => {
              const pending = within(cloud).getByTestId("pending-icon");
              const progress = within(cloud).getByTestId("progress-icon");
              const complete = within(cloud).getByTestId("complete-icon");

              if (progress) {
                fireEvent.mouseOver(progress);
                waitFor(() => {
                  const tooltip = screen.getByTestId("tooltip-progress");
                  expect(tooltip).toHaveTextContent(
                    cleanText("클라우드 이행점검 신청일"),
                  );
                });
              }
              if (complete) {
                fireEvent.mouseOver(complete);
                waitFor(() => {
                  const tooltip = screen.getByTestId("tooltip-complete");
                  expect(tooltip).toHaveTextContent(
                    cleanText("클라우드 이행점검 완료일"),
                  );
                });
              }
            });
          });
        });

        describe("현황 컬럼 확인", () => {
          let status: HTMLElement;
          beforeEach(() => {
            status = within(row).getByTestId("tag");
          });
          it("현황 표출", () => {
            expect(status).toBeInTheDocument();
          });
          it("점검현황 팝업 표출", async () => {
            fireEvent.click(status);
            waitFor(() => {
              const popup = screen.getByTestId("popup-change-status");
              expect(popup).toBeInTheDocument();
            });
          });
        });

        describe("자세히보기 컬럼 확인", () => {
          let button: HTMLElement;
          beforeEach(() => {
            button = within(row).getByTestId("button");
          });
          it("현황 표출", () => {
            expect(button).toBeInTheDocument();
          });
          it("점검현황 팝업 표출", async () => {
            fireEvent.click(button);
            waitFor(() => {
              expect(pushMock).toHaveBeenCalledWith(`/asset/${item.assetIdx}`);
            });
          });
        });
      });
    });
  });
});
