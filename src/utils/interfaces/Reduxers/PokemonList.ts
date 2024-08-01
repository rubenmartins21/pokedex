import { IAllPokemonsResults } from "../Pokemon/Pokemon";

export interface IPokemonInitialStates {
  pokemonList: IAllPokemonsResults[];
}

export interface IPokemonListAction {
  type: string;
  payload: IAllPokemonsResults[];
}
