import { IAllPokemonsResults } from "../utils/interfaces/Pokemon/Pokemon";
import * as actionTypes from "./actionTypes";

export const updatePokemonList = (pokemonsList: IAllPokemonsResults[]) => ({
  type: actionTypes.UPDATE_POKEMON_LIST,
  pokemonsList,
});
