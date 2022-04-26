import { ApolloClient, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";
import config from "config";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new RestLink({
    uri: `https://www.omdbapi.com/?apikey=${config.apiKey}&`,
    endpoints: { poster: `https://img.omdbapi.com/?apikey=${config.apiKey}&` },
  }),
});

export default client;
