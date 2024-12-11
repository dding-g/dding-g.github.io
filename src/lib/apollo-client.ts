import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "YOUR_GRAPHQL_ENDPOINT",
  cache: new InMemoryCache(),
});
