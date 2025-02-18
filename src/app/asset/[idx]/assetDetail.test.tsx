/**
 * 1. [:assetName] 점검 현황 표출
 * 2. 등록연도, status표출
 * 3. 버튼 표출 및 동작 확인
 *  - 인프라 추가 버튼, 클릭 시 인프라 추가 팝업 표출
 *  - 모의해킹 추가 버튼, 클릭 시 모의해킹 추가 팝업 표출
 *  - 클라우드 추가 버튼, 클릭 시 클라우드 추가 팝업 표출
 *  - 자산정보 자세히보기 버튼, 클릭 시 자산 상세 팝업 표출
 *
 * 4. 테이블
 *  - 컬럼 "#", "점검구분", "점검대상", "현황", "삭제",
 *  - 점검대상 컬럼 확인
 *    - 아이콘 클릭 시 점검대상 상세 팝업 표출
 *  - 삭제 컬럼 확인
 *    - 삭제 아이콘 클릭시 "삭제 하시겠습니까?"확인 팝업 표출
 */
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";

import Provider from "@/components/Provider";
import AssetDetail from "./page";
import assetDetailDto from "@/dto/assetDetailDto";
import AssetDetailLogic from "./Logic";
import { AssetContentType, AssetInfoType } from "@/types/api";

jest.mock("./Logic");

const mockInfo: AssetInfoType = {
  serviceName: "dd",
  year: 2024,
  status: "PR",
  name: null,
  hostName: null,
  userId: null,
  pmId: null,
  workType: "New",
};
const mockContents: AssetContentType[] = [
  {
    type: "Infra",
    inspectionIdx: 1,
    name: "ZIEN",
    access: null,
    inspectionType: "Windows",
    inspectionTypeCategory: "OS",
    status: "PR",
    lastRound: 1,
    oldIdx: null,
    userId: null,
    pmId: null,
  },
  {
    type: "Infra",
    inspectionIdx: 2,
    name: "ZIEN",
    access: null,
    inspectionType: "Windows",
    inspectionTypeCategory: "OS",
    status: "PR",
    lastRound: 1,
    oldIdx: null,
    userId: null,
    pmId: null,
  },
  {
    type: "Infra",
    inspectionIdx: 3,
    name: "ZIEN",
    access: null,
    inspectionType: "Windows",
    inspectionTypeCategory: "OS",
    status: "PR",
    lastRound: 1,
    oldIdx: null,
    userId: null,
    pmId: null,
  },
  {
    type: "Infra",
    inspectionIdx: 8,
    name: "ZIEN",
    access: null,
    inspectionType: "Windows",
    inspectionTypeCategory: "OS",
    status: "PR",
    lastRound: 1,
    oldIdx: null,
    userId: null,
    pmId: null,
  },
  {
    type: "Pentest",
    inspectionIdx: 2,
    name: "test",
    access: "대외",
    inspectionType: "웹",
    inspectionTypeCategory: "SERVICE",
    status: "D",
    lastRound: 0,
    oldIdx: null,
    userId: null,
    pmId: null,
  },
];
const dtoData = assetDetailDto(mockInfo, mockContents);

