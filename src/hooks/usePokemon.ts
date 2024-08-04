import { useCallback, useState } from "react";
import axiosInstance from "../utils/api/axiosInstance";
import { IAllPokemonsResults } from "../utils/interfaces/Pokemon/Pokemon";
import { typesColors } from "../utils/constants";
import axios from "axios";
import ColorThief, { Color } from "colorthief";
import { IPokemonPaletteColor } from "../utils/interfaces/Pokemon/PokemonColor";

import {
  updatePokemonCardsList,
  updateAllPokemonsList,
  updatePokemonsDetails,
} from "../store/actionCreators";
import { useDispatch } from "react-redux";

import { IPokemonInitialStates } from "../utils/interfaces/Reducers/PokemonList";
import { useSelector } from "react-redux";

const usePokemon = () => {
  const allPokemons = useSelector(
    (state: { pokemons: IPokemonInitialStates }) => state.pokemons.allPokemons
  );

  const pokemonsCardsList = useSelector(
    (state: { pokemons: IPokemonInitialStates }) =>
      state.pokemons.pokemonsCardsList
  );

  const searchValue = useSelector(
    (state: { pokemons: IPokemonInitialStates }) => state.pokemons.searchValue
  );

  const pokemonsDetails = useSelector(
    (state: { pokemons: IPokemonInitialStates }) =>
      state.pokemons.pokemonsDetails
  );

  const [pokemonPaletteColor, setPokemonPaletteColor] = useState<
    IPokemonPaletteColor[]
  >([]);

  const dispatch = useDispatch();

  const getAllPokemons = async () => {
    try {
      const response = await axiosInstance.get("/pokemon?limit=100000");

      const { count, next, previous, results } = response.data;

      const updatedResults = allPokemons
        ? [...allPokemons.results, ...results]
        : results;

      dispatch(
        updateAllPokemonsList({
          count,
          next,
          previous,
          results: updatedResults,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getPokemons = async (fromSearchReset: boolean) => {
    try {
      let apiUrl = "/pokemon/";

      if (pokemonsCardsList && pokemonsCardsList.next) {
        const nextUrlSegment = pokemonsCardsList.next.split("/")[6];
        apiUrl = `/pokemon/${nextUrlSegment}/`;
      }

      const response = await axiosInstance.get(apiUrl);

      const { count, next, previous, results } = response.data;

      let updatedResults;

      if (fromSearchReset) {
        updatedResults = results;
      }
      if (!fromSearchReset) {
        updatedResults = pokemonsCardsList
          ? [...pokemonsCardsList.results, ...results]
          : results;
      }

      dispatch(
        updatePokemonCardsList({
          count,
          next,
          previous,
          results: updatedResults,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getAllPokemonsDetails = async (results: IAllPokemonsResults[]) => {
    results.map(async (item) => {
      const response = await axiosInstance.get(item.url);

      dispatch(updatePokemonsDetails(response.data));
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
        const hexDominantColor = rgbToHex(
          dominantColor[0],
          dominantColor[1],
          dominantColor[2]
        );
        const sortedPalette = sortColorsByLightness(palette);
        const hexPalette = sortedPalette.map(([r, g, b]) => rgbToHex(r, g, b));

        setPokemonPaletteColor((prevPalette) => [
          ...prevPalette,
          {
            id: pokemonId,
            paletteColor: hexPalette,
            dominantColor: hexDominantColor,
          },
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

  const getPokemonDominantColor = (id: number) => {
    const findPalette = pokemonPaletteColor.find((item) => item.id === id);

    return findPalette?.dominantColor;
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

  const hexToRgb = (hex: string) => {
    let r = 0,
      g = 0,
      b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return { r, g, b };
  };
  const calculateLuminance = (r: number, g: number, b: number) => {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const checkBackgroundBrightness = (hex: string) => {
    const { r, g, b } = hexToRgb(hex);
    const luminance = calculateLuminance(r, g, b);
    return luminance > 0.5 ? true : false;
  };

  const onSearch = async () => {
    const searchResult = allPokemons?.results.filter((d) =>
      d.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    const data = {
      count: 1302,
      next: null,
      previous: null,
      results: searchResult || [],
    };

    if (searchValue.length > 0 && data) {
      dispatch(updatePokemonCardsList(data));
    }

    if (searchValue.length === 0) {
      await getPokemons(true);
    }
  };
  return {
    getAllPokemons,
    getPokemons,
    getAllPokemonsDetails,
    getPokemonsDetails,
    getTypeColor,
    getTranslatedType,
    getPokemonPaletteColor,
    getPokemonDominantColor,
    checkBackgroundBrightness,
    onSearch,
  };
};

export default usePokemon;
