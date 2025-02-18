"use client";
import * as common from "@/constants/common";
import HomeLogic from "./Logic";

import Card from "@/components/dashboard/Card";
import Progress from "@/components/commons/Progress";
import Donut from "@/components/commons/Donut";
import Table from "@/components/commons/Table";
import Loading from "@/components/commons/Loading";

export default function Home() {
  const { data, isLoading, error } = HomeLogic();

  const year = new Date().getFullYear();
  if (isLoading) return <Loading />;
  if (error) return <>에러.. 여기엔 alert띄우자{error}</>;
  if (!data) return <>no data</>;

  const {
    infraWork,
    pentestWork,
    cloudWork,
    infraVuln,
    pentestVuln,
    cloudVuln,
    allVuln,
  } = data;

  return (
    <div className="flex flex-col gap-4">
      {/* 페이지 타이틀 */}
      <div className="text-lg font-bold">
        {year}년도 점검진쳑률 및 취약점 조치률
      </div>

      {/* 대시보드 */}
      <div className="flex flex-col gap-8">
        {/* 프로그레스 바 */}
        <div className="flex gap-8">
          {infraWork && (
            <Card
              data-testid="infra-inspection"
              title={`${year}년도 인프라 점검진척률`}
              guide={common.HOME.GUIDE_INFRA_INSPECTION}
            >
              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <span>{infraWork.percent}%</span>
                  <span className="text-gray-500">
                    {infraWork.done}건 완료 / 목표 {infraWork.mission}건
                  </span>
                </div>
                <Progress completed={infraWork.percent} />
              </div>
            </Card>
          )}

          {pentestWork && (
            <Card
              data-testid="pentest-inspection"
              title={`${year}년도 모의해킹 점검진척률`}
              guide={common.HOME.GUIDE_PENTEST_INSPECTION}
            >
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <span>{pentestWork.percent}%</span>
                  <span className="text-gray-500">
                    {pentestWork.done}건 완료 / 목표 {pentestWork.mission}건
                  </span>
                </div>
                <Progress completed={infraWork.percent} />
              </div>
            </Card>
          )}

          {cloudWork && (
            <Card
              data-testid="cloud-inspection"
              title={`${year}년도 클라우드 점검진척률`}
              guide={common.HOME.GUIDE_CLOUD_INSPECTION}
            >
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <span>{cloudWork.percent}%</span>
                  <span>
                    {cloudWork.done}건 완료 / 목표 {cloudWork.mission}건
                  </span>
                </div>
                <Progress completed={infraWork.percent} />
              </div>
            </Card>
          )}
        </div>

        {/* 도넛 그래프 */}
        <div className="flex gap-8">
          {infraVuln && (
            <Card
              data-testid="vuln-infra"
              title={`${year}년도 인프라점검 취약점 조치률`}
              guide={common.HOME.GUIDE_INTRA_VULN}
            >
              <div className="w-full flex flex-col">
                <div className="flex justify-between">
                  <span className="text-4xl ml-5 mt-5 font-semibold">
                    {infraVuln.percent}%
                  </span>
                  <span className="text-gray-500">
                    {infraVuln.fixed}건 조치 / {infraVuln.find}건 발견
                  </span>
                </div>
                <div className="relative w-full h-[25vh]">
                  <Donut
                    data={[
                      { name: "조치", value: infraVuln.fixed },
                      { name: "잔여", value: infraVuln.yet },
                    ]}
                  />
                </div>
              </div>
            </Card>
          )}

          {pentestVuln && (
            <Card
              data-testid="vuln-pentest"
              title={`${year}년도 모의해킹점검 취약점 조치률`}
              guide={common.HOME.GUIDE_PENTEST_VULN}
            >
              <div className="w-full flex flex-col">
                <div className="flex justify-between">
                  <span className="text-4xl ml-5 mt-5 font-semibold">
                    {pentestVuln.percent}%
                  </span>
                  <span className="text-gray-500">
                    {pentestVuln.fixed}건 조치 / {pentestVuln.find}건 발견
                  </span>
                </div>
                <div className="relative w-full h-[25vh]">
                  <Donut
                    data={[
                      { name: "조치", value: pentestVuln.fixed },
                      { name: "잔여", value: pentestVuln.yet },
                    ]}
                  />
                </div>
              </div>
            </Card>
          )}

          {cloudVuln && (
            <Card
              data-testid="vuln-cloud"
              title={`${year}년도 클라우드점검 취약점 조치률`}
              guide={common.HOME.GUIDE_CLOUD_VULN}
            >
              <div className="w-full flex flex-col">
                <div className="flex justify-between">
                  <span className="text-4xl ml-5 mt-5 font-semibold">
                    {infraVuln.percent}%
                  </span>
                  <span className="text-gray-500">
                    {infraVuln.fixed}건 조치 / {infraVuln.find}건 발견
                  </span>
                </div>
                <div className="relative w-full h-[25vh]">
                  <Donut
                    data={[
                      { name: "조치", value: infraVuln.fixed },
                      { name: "잔여", value: infraVuln.yet },
                    ]}
                  />
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* 테이블 */}
        {allVuln && (
          <div className="flex">
            <Card
              data-testid="all-vuln"
              title={`${year}년도 점검취약점 취약점 조치률`}
            >
              <Table columns={allVuln.columns} rows={allVuln.rows} />
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
