import { useState } from "react";
import axiosInstance from "../utils/api/axiosInstance";
import { regionsColors, typesColors } from "../utils/constants";
import axios from "axios";
import ColorThief, { Color } from "colorthief";
import { IPokemonPaletteColor } from "../utils/interfaces/Pokemon/PokemonColor";

import {
  updatePokemonCardsList,
  updateAllPokemonsList,
  setIsLoading,
  setIsFiltering,
} from "../store/actionCreators";
import { useDispatch } from "react-redux";

import { IPokemonInitialStates } from "../utils/interfaces/Reducers/PokemonList";
import { useSelector } from "react-redux";
import { IApiResource } from "../utils/interfaces/Utility/ApiResourceList";
import { ITypePokemon } from "../utils/interfaces/Pokemon/Type";

const usePokemon = () => {
  const filter = useSelector(
    (state: { pokemons: IPokemonInitialStates }) => state.pokemons.filter
  );

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

      if (pokemonsCardsList && pokemonsCardsList.next && !fromSearchReset) {
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

  const getNextPrevPokemon = async (id: string) => {
    try {
      const numberID = Number(id);

      const nextPokemon = await getPokemonById((numberID + 1).toString());

      const prevPokemon = await getPokemonById((numberID - 1).toString());

      return { nextPokemon, prevPokemon };
    } catch (error) {
      console.error(error);
    }
  };

  const getPokemonsDetails = async (pokemonUrl: string) => {
    const response = await axiosInstance.get(pokemonUrl);

    const pokemonImage =
      response.data.sprites.other["official-artwork"].front_default;
    const pokemonId = response.data.id;

    pokemonColorPaletteExtractor(pokemonId, pokemonImage);

    return response.data;
  };

  const getTypeConstant = (type: string) => {
    const typeData = typesColors.find((item) => item.name === type);

    return typeData;
  };

  const getRegionConstant = (region: string) => {
    const regionData = regionsColors.find((item) => item.name === region);

    return regionData;
  };

  const getRegionColor = (region: string) => {
    const regionData = regionsColors.find((item) => item.name === region);

    return regionData?.color;
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

        return true;
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

  const onSearch = async (from: string) => {
    const isIdSearch = /^\d+$/.test(searchValue);

    let data;

    let filterData = {
      filterType: "search",
      pokemonsCount: 20,
    };

    if (filter && from === "load") {
      filterData = {
        filterType: "search",
        pokemonsCount: 20 + filter.pokemonsCount,
      };
    }

    dispatch(setIsFiltering(filterData));

    if (!isIdSearch) {
      const searchResult = allPokemons?.results.filter((d) =>
        d.name.toLowerCase().includes(searchValue.toLowerCase())
      );

      data = {
        count: 1302,
        next: null,
        previous: null,
        results: searchResult?.slice(0, filterData?.pokemonsCount) || [],
      };

      if (searchValue.length > 0 && data) {
        dispatch(updatePokemonCardsList(data));
      }
    }

    if (isIdSearch && searchValue.length > 0) {
      let id = searchValue;
      const regex = /^0+[1-9]\d*$/;
      if (regex.test(id)) {
        id = id.split("0").join("");
      }
      const findPokemon = await getPokemonById(id);

      const findPokemonResult = allPokemons?.results.filter(
        (d) => d.name.toLowerCase() === findPokemon.name.toLowerCase()
      );

      data = {
        count: 1302,
        next: null,
        previous: null,
        results: findPokemonResult?.slice(0, filterData?.pokemonsCount) || [],
      };

      dispatch(updatePokemonCardsList(data));
    }

    if (searchValue.length === 0) {
      await getPokemons(true);
    }
  };

  const getPokemonById = async (id: string) => {
    try {
      const response = await axiosInstance.get(`/pokemon/${id}/`);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPokemonsTypes = async () => {
    try {
      const response = await axiosInstance.get("/type/");

      const filtered = response.data.results.filter(
        (item: IApiResource) =>
          item.name !== "stellar" && item.name !== "unknown"
      );

      response.data.results = filtered;

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllRegions = async () => {
    try {
      const response = await axiosInstance.get("/region/");

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getRegion = async (name: string) => {
    try {
      const response = await axiosInstance.get(`/region/${name}`);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getPokemonsByTypeId = async (id: number) => {
    try {
      const response = await axiosInstance.get(`/type/${id}`);

      return response.data.pokemon;
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterRegionClick = async (name: string) => {
    try {
      dispatch(setIsLoading(true));
      const regionConstant = getRegionConstant(name);

      if (regionConstant) {
        const first = regionConstant.index.firstPokemonId - 1;
        const last = regionConstant.index.lastPokemonId;
        const pokemonsByRegion = allPokemons?.results.slice(first, last);

        if (pokemonsByRegion) {
          let regionResults;
          let filterData;

          if (!filter) {
            filterData = {
              filterType: name,
              pokemonsCount: 20,
            };

            regionResults = pokemonsByRegion.slice(0, 20);
          }

          if (filter) {
            filterData = {
              filterType: name,
              pokemonsCount:
                filter.filterType !== name ? 20 : filter.pokemonsCount + 20,
            };

            regionResults = pokemonsByRegion.slice(0, filterData.pokemonsCount);
          }
          if (filterData) {
            dispatch(setIsFiltering(filterData));
          }
          const data = {
            count: pokemonsByRegion.length,
            next: null,
            previous: null,
            results: regionResults || [],
          };

          if (data) {
            dispatch(updatePokemonCardsList(data));
            dispatch(setIsLoading(false));
          }

          if (filter?.filterType === name) {
            resetFilter();
          }
        }
      }
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  };

  const resetFilter = async () => {
    await getPokemons(true);

    const filterData = {
      filterType: "",
      pokemonsCount: 20,
    };
    dispatch(setIsFiltering(filterData));
  };

  const handleFilterTypeClick = async (name: string) => {
    dispatch(setIsLoading(true));
    const typeConstant = getTypeConstant(name);

    if (typeConstant) {
      const pokemonsByType = await getPokemonsByTypeId(typeConstant.id);

      let typeResults;

      let filterData;

      if (!filter) {
        filterData = {
          filterType: name,
          pokemonsCount: 20,
        };

        typeResults = pokemonsByType
          .slice(0, 20)
          .map((item: ITypePokemon) => item.pokemon);
      }

      if (filter) {
        filterData = {
          filterType: name,
          pokemonsCount:
            filter.filterType !== name ? 20 : filter.pokemonsCount + 20,
        };

        typeResults = pokemonsByType
          .slice(0, filterData.pokemonsCount)
          .map((item: ITypePokemon) => item.pokemon);
      }
      if (filterData) {
        dispatch(setIsFiltering(filterData));
      }

      const data = {
        count: pokemonsByType.length,
        next: null,
        previous: null,
        results: typeResults || [],
      };

      if (data) {
        dispatch(updatePokemonCardsList(data));
        dispatch(setIsLoading(false));
      }

      if (filter?.filterType === name) {
        resetFilter();
      }
    }
  };

  const numberOfDigits = (n: number | undefined) => {
    let result = 0;
    const id = n;

    while (n && n > 0) {
      n = Math.floor(n / 10);
      result++;
    }

    if (result === 1) {
      return `000${id}`;
    }

    if (result === 2) {
      return `00${id}`;
    }
    if (result === 3) {
      return `0${id}`;
    }

    if (result === 4) {
      return `${id}`;
    }
  };

  return {
    getAllPokemons,
    getPokemons,
    getPokemonsDetails,
    getTypeConstant,
    getRegionConstant,
    getTranslatedType,
    getPokemonPaletteColor,
    getPokemonDominantColor,
    checkBackgroundBrightness,
    onSearch,
    getPokemonById,
    getAllPokemonsTypes,
    getAllRegions,
    getRegionColor,
    getPokemonsByTypeId,
    handleFilterTypeClick,
    getRegion,
    handleFilterRegionClick,
    resetFilter,
    getNextPrevPokemon,
    numberOfDigits,
    pokemonColorPaletteExtractor,
    pokemonPaletteColor,
  };
};

export default usePokemon;
