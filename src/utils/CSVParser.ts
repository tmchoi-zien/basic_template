import { ColumnDef } from "@tanstack/react-table";

/**
 * react-table을 활용해 table데이터를 csv파일로 export하는 함수
 * example: 

  const handleExport = () => {
    const csvContent = exportCSV(columns, rows);
    downloadCSV(csvContent, "test.csv");
  };

 */

export function exportCSV<T>(columns: ColumnDef<T, any>[], rows: T[]): string {
  // 1. CSV 헤더 생성
  const headers = columns.map((col) => col.header).join(",");

  // 2. CSV 데이터 생성
  const csvRows = rows.map((row) =>
    columns.map((col) => (col.id ? row[col.id as keyof T] : "")).join(","),
  );

  // 3. CSV 최종 문자열 반환
  return [headers, ...csvRows].join("\n");
}

// 브라우저에서 파일 다운로드 함수
export function downloadCSV(csvContent: string, filename = "data.csv"): void {
  const blob = new Blob([csvContent], { type: "text/csv; charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  // 다운로드 링크 생성
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);

  // csv 다운로드
  link.click();
  document.body.removeChild(link);
}
