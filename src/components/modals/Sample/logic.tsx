// "use client";
// import { useState } from "react";
// import { useQuery } from "react-query";

// import { getAddressBookModal } from "@/api";
// import { AddressBookType, ListType } from "@/types/api";

// export function AddressBookLogic() {
//   const [page, setPage] = useState(0);
//   const [search, setSearch] = useState("");
//   const [totalPages, setTotalPages] = useState(0);
//   const { data, isLoading, error } = useQuery<ListType<AddressBookType>>(
//     [`address-book`, page, search],
//     () => getAddressBookModal(page, search),
//     {
//       onSuccess: (res) => {
//         setTotalPages(res.totalPages);
//       },
//     },
//   );

//   return {
//     data,
//     isLoading,
//     error,
//     page,
//     setPage,
//     totalPages,
//     search,
//     setSearch,
//   };
// }
