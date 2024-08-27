import { IFilter } from "../Filter/Filter";
import { IAllPokemons } from "../Pokemon/Pokemon";

export interface IPokemonInitialStates {
  pokemonsCardsList: IAllPokemons | null;
  allPokemons: IAllPokemons | null;
  searchValue: string;
  isLoading: boolean;
  filter: IFilter;
}

export interface IPokemonListAction {
  type: string;
  pokemonsCardsList: IAllPokemons | null;
  allPokemons: IAllPokemons | null;
  searchValue: string;
  isLoading: boolean;
  filter: IFilter;
}
