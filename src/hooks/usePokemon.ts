import { useState } from "react";
import axiosInstance from "../utils/api/axiosInstance";
import {
  IAllPokemons,
  IAllPokemonsResults,
  IPokemon,
} from "../utils/interfaces/Pokemon/Pokemon";
import { typesColors } from "../utils/constants";
import axios from "axios";
import ColorThief from "colorthief";

const usePokemon = () => {
  const [allPokemons, setAllPokemons] = useState<IAllPokemons>();

  const [pokemonsDetails, setPokemonsDetails] = useState<IPokemon[]>([]);

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
    } catch (error) {
      console.error(error);
    }
  };

  const getAllPokemonsDetails = async (results: IAllPokemonsResults[]) => {
    const newDetails = pokemonsDetails;
    results.map(async (item) => {
      const response = await axiosInstance.get(item.url);

      newDetails.push(response.data);
      setPokemonsDetails(newDetails);
    });
  };

  const getPokemonsDetails = async (pokemonUrl: string) => {
    const response = await axiosInstance.get(pokemonUrl);

    pokemonColorPaletteExtractor(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/40.png"
    );

    return response.data;
  };

  const getTypeColor = (type: string) => {
    const typeData = typesColors.find((item) => item.name === type);

    return typeData?.color;
  };

  const getTranslatedType = (type: string, lang: string) => {
    const typeData = typesColors.find((item) => item.name === type);

    return lang === "en" ? typeData?.name : typeData?.translation_pt;
  };

  const pokemonColorPaletteExtractor = (imageUrl: string) => {
    const colorThief = new ColorThief();

    // Fetch the image using Axios
    axios
      .get(imageUrl, { responseType: "blob" })
      .then((response) => {
        const img = new Image();
        img.src = URL.createObjectURL(response.data);
        img.onload = () => {
          const palette = colorThief.getPalette(img); // Get a palette of 5 colors
          console.log("palete => ", palette);
        };
      })
      .catch((error) => console.error("Error fetching the image:", error));
  };

  return {
    getAllPokemons,
    allPokemons,
    setAllPokemons,
    getAllPokemonsDetails,
    pokemonsDetails,
    getPokemonsDetails,
    getTypeColor,
    getTranslatedType,
  };
};

export default usePokemon;
