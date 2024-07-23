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

  const pokemonColorPaletteExtractor = async (
    pokemonId: number,
    imageUrl: string
  ) => {
    const colorThief = new ColorThief();

    try {
      const response = await axios.get(imageUrl, { responseType: "blob" });
      const img = new Image();
      img.src = URL.createObjectURL(response.data);

      img.onload = () => {
        const palette = colorThief.getPalette(img);
        const dominantColor = colorThief.getColor(img);
        console.log(dominantColor);
        const sortedPalette = sortColorsByLightness(palette);
        const hexPalette = sortedPalette.map(([r, g, b]) => rgbToHex(r, g, b));

        setPokemonPaletteColor((prevPalette) => [
          ...prevPalette,
          { id: pokemonId, paletteColor: hexPalette },
        ]);
      };
    } catch (error) {
      console.error("Error fetching the image:", error);
    }
  };

  const getPokemonPaletteColor = (id: number) => {
    const findPalette = pokemonPaletteColor.find((item) => item.id === id);

    return findPalette?.paletteColor;
  };

  const rgbToHsl = ({ r, g, b }: { r: number; g: number; b: number }) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = (max + min) / 2;
    let s = (max + min) / 2;
    const l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return { h, s, l };
  };

  const sortColorsByLightness = (rgbColors: Color[]) => {
    const colorsWithLightness = rgbColors.map(([r, g, b]) => {
      const hsl = rgbToHsl({ r, g, b });
      return { rgb: [r, g, b], lightness: hsl.l };
    });

    colorsWithLightness.sort((a, b) => b.lightness - a.lightness);

    return colorsWithLightness.map((color) => color.rgb);
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
    getPokemonPaletteColor,
  };
};

export default usePokemon;
