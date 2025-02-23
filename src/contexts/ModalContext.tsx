"use client";
import {
  Fragment,
  useState,
  ReactNode,
  useCallback,
  createContext,
  ComponentType,
  useContext,
} from "react";
import Modal, { SizeType } from "@/components/modals/Modal";

export interface openModalProps {
  options: {
    size: SizeType;
    children: ComponentType<any>;
    data?: any;
  };
  onClose?: (res: any) => void;
}

export interface ModalType {
  id: number;
  size: SizeType;
  children: ComponentType<any>;
  open: boolean;
  data?: any;
  onClose?: (data: any) => void;
}

export interface ModalContextProps {
  modals: ModalType[];
  openModal: ({ options, onClose }: openModalProps) => void;
  closeModal: (idx: number, res?: any) => void;
}

const defaultModalContext: ModalContextProps = {
  modals: [],
  openModal: () => {},
  closeModal: () => {},
};

export const ModalContext =
  createContext<ModalContextProps>(defaultModalContext);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<ModalType[]>([]);

  const openModal = useCallback(
    ({ options, onClose }: openModalProps) => {
      const newModal: ModalType = {
        size: options.size,
        children: options.children,
        open: true,
        id: modals.length,
        data: options.data,
        onClose,
      };
      setModals((prev) => {
        return [...prev, newModal];
      });
    },
    [modals],
  );

  const closeModal = useCallback(
    (index: number, res?: any) => {
      if (modals[index].onClose) modals[index].onClose(res);
      setModals((prev) => {
        const updatedModal = [...prev];
        updatedModal[index].open = false;
        return updatedModal;
      });
    },
    [modals],
  );

  return (
    <ModalContext.Provider value={{ modals, openModal, closeModal }}>
      {children}
      {modals.map((modal, idx) => {
        return (
          <Fragment key={idx}>
            {modal.open && (
              <Modal size={modal.size} onClose={() => closeModal(modal.id)}>
                <modal.children
                  data={modal.data}
                  onClose={(res: any) => closeModal(modal.id, res)}
                />
              </Modal>
            )}
          </Fragment>
        );
      })}
    </ModalContext.Provider>
  );
};
