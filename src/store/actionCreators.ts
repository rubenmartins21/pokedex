import { IFilter } from "../utils/interfaces/Filter/Filter";
import { IAllPokemons } from "../utils/interfaces/Pokemon/Pokemon";
import * as actionTypes from "./actionTypes";

export const updatePokemonCardsList = (pokemonsCardsList: IAllPokemons) => ({
  type: actionTypes.UPDATE_POKEMON_CARDS_LIST,
  pokemonsCardsList,
});

export const updateAllPokemonsList = (allPokemons: IAllPokemons) => ({
  type: actionTypes.UPDATE_ALL_POKEMON_LIST,
  allPokemons,
});

export const updatePokemonSearchValue = (searchValue: string) => ({
  type: actionTypes.UPDATE_POKEMON_SEARCH_VALUE,
  searchValue,
});

export const setIsLoading = (loading: boolean) => ({
  type: actionTypes.SET_IS_LOADING,
  loading,
});

export const setIsFiltering = (filter: IFilter) => ({
  type: actionTypes.SET_IS_FILTERING,
  filter,
});
