import { useEffect, useState } from "react";
import axios from "axios";

export default function usePokemonSearch(url) {
  const [state, setState] = useState("");

  useEffect(() => {
    axios
      .get(url, {
        params: {
          offset: 0,
          limit: 20,
        },
      })
      .then(({ data }) => {
        setState(data.results.map(({ name }) => name));
      });
  }, [url]);

  return state;
}
