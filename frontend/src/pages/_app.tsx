import "@/styles/globals.css";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

import Layout from "../layouts/layout";

import "@/styles/globals.css";
import { AuthContextProvider } from "@/contexts/AuthContext";
import HeadMeta from "@/components/meta/HeadMeta";
import { ExpensesProvider } from "@/contexts/ExpensesContext";
import { NotifProvider } from "@/contexts/NotifContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_LINK,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, operation }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      if (err.extensions.code === "UNAUTHENTICATED") {
        localStorage.removeItem("token");
        location.replace("/login");
      }
    }
  }
});

const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <NotifProvider>
          <ExpensesProvider>
            <Layout>
              <HeadMeta />
              <ToastContainer />
              <Component {...pageProps} />
            </Layout>
          </ExpensesProvider>
        </NotifProvider>
      </AuthContextProvider>
    </ApolloProvider>
  );
}

export default dynamic(() => Promise.resolve(App), { ssr: false });
