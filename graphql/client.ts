import { ApolloClient, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new RestLink({
    uri: "http://www.omdbapi.com/?apikey=84c54846&",
    endpoints: { poster: "http://img.omdbapi.com/?apikey=84c54846&" },
  }),
});

export default client;
