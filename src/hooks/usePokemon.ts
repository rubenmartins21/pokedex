import { useState } from "react";
import axiosInstance from "../utils/api/axiosInstance";
import {
  IAllPokemons,
  IAllPokemonsResults,
  IPokemon,
} from "../utils/interfaces/Pokemon/Pokemon";

const usePokemon = () => {
  const [allPokemons, setAllPokemons] = useState<IAllPokemons>();

  const [pokemonsDetails, setPokemonsDetails] = useState<IPokemon[]>();

  const getAllPokemons = async () => {
    try {
      let apiUrl = "/pokemon/";

      if (allPokemons && allPokemons.next) {
        const nextUrlSegment = allPokemons.next.split("/")[6];
        apiUrl = `/pokemon/${nextUrlSegment}/`;
      }

      const response = await axiosInstance.get(apiUrl);

      const { count, next, previous, results } = response.data;

      const updatedResults = allPokemons
        ? [...allPokemons.results, ...results]
        : results;

      setAllPokemons({
        count,
        next,
        previous,
        results: updatedResults,
      });

      // await getAllPokemonsDetails(updatedResults);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllPokemonsDetails = async (results: IAllPokemonsResults[]) => {
    let newDetails = [];
    results.map(async (item) => {
      const response = await axiosInstance.get(item.url);

      newDetails.push(response.data);
      setPokemonsDetails(newDetails);
    });
  };

  const getPokemonsDetails = async (pokemonUrl: string) => {
    const response = await axiosInstance.get(pokemonUrl);

    return response.data;
  };

  return {
    getAllPokemons,
    allPokemons,
    setAllPokemons,
    getAllPokemonsDetails,
    pokemonsDetails,
    getPokemonsDetails,
  };
};

export default usePokemon;
