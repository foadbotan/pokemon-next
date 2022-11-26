import { useReducer } from "react";
import "../styles/globals.css";

const reducer = (state, action) => ({ ...state, ...action });
export const initialState = {
  searchFilter: "",
  typeFilter: [],
  numberOfPokemonVisible: 20,
};

function MyApp({ Component, pageProps }) {
  const store = useReducer(reducer, initialState);

  return <Component {...pageProps} store={store} />;
}

export default MyApp;
