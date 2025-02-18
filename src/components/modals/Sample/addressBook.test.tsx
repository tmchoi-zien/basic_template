// import { render, screen } from "@testing-library/react";

// import TEST from "@/locale/ko/test-id.json";
// import TEXT from "@/locale/ko/modal.json";
// import AddressBook from "./modal";
// import { AddressBookLogic } from "./logic";

// const m = TEXT["address-book"];
// const t = TEST;

// const mock = {
//   content: [
//     {
//       idx: 1,
//       name: "손민경",
//       positionLevel: "팀장",
//       email: "mk.son@zi-en.io",
//       saUser: "mk.son",
//       department: "개발1팀",
//       status: "C",
//     },
//     {
//       idx: 2,
//       name: "임홍인",
//       positionLevel: "사원",
//       email: "hi.lim@zi-en.io",
//       saUser: "hi.lim",
//       department: "개발2팀",
//       status: "C",
//     },
//     {
//       idx: 3,
//       name: "김우성",
//       positionLevel: "사원",
//       email: "ws.kim@zi-en.io",
//       saUser: "ws.kim",
//       department: "개발3팀",
//       status: "C",
//     },
//     {
//       idx: 4,
//       name: "박한렬",
//       positionLevel: "선임역구원",
//       email: "hrpark@zi-en.io",
//       saUser: "hr.park",
//       department: "R&D",
//       status: "C",
//     },
//     {
//       idx: 5,
//       name: "유재중",
//       positionLevel: "팀장",
//       email: "jj.yu@zi-en.io",
//       saUser: "jj.yu",
//       department: "운영1팀",
//       status: "C",
//     },
//   ],
//   pageable: {
//     sort: {
//       sorted: true,
//       unsorted: false,
//     },
//     pageSize: 10,
//     pageNumber: 0,
//     offset: 0,
//     paged: true,
//     unpaged: false,
//   },
//   last: true,
//   totalPages: 1,
//   totalElements: 5,
//   size: 10,
//   number: 0,
//   sort: {
//     sorted: true,
//     unsorted: false,
//   },
//   first: true,
//   numberOfElements: 5,
//   empty: false,
// };

// // logic.tsx를 모킹하여 실제 API 호출을 차단
// jest.mock("./logic");

// describe("MODAL: AddressBook", () => {
//   beforeEach(() => {
//     (AddressBookLogic as jest.Mock).mockReturnValue({
//       data: mock,
//     });
//     render(<AddressBook onClose={() => {}} />);
//   });

//   test("title 표출", () => {
//     expect(screen.getByText(m["title"])).toBeInTheDocument();
//   });

//   test("테이블 표출", () => {
//     expect(screen.getByTestId(t.component["table"])).toBeInTheDocument();
//   });

//   test("컬럼 확인", () => {
//     const table = screen.getByTestId(t.component["table"]);

//     m["columns"].forEach((item) => {
//       expect(table).toHaveTextContent(item);
//     });
//   });
// });
