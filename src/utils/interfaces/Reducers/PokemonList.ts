import { IAllPokemonsResults } from "../Pokemon/Pokemon";

export interface IPokemonInitialStates {
  pokemonsList: IAllPokemonsResults[];
}

export interface IPokemonListAction {
  type: string;
  pokemonsList: IAllPokemonsResults[];
}
