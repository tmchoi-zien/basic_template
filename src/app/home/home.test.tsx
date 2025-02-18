import Home from "./page";
import { render, screen, within } from "@testing-library/react";

import * as common from "@/constants/common";
import homeDashboardDto, { HomeDashboardDtoType } from "@/dto/homeDashboadDto";
import { cleanText } from "@/utils/jest";
import HomeLogic from "./Logic";

jest.mock("recharts", () => {
  const OriginalModule = jest.requireActual("recharts");

  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div style={{ width: "100%", height: 300 }}>{children}</div>
    ),
  };
});
jest.mock("./Logic");

const mock: HomeDashboardDtoType = {
  infraWork: {
    done: 20,
    percent: 20,
    mission: 20,
  },
  pentestWork: {
    done: 20,
    percent: 20,
    mission: 20,
  },
  cloudWork: {
    done: 20,
    percent: 20,
    mission: 20,
  },
  infraVuln: {
    patch: 0,
    find: 0,
    accepted: 0,
    yet: 0,
    fixed: 0,
    percent: 0,
  },
  pentestVuln: {
    patch: 0,
    find: 0,
    accepted: 0,
    yet: 0,
    fixed: 0,
    percent: 0,
  },
  cloudVuln: {
    patch: 0,
    find: 0,
    accepted: 0,
    yet: 0,
    fixed: 0,
    percent: 0,
  },
  allVuln: {
    infraPercent: 0,
    sumPatchPentest: 0,
    findNewPentest: 0,
    patchNewInfra: 0,
    pentestPercent: 0,
    patchNewPentest: 0,
    findNewInfra: 0,
    remainedNewInfra: 0,
    remainedNewPentest: 0,
    patchLoopPentest: 0,
    remainedLoopPentest: 0,
    sumFindInfra: 0,
    sumFindPentest: 0,
    findLoopPentest: 0,
    sumPatchInfra: 0,
    sumRemainedInfra: 0,
    sumRemainedPentest: 0,
  },
};
const homeDtoMock = homeDashboardDto(mock);

