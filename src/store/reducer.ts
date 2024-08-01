import { combineReducers } from "redux";
import { UPDATE_POKEMON_LIST } from "./actionTypes";
import {
  IPokemonInitialStates,
  IPokemonListAction,
} from "../utils/interfaces/Reducers/PokemonList";

const initialState: IPokemonInitialStates = {
  pokemonsList: [],
};

const pokemonReducer = (state = initialState, action: IPokemonListAction) => {
  switch (action.type) {
    case UPDATE_POKEMON_LIST:
      return {
        ...state,
        pokemonsList: action.pokemonsList,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  pokemons: pokemonReducer,
});

export default rootReducer;
