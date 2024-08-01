import { IAllPokemonsResults } from "../utils/interfaces/Pokemon/Pokemon";
import * as actionTypes from "./actionTypes";

export const updatePokemonList = (pokemonList: IAllPokemonsResults[]) => ({
  type: actionTypes.UPDATE_POKEMON_LIST,
  pokemonList,
});
