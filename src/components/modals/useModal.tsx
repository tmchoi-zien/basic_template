import { ModalContext } from "@/contexts/ModalContext";
import { useContext } from "react";
// import AddressBook from "./Sample/modal";

export default function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("auth context error");
  }
  const { openModal } = context;

  // const openSample = ({ onClose }: { onClose: (res: any) => void }) => {
  //   openModal({
  //     options: {
  //       size: "md",
  //       children: AddressBook,
  //       data: {},
  //     },
  //     onClose,
  //   });
  // };

  return {};
}