describe("page : /asset/{:idx}", () => {
  (AssetDetailLogic as jest.Mock).mockReturnValue({
    data: dtoData,
    isLoading: false,
    error: null,
    setPage: null,
  });

  beforeEach(() => {
    render(
      <Provider>
        <AssetDetail />
      </Provider>,
    );
  });
  it("타이틀 표출", () => {
    const title = screen.getByText(`[${dtoData.info.serviceName}] 점검현황`);
    expect(title).toBeInTheDocument();
  });

  describe("서브 타이틀 영억", () => {
    const year = new Date().getFullYear();

    describe("태그 영역", () => {
      let tags: HTMLElement;
      beforeEach(() => {
        tags = screen.getByTestId("sub-title-tags");
      });
      it("연도 태그", () => {
        expect(tags).toHaveTextContent(`${year}년도`);
      });
      it("상태 태그", () => {
        expect(tags).toHaveTextContent(dtoData.info.status);
      });
    });

    describe("버튼 영역", () => {
      let buttons: HTMLElement;
      beforeEach(() => {
        buttons = screen.getByTestId("sub-title-buttons");
      });
      describe("인프라 추가 버튼", () => {
        let addInfra: HTMLElement;
        beforeEach(() => {
          addInfra = within(buttons).getByText("인프라 추가");
        });
        it("버튼 표출", () => {
          expect(addInfra).toBeInTheDocument();
        });
        it("버튼 클릭 시 인프라 추가 팝업 표출", async () => {
          fireEvent.click(addInfra);
          waitFor(() => {
            const popup = screen.getByTestId("popup-add-infra");
            expect(popup).toBeInTheDocument();
          });
        });
      });
      describe("모의해킹 추가 버튼", () => {
        let addPentest: HTMLElement;
        beforeEach(() => {
          addPentest = within(buttons).getByText("모의해킹 추가");
        });
        it("버튼 표출", () => {
          expect(addPentest).toBeInTheDocument();
        });
        it("버튼 클릭 시 모의해킹 추가 팝업 표출", async () => {
          fireEvent.click(addPentest);
          waitFor(() => {
            const popup = screen.getByTestId("popup-add-pentest");
            expect(popup).toBeInTheDocument();
          });
        });
      });
      describe("클라우드 추가 버튼", () => {
        let addCloud: HTMLElement;
        beforeEach(() => {
          addCloud = within(buttons).getByText("클라우드 추가");
        });
        it("버튼 표출", () => {
          expect(addCloud).toBeInTheDocument();
        });
        it("버튼 클릭 시 클라우드 추가 팝업 표출", async () => {
          fireEvent.click(addCloud);
          waitFor(() => {
            const popup = screen.getByTestId("popup-add-cloud");
            expect(popup).toBeInTheDocument();
          });
        });
      });
      describe("자산정보 자세히보기 버튼", () => {
        let assetDetail: HTMLElement;
        beforeEach(() => {
          assetDetail = within(buttons).getByText("자산정보 자세히보기");
        });

        it("버튼 표출", () => {
          expect(assetDetail).toBeInTheDocument();
        });
        it("버튼 클릭 시 자산 상세 팝업 표출", async () => {
          fireEvent.click(assetDetail);
          waitFor(() => {
            const popup = screen.getByTestId("popup-asset-detail");
            expect(popup).toBeInTheDocument();
          });
        });
      });
    });
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
      ["#", "점검구분", "점검대상", "현황", "삭제"].forEach((column) => {
        expect(table).toHaveTextContent(column);
      });
    });

    dtoData.contents.forEach((item, idx) => {
      describe(`${idx} 로우 확인`, () => {
        let row: HTMLElement;
        beforeEach(() => {
          row = screen.getByTestId(`row-${idx}`);
        });

        it("row 표출 확인", () => {
          expect(row).toBeInTheDocument();
        });

        describe("점검대상 컬럼 확인", () => {
          let icon: HTMLElement;
          beforeEach(() => {
            icon = within(row).getByTestId("target-icon");
          });
          it("icon 표출 확인", () => {
            expect(icon).toBeInTheDocument();
          });
          it("icon 클릭 시 점검대상 상세보기 팝업 표출", async () => {
            fireEvent.click(icon);
            await waitFor(() => {
              const popup = screen.getByTestId("popup-target-detail");
              expect(popup).toBeInTheDocument;
            });
          });
        });

        describe("삭제 컬럼 확인", () => {
          let icon: HTMLElement;
          beforeEach(() => {
            icon = within(row).getByTestId("trash-icon");
          });
          it("icon 표출 확인", () => {
            expect(icon).toBeInTheDocument();
          });
          it("icon 클릭 시 점검대상 삭제 확인 변경 팝업 표출", async () => {
            fireEvent.click(icon);
            await waitFor(() => {
              const popup = screen.getByTestId("popup-confirm");
              expect(popup).toHaveTextContent("삭제하시겠습니까?");
            });
          });
        });
      });
    });
  });
});
