import Layout from "@/components/Layout";
import Toast, { setGlobalToast } from "@/components/Toast";
import "@/styles/globals.css";
import { AxiosError } from "axios";
import type { AppProps } from "next/app";
import { useRouter } from "next/navigation";
import {
  HydrationBoundary,
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Provider } from "react-redux";
import { Persistor, persistStore } from "redux-persist";
import { scan } from "react-scan";
import AdSense from "@/components/AdSense";
import { useEffect, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistGate } from "redux-persist/integration/react";
import { clientStore, serverStore } from "@/store/store";

export default function App({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false);
  let persistor;
  useEffect(() => {
    const isClient = typeof window !== "undefined";
    setIsClient(isClient);
  }, []);

  if (isClient) {
    scan({
      enabled: true,
      log: true,
    });
    persistor = persistStore(clientStore);
  }
  const router = useRouter();
  const [client] = useState(
    new QueryClient({
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
            setGlobalToast("오류가 발생하였습니다.", true);
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
    })
  );

  if (!isClient) {
    return (
      <Provider store={serverStore}>
        <QueryClientProvider client={client}>
          <HydrationBoundary state={pageProps.dehydratedProps}>
            <Layout isLayoutDisplay={pageProps.isLayoutDisplay}>
              <AdSense></AdSense>
              <Toast>
                <Component {...pageProps} />
              </Toast>
            </Layout>
            {process.env.NODE_ENV === "development" ? (
              <ReactQueryDevtools initialIsOpen={false} />
            ) : (
              ""
            )}
          </HydrationBoundary>
        </QueryClientProvider>
      </Provider>
    );
  } else {
    {
      console.log("client");
    }
    return (
      <Provider store={clientStore}>
        <PersistGate persistor={persistor as Persistor}>
          <QueryClientProvider client={client}>
            <HydrationBoundary state={pageProps.dehydratedProps}>
              <Layout isLayoutDisplay={pageProps.isLayoutDisplay}>
                <AdSense></AdSense>
                <Toast>
                  <Component {...pageProps} />
                </Toast>
              </Layout>
              {process.env.NODE_ENV === "development" ? (
                <ReactQueryDevtools initialIsOpen={false} />
              ) : (
                ""
              )}
            </HydrationBoundary>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    );
  }
}
