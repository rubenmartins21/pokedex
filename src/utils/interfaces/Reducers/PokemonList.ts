import { IAllPokemons, IPokemon } from "../Pokemon/Pokemon";

export interface IPokemonInitialStates {
  pokemonsCardsList: IAllPokemons | null;
  allPokemons: IAllPokemons | null;
  searchValue: string;
  isLoading: boolean;
}

export interface IPokemonListAction {
  type: string;
  pokemonsCardsList: IAllPokemons | null;
  allPokemons: IAllPokemons | null;
  searchValue: string;
  isLoading: boolean;
}
