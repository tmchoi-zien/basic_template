import "@testing-library/jest-dom";
beforeAll(() => {
  // 터미널 클리어
  process.stdout.write("\u001Bc");
});

beforeEach(() => {
  // 테스트 실행 전마다 터미널 클리어
  process.stdout.write("\u001Bc");
});
