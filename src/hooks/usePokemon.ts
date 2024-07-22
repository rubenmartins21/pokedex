import { useState } from "react";
import axiosInstance from "../utils/api/axiosInstance";
import {
  IAllPokemons,
  IAllPokemonsResults,
  IPokemon,
} from "../utils/interfaces/Pokemon/Pokemon";
import { typesColors } from "../utils/constants";
import axios from "axios";
import ColorThief, { Color } from "colorthief";
import { IPokemonPaletteColor } from "../utils/interfaces/Pokemon/PokemonColor";

const usePokemon = () => {
  const [allPokemons, setAllPokemons] = useState<IAllPokemons>();

  const [pokemonsDetails, setPokemonsDetails] = useState<IPokemon[]>([]);
  const [pokemonPaletteColor, setPokemonPaletteColor] = useState<
    IPokemonPaletteColor[]
  >([]);

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

    const pokemonImage =
      response.data.sprites.other["official-artwork"].front_default;
    const pokemonId = response.data.id;

    pokemonColorPaletteExtractor(pokemonId, pokemonImage);

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

  const componentToHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  };

  const pokemonColorPaletteExtractor = (
    pokemonId: number,
    imageUrl: string
  ) => {
    const colorThief = new ColorThief();

    axios
      .get(imageUrl, { responseType: "blob" })
      .then((response) => {
        const img = new Image();
        img.src = URL.createObjectURL(response.data);
        img.onload = () => {
          const palette = colorThief.getPalette(img);
          const reorderPalette = sortColorsByLikeness(palette);
          // console.log(reorderPalette);

          const hexPalette: string[] = [];
          reorderPalette.map((item) => {
            hexPalette.push(rgbToHex(item[0], item[1], item[2]));
          });

          const newPaletteData = pokemonPaletteColor;

          newPaletteData.push({ id: pokemonId, paletteColor: hexPalette });
          setPokemonPaletteColor(newPaletteData);
        };
      })
      .catch((error) => console.error("Error fetching the image:", error));
  };

  const getPokemonPaletteColor = (id: number) => {
    const findPalette = pokemonPaletteColor.find((item) => item.id === id);

    return findPalette?.paletteColor;
  };

  const sortColorsByLikeness = (colors: Color[]) => {
    return colors.sort((a: Color, b: Color) => {
      // Convert hexadecimal colors to RGB values
      const rgbA = a;
      const rgbB = b;

      // Calculate the difference between the colors
      const diffR = Math.abs(rgbA[0] - rgbB[0]);
      const diffG = Math.abs(rgbA[1] - rgbB[1]);
      const diffB = Math.abs(rgbA[2] - rgbB[2]);

      // Calculate the total difference
      const totalDiff = diffR + diffG + diffB;

      // Compare the colors based on their total difference
      return totalDiff;
    });
  };

  // function hexToRgb = (hex) =>{
  //   // Remove the '#' symbol if present
  //   hex = hex.replace('#', '');

  //   // Convert hexadecimal to decimal
  //   const r = parseInt(hex.substring(0, 2), 16);
  //   const g = parseInt(hex.substring(2, 4), 16);
  //   const b = parseInt(hex.substring(4, 6), 16);

  //   return { r, g, b };
  // }

  return {
    getAllPokemons,
    allPokemons,
    setAllPokemons,
    getAllPokemonsDetails,
    pokemonsDetails,
    getPokemonsDetails,
    getTypeColor,
    getTranslatedType,
    getPokemonPaletteColor,
  };
};

export default usePokemon;
