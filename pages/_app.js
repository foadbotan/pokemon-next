import { useReducer } from "react";
import reducer from "../lib/reducer";
import "../styles/globals.css";

export const initialState = {
  searchFilter: "",
  typesFilter: [],
  numberOfPokemonVisible: 10,
};

function MyApp({ Component, pageProps }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Component {...pageProps} state={state} dispatch={dispatch} />;
}

export default MyApp;
