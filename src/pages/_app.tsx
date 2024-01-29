import Layout from "@/components/Layout";
import Toast, { setGlobalToast } from "@/components/Toast";
import { store } from "@/store/store";
import "@/styles/globals.css";
import { AxiosError } from "axios";
import type { AppProps } from "next/app";
import { useRouter } from "next/navigation";
import { MutationCache, QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export default function App({ Component, pageProps }: AppProps) {
  const persistor = persistStore(store);
  const router = useRouter();
  const client = new QueryClient({
    mutationCache: new MutationCache({
      onError(error) {
        if (error instanceof AxiosError && error.response?.status === 401) {
          setGlobalToast("다시 로그인 해주세요.");
          router.push("/member/logout");
        }
      },
    }),
  });
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={client}>
          <Layout>
            <Toast>
              <Component {...pageProps} />
            </Toast>
          </Layout>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
