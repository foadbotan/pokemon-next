import { initialState } from "../pages/_app";

export const ACTIONS = {
  setSearchFilter: "updateSearchFilter",
  setTypesFilter: "updateTypesFilter",
  showMorePokemon: "showMorePokemon",
  resetFilters: "resetFilters",
};

export default function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.setSearchFilter:
      return { ...state, searchFilter: action.payload };
    case ACTIONS.setTypesFilter:
      return { ...state, typesFilter: action.payload };
    case ACTIONS.showMorePokemon:
      return { ...state, numberOfPokemonVisible: state.numberOfPokemonVisible + 10 };
    case ACTIONS.resetFilters:
      return initialState;
    default:
      return state;
  }
}
