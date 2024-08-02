import { combineReducers } from "redux";
import {
  UPDATE_POKEMON_CARDS_LIST,
  UPDATE_ALL_POKEMON_LIST,
  UPDATE_POKEMON_DETAILS,
} from "./actionTypes";
import {
  IPokemonInitialStates,
  IPokemonListAction,
} from "../utils/interfaces/Reducers/PokemonList";

const initialState: IPokemonInitialStates = {
  pokemonsCardsList: null,
  allPokemons: null,
  pokemonsDetails: null,
};

const pokemonReducer = (state = initialState, action: IPokemonListAction) => {
  switch (action.type) {
    case UPDATE_POKEMON_CARDS_LIST:
      return {
        ...state,
        pokemonsCardsList: action.pokemonsCardsList,
      };

    case UPDATE_ALL_POKEMON_LIST:
      return {
        ...state,
        allPokemons: action.allPokemons,
      };

    case UPDATE_POKEMON_DETAILS:
      return {
        ...state,
        pokemonsDetails: action.pokemonsDetails,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  pokemons: pokemonReducer,
});

export default rootReducer;
