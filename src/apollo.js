import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN = "token";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = (history) => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  history.replace();
  window.location.reload();
};

export const darkModeVar = makeVar(false);

export const client = new ApolloClient({
  uri: "https://pharmstagram-backend.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});
