import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(false);
export const darkModeVar = makeVar(false);

export const client = new ApolloClient({
  uri: "https://pharmstagram-backend.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});
