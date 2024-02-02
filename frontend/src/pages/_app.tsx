import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

import "@/styles/globals.css";

// function to recreate an uri object for apollo which is needed when using link instead of uri
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_LINK,
});

const client = new ApolloClient({
  link: from([httpLink]),
  cache: new InMemoryCache(),
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
