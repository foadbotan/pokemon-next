import { useState } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [searchFilter, setSearchFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState([]);
  const [numberOfPokemonVisible, setNumberOfPokemonVisible] = useState(10);

  const props = {
    ...pageProps,

    searchFilter,
    typeFilter,
    numberOfPokemonVisible,

    setSearchFilter,
    setTypeFilter,
    setNumberOfPokemonVisible,
  };

  return <Component {...props} />;
}

export default MyApp;
