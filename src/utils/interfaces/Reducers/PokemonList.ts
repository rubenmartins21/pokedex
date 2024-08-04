import { IAllPokemons, IPokemon } from "../Pokemon/Pokemon";

export interface IPokemonInitialStates {
  pokemonsCardsList: IAllPokemons | null;
  allPokemons: IAllPokemons | null;
  pokemonsDetails: IPokemon[] | null;
  searchValue: string;
}

export interface IPokemonListAction {
  type: string;
  pokemonsCardsList: IAllPokemons | null;
  allPokemons: IAllPokemons | null;
  pokemonsDetails: IPokemon[] | null;
  searchValue: string;
}
