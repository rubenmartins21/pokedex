import { combineReducers } from "redux";
import { UPDATE_POKEMON_LIST } from "./actionTypes";
import {
  IPokemonInitialStates,
  IPokemonListAction,
} from "../utils/interfaces/Reduxers/PokemonList";

const initialState: IPokemonInitialStates = {
  pokemonList: [],
};

const pokemonListReducer = (
  state = initialState,
  action: IPokemonListAction
) => {
  switch (action.type) {
    case UPDATE_POKEMON_LIST:
      return {
        ...state,
        pokemonList: [...state.pokemonList, action.payload],
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  pokemonList: pokemonListReducer,
});

export default rootReducer;
