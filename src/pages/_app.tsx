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
  const [queryClient] = useState(
    () =>
      new QueryClient({
        // ... (기존 쿼리 설정 유지)
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
