// "use client";
// import TEST from "@/locale/ko/test-id.json";
// import TEXT from "@/locale/ko/modal.json";
// import { AddressBookLogic } from "./logic";

// import { ColumnDef } from "@tanstack/react-table";
// import Table from "@/components/commons/Table";
// import Button from "@/components/commons/Button";
// import Loading from "@/components/commons/Loading";

// const m = TEXT["address-book"];
// const t = TEST["modal"]["address-book"];

// export default function AddressBook({
//   onClose,
// }: {
//   onClose: (res: any) => void;
// }) {
//   const {
//     data,
//     isLoading,
//     error,
//     page,
//     setPage,
//     totalPages,
//     search,
//     setSearch,
//   } = AddressBookLogic();

//   if (isLoading) return <Loading />;
//   if (error) return <>에러.. 여기엔 alert띄우자{error}</>;
//   if (!data) return <>no data</>;

//   const rows = data.content.map((item) => {
//     return {
//       // #: 인덱스
//       idx: <>{item.idx}</>,
//       name: <>{item.name}</>,
//       department: <>{item.department}</>,
//       positionLevel: <>{item.positionLevel}</>,
//       email: <>{item.email}</>,
//       status: <>{item.status === "D" ? "퇴사" : "재직중"}</>,
//       check: (
//         <ul className="flex">
//           <li>
//             <Button
//               color="navy"
//               size="xs"
//               text={m["button-select"]}
//               type="button"
//               onClick={() => onClose(item)}
//             />
//           </li>
//         </ul>
//       ),
//     };
//   });

//   const columns: ColumnDef<(typeof rows)[0], any>[] = [
//     {
//       id: "idx",
//       size: 30,
//       header: m["columns"][0],
//       accessorKey: "idx",
//       cell: ({ row }) => {
//         return row.original.idx;
//       },
//     },
//     {
//       id: "name",
//       size: 80,
//       header: m["columns"][1],
//       accessorKey: "name",
//       cell: ({ row }) => {
//         return row.original.name;
//       },
//     },
//     {
//       id: "department",
//       size: 80,
//       header: m["columns"][2],
//       accessorKey: "department",
//       cell: ({ row }) => {
//         return row.original.department;
//       },
//     },
//     {
//       id: "positionLevel",
//       size: 100,
//       header: m["columns"][3],
//       accessorKey: "positionLevel",
//       cell: ({ row }) => {
//         return row.original.positionLevel;
//       },
//     },
//     {
//       id: "email",
//       size: 120,
//       header: m["columns"][4],
//       accessorKey: "email",
//       cell: ({ row }) => {
//         return row.original.email;
//       },
//     },
//     {
//       id: "status",
//       size: 80,
//       header: m["columns"][5],
//       accessorKey: "status",
//       cell: ({ row }) => {
//         return row.original.status;
//       },
//     },
//     {
//       id: "check",
//       size: 80,
//       header: "",
//       accessorKey: "check",
//       cell: ({ row }) => {
//         return row.original.check;
//       },
//     },
//   ];

//   return (
//     <div data-testid={t["test-name"]} className="flex flex-col gap-4">
//       {/* 모달 타이틀 */}
//       <div className="text-lg font-bold">{m["title"]}</div>
//       <Table
//         columns={columns}
//         rows={rows}
//         page={page}
//         setPage={setPage}
//         totalPages={totalPages}
//         search={search}
//         setSearch={setSearch}
//         customSize
//       />
//       {/* 버튼영역 */}
//       <div className="w-full">
//         <ul className="flex justify-center gap-3">
//           <li>
//             <Button
//               color="white"
//               size="m"
//               text={m["button-cancel"]}
//               type="button"
//               onClick={() => onClose(null)}
//             />
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }
