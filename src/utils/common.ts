/**
 * @function downloadBlob
 * @param blob : 파일 객체
 * @param filename : 파일 명
 * @returns void
 * @description 파일을 다운로드하기 위해 가상 element를 만들어 다운로드 요청을 하는 함수
 */

/** Example:

const downloadToolMutation = useMutation(downloadTool, {
  onSuccess: (res: any) => {
    const contentDisposition = res.headers.get("Content-Disposition");

    let fileName = "downloaded-file";
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="(.+)"/);
      if (match) fileName = match[1];
    }
    downloadBlob(res.data, fileName);
  },
  onError: () => {},
});

*/

export const downloadBlob = (blob: Blob, filename: string) => {
  if (!blob) return;

  const blobUrl = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(blobUrl);
};
