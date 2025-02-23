"use client";
import {
  createContext,
  Fragment,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import AlertModal from "@/components/modals/AlertModal";
import { CONFIRM_NO, CONFIRM_OK } from "@/constants/common";

type TYPE_ALERT = "alert";
type TYPE_CONFIRM = "confirm";
export interface OpenAlertType {
  message: string;
  onClose?: () => void;
}
interface OpenConfirmType {
  message: string;
  yes?: string;
  no?: string;
}
export interface AlertType {
  type: TYPE_ALERT | TYPE_CONFIRM;
  message: string;
  open: boolean;
  onClose?: (response?: any) => void;
  yes?: string;
  no?: string;
}

interface ContextType {
  openAlert: (message: string, onClose?: () => void) => void;
  openConfirmAlert: (
    { message, yes, no }: OpenConfirmType,
    onClose?: (response: any) => void,
  ) => void;
}

export const AlertContext = createContext<ContextType>({
  openAlert: () => {},
  openConfirmAlert: () => {},
});

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<AlertType[]>([]);

  const openAlert = useCallback((message: string, onClose?: () => void) => {
    const newAlert: AlertType = {
      type: "alert",
      message,
      onClose,
      open: true,
    };
    setAlerts((prev) => {
      return [...prev, newAlert];
    });
  }, []);

  const openConfirmAlert = useCallback(
    (
      { message, yes, no }: OpenConfirmType,
      onClose?: (response?: any) => void,
    ) => {
      const newConfirmAlert: AlertType = {
        type: "confirm",
        message,
        yes,
        no,
        open: true,
        onClose,
      };
      setAlerts((prev) => {
        return [...prev, newConfirmAlert];
      });
    },
    [],
  );

  const close = useCallback(
    (index: number, response?: string) => {
      if (alerts[index].onClose) alerts[index].onClose(response);
      setAlerts((prev) => {
        const updatedAlert = [...prev];
        updatedAlert[index].open = false;
        return updatedAlert;
      });
    },
    [alerts],
  );

  return (
    <AlertContext.Provider value={{ openAlert, openConfirmAlert }}>
      {children}
      {alerts.map((alert, idx) => {
        return (
          <Fragment key={idx}>
            {alert.open && alert.type === "alert" && (
              <AlertModal
                key={idx}
                content={alert.message}
                button={[
                  {
                    text: "확인",
                    color: "navy",
                    onClick: () => close(idx),
                  },
                ]}
                onClose={() => close(idx)}
              />
            )}
            {alert.open && alert.type === "confirm" && (
              <AlertModal
                key={idx}
                content={alert.message}
                button={[
                  {
                    text: alert.yes || "네",
                    color: "navy",
                    onClick: () => close(idx, CONFIRM_OK),
                  },
                  {
                    text: alert.no || "아니오",
                    color: "white",
                    onClick: () => close(idx, CONFIRM_NO),
                  },
                ]}
                onClose={() => close(idx)}
              />
            )}
          </Fragment>
        );
      })}
    </AlertContext.Provider>
  );
};

export const useAlert = (): ContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("alert context error");
  }
  return context;
};
