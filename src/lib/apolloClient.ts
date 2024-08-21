// src/lib/apolloClient.ts
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://develop.smop.asia/graphql/", // Replace with your actual GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
