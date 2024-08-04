import { IAllPokemons, IPokemon } from "../utils/interfaces/Pokemon/Pokemon";
import * as actionTypes from "./actionTypes";

export const updatePokemonCardsList = (pokemonsCardsList: IAllPokemons) => ({
  type: actionTypes.UPDATE_POKEMON_CARDS_LIST,
  pokemonsCardsList,
});

export const updateAllPokemonsList = (allPokemons: IAllPokemons) => ({
  type: actionTypes.UPDATE_ALL_POKEMON_LIST,
  allPokemons,
});

export const updatePokemonsDetails = (pokemonsDetails: IPokemon[]) => ({
  type: actionTypes.UPDATE_POKEMON_DETAILS,
  pokemonsDetails,
});

export const updatePokemonSearchValue = (searchValue: string) => ({
  type: actionTypes.UPDATE_POKEMON_SEARCH_VALUE,
  searchValue,
});
