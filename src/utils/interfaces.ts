export interface AllPokemonsResultsProps {
  name: string;
  url: string;
}
export interface AllPokemonsProps {
  count: number;
  next: string | null;
  previous: string | null;
  results: AllPokemonsResultsProps[];
}
