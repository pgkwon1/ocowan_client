// pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "@/store/store";
import { Provider } from "react-redux"; // ✅ Provider 추가
import { PersistGate } from "redux-persist/integration/react";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Toast from "@/components/Toast";
import AdSense from "@/components/AdSense";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { setGlobalToast } from "@/components/Toast";
import { MutationCache, QueryCache } from "@tanstack/react-query";

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const router = useRouter();
  const [queryClient] = useState(
    () =>
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
  const [mounted, setMounted] = useState(false);
  const [persistor, setPersistor] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // persistor 설정
      setPersistor((store as any).__persistor);
      setMounted(true);
    }
  }, [store]);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={props.pageProps.dehydratedProps}>
          <Layout isLayoutDisplay={props.pageProps.isLayoutDisplay}>
            <AdSense />
            <Toast>
              {mounted && persistor ? (
                <PersistGate persistor={persistor} loading={null}>
                  <Component {...props.pageProps} />
                </PersistGate>
              ) : (
                <Component {...props.pageProps} />
              )}
            </Toast>
          </Layout>
          {process.env.NODE_ENV === "development" && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </HydrationBoundary>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