describe("page : /home", () => {
  const year = new Date().getFullYear();
  (HomeLogic as jest.Mock).mockReturnValue({
    data: homeDtoMock,
    isLoading: false,
    error: null,
  });

  beforeEach(() => {
    render(<Home />);
    // render(<HomePresenter data={homeDtoMock} isLoading={false} error={null} />);
  });

  it(`현재 연도(${year})에 맞는 타이틀 표출 여부`, () => {
    const title = screen.getByText(`${year}년도 점검진쳑률 및 취약점 조치률`);
    expect(title).toBeInTheDocument();
  });

  describe("2. 점검진척률 대시보드", () => {
    describe("인프라 점검진척률 카드", () => {
      let card: HTMLElement;
      beforeEach(() => {
        card = screen.getByTestId("infra-inspection");
      });

      it("카드 표출 여부", () => {
        expect(card).toBeInTheDocument();
      });
      it("해당연도 타이틀 표출", () => {
        expect(card).toHaveTextContent(
          cleanText(`${year}년도 인프라 점검진척률`),
        );
      });
      it("Progress bar 표출", () => {
        const progressBar = within(card).getByTestId("progress-bar");
        expect(progressBar).toBeInTheDocument();
      });
      it("가이드 문구 표출", () => {
        const guide = within(card).getByTestId("guide");
        expect(guide).toHaveTextContent(
          cleanText(common.HOME.GUIDE_INFRA_INSPECTION),
        );
      });
    });

    describe("모의해킹 점검진척률 카드", () => {
      let card: HTMLElement;
      beforeEach(() => {
        card = screen.getByTestId("pentest-inspection");
      });

      it("카드 표출 여부", () => {
        expect(card).toBeInTheDocument();
      });
      it("해당연도 타이틀 표출", () => {
        expect(card).toHaveTextContent(
          cleanText(`${year}년도 모의해킹 점검진척률`),
        );
      });
      it("Progress bar 표출", () => {
        const progressBar = within(card).getByTestId("progress-bar");
        expect(progressBar).toBeInTheDocument();
      });
      it("가이드 문구 표출", () => {
        const guide = within(card).getByTestId("guide");
        expect(guide).toHaveTextContent(
          cleanText(common.HOME.GUIDE_PENTEST_INSPECTION),
        );
      });
    });

    describe("클라우드 점검진척률 카드", () => {
      let card: HTMLElement;
      beforeEach(() => {
        card = screen.getByTestId("cloud-inspection");
      });

      it("카드 표출 여부", () => {
        expect(card).toBeInTheDocument();
      });
      it("해당연도 타이틀 표출", () => {
        expect(card).toHaveTextContent(
          cleanText(`${year}년도 클라우드 점검진척률`),
        );
      });
      it("Progress bar 표출", () => {
        const progressBar = within(card).getByTestId("progress-bar");
        expect(progressBar).toBeInTheDocument();
      });
      it("가이드 문구 표출", () => {
        const guide = within(card).getByTestId("guide");
        expect(guide).toHaveTextContent(
          cleanText(common.HOME.GUIDE_CLOUD_INSPECTION),
        );
      });
    });
  });

  describe("3. 취약점 조치률 도넛 그래프", () => {
    describe(`${year}년도 인프라점검 취약점 조치률 카드`, () => {
      let card: HTMLElement;
      beforeEach(() => {
        card = screen.getByTestId("vuln-infra");
      });

      it("카드 표출 여부", () => {
        expect(card).toBeInTheDocument();
      });
      it("해당연도 타이틀 표출", () => {
        expect(card).toHaveTextContent(
          cleanText(`${year}년도 인프라점검 취약점 조치률`),
        );
      });
      it("도넛 그래프 표출", () => {
        const donut = within(card).getByTestId("donut-graph");
        expect(donut).toBeInTheDocument();
      });
      it("가이드 문구 표출", () => {
        const guide = within(card).getByTestId("guide");
        expect(guide).toHaveTextContent(
          cleanText(common.HOME.GUIDE_INTRA_VULN),
        );
      });
    });

    describe(`${year}년도 모의해킹점검 취약점 조치률 카드`, () => {
      let card: HTMLElement;
      beforeEach(() => {
        card = screen.getByTestId("vuln-pentest");
      });

      it("카드 표출 여부", () => {
        expect(card).toBeInTheDocument();
      });
      it("해당연도 타이틀 표출", () => {
        expect(card).toHaveTextContent(
          cleanText(`${year}년도 모의해킹점검 취약점 조치률`),
        );
      });
      it("도넛 그래프 표출", () => {
        const donut = within(card).getByTestId("donut-graph");
        expect(donut).toBeInTheDocument();
      });
      it("가이드 문구 표출", () => {
        const guide = within(card).getByTestId("guide");
        expect(guide).toHaveTextContent(
          cleanText(common.HOME.GUIDE_PENTEST_VULN),
        );
      });
    });

    describe(`${year}년도 클라우드점검 취약점 조치률 카드`, () => {
      let card: HTMLElement;
      beforeEach(() => {
        card = screen.getByTestId("vuln-cloud");
      });

      it("카드 표출 여부", () => {
        expect(card).toBeInTheDocument();
      });
      it("해당연도 타이틀 표출", () => {
        expect(card).toHaveTextContent(
          cleanText(`${year}년도 클라우드점검 취약점 조치률`),
        );
      });
      it("도넛 그래프 표출", () => {
        const donut = within(card).getByTestId("donut-graph");
        expect(donut).toBeInTheDocument();
      });
      it("가이드 문구 표출", () => {
        const guide = within(card).getByTestId("guide");
        expect(guide).toHaveTextContent(
          cleanText(common.HOME.GUIDE_CLOUD_VULN),
        );
      });
    });
  });

  describe("4. 취약점 조치률 표", () => {
    let card: HTMLElement;
    beforeEach(() => {
      card = screen.getByTestId("all-vuln");
    });
    it("해당연도 타이틀 표출", () => {
      expect(card).toHaveTextContent(
        cleanText(`${year}년도 점검취약점 취약점 조치률`),
      );
    });
    describe("4. 취약점 조치률 표", () => {
      let table: HTMLElement;
      beforeEach(() => {
        table = within(card).getByTestId("table");
      });

      it("table 표출 여부", () => {
        expect(table).toBeInTheDocument();
      });
      it("columns 확인", () => {
        [
          "점검종류",
          "발견 취약건",
          "조치 취약건",
          "잔여 취약건",
          "조치율",
        ].forEach((column) => {
          expect(table).toHaveTextContent(column);
        });
      });
      it("rows 확인", () => {
        ["인프라", "모의해킹", "클라우드"].forEach((row) => {
          expect(table).toHaveTextContent(row);
        });
      });
    });
  });
});
