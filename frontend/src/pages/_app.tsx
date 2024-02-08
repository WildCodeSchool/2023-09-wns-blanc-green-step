import "@/styles/globals.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { setContext } from "@apollo/client/link/context";
import { createHttpLink } from "../../node_modules/@apollo/client/index";
import { AuthContext } from "@/contexts/authContext";
import { onError } from "@apollo/client/link/error";
import { useEffect, useState } from "react";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_LINK,
});


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token?`Bearer ${token}` : ""
    }
  }
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
  }
);

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App({ Component, pageProps }: AppProps) {
  
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default dynamic(() => Promise.resolve(App), { ssr: false });