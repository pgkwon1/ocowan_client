import Layout from "@/components/Layout";
import Toast, { setGlobalToast } from "@/components/Toast";
import { store } from "@/store/store";
import "@/styles/globals.css";
import { AxiosError } from "axios";
import type { AppProps } from "next/app";
import { useRouter } from "next/navigation";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { scan } from "react-scan";

export default function App({ Component, pageProps }: AppProps) {
  if (typeof window !== "undefined") {
    scan({
      enabled: true,
      log: true,
    });
  }
  const persistor = persistStore(store);
  const router = useRouter();
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        staleTime: 120000,
      },
      mutations: {
        retry: 0,
      },
    },
    queryCache: new QueryCache({
      onError(error) {
        if (error instanceof AxiosError && error.response?.status === 401) {
          setGlobalToast("다시 로그인 해주세요.");
          router.push("/member/logout");
        } else if (
          error instanceof AxiosError &&
          error.response?.status === 404
        ) {
          setGlobalToast("데이터를 불러오는데 실패하였습니다 .");
          router.push("/");
          return false;
        } else {
          setGlobalToast("오류가 발생하였습니다.");
          return false;
        }
      },
    }),
    mutationCache: new MutationCache({
      onError(error: any) {
        if (error instanceof AxiosError && error.response !== undefined) {
          const { status } = error.response;
          if (status === 401) {
            setGlobalToast("다시 로그인 해주세요.", true);
            router.push("/member/logout");
          } else {
            setGlobalToast(error.response.data.message, true);
          }
        } else {
          setGlobalToast("오류가 발생하였습니다.");
        }
      },
    }),
  });

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={client}>
          <Layout isLayoutDisplay={pageProps.isLayoutDisplay}>
            <Toast>
              <Component {...pageProps} />
            </Toast>
          </Layout>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
