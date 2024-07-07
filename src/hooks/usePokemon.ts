import { useState } from "react";
import axiosInstance from "../utils/api/axiosInstance";
import { AllPokemonsProps } from "../utils/interfaces";

const usePokemon = () => {
  const [allPokemons, setAllPokemons] = useState<AllPokemonsProps>();

  const getAllPokemons = async () => {
    try {
      let apiUrl = "/pokemon/";

      if (allPokemons && allPokemons.next) {
        console.log("hello");
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
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getAllPokemons,
    allPokemons,
    setAllPokemons,
  };
};

export default usePokemon;
