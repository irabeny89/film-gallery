import "../styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import { ApolloProvider } from "@apollo/client";
import { SSRProvider } from "react-bootstrap";
import client from "graphql/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider {...{ client }}>
      <SSRProvider>
        <Component {...pageProps} />
      </SSRProvider>
    </ApolloProvider>
  );
}

export default MyApp;
