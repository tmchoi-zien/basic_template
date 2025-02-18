import { AlertProvider } from "@/contexts/AlertContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { GlobalProvider } from "@/contexts/GlobalContext";
import { ModalProvider } from "@/contexts/ModalContext";
import { QueryClient, QueryClientProvider } from "react-query";

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AlertProvider>
          <ModalProvider>
            <GlobalProvider>{children}</GlobalProvider>
          </ModalProvider>
        </AlertProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
