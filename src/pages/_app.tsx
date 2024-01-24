import Layout from "@/components/Layout";
import { store } from "@/store/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export default function App({ Component, pageProps }: AppProps) {
  const persistor = persistStore(store);
  const client = new QueryClient();
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={client}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
