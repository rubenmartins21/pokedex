import { IRegionColor } from "./interfaces/Locations/Region";
import { ITypeColor } from "./interfaces/Pokemon/Type";

export const typesColors: ITypeColor[] = [
  {
    id: 1,
    name: "normal",
    translation_pt: "normal",
    color: "#AEA770",
  },
  {
    id: 2,
    name: "fighting",
    translation_pt: "lutador",
    color: "#D9002C",
  },
  {
    id: 3,
    name: "flying",
    translation_pt: "voador",
    color: "#B28EEC",
  },
  {
    id: 4,
    name: "poison",
    translation_pt: "veneno",
    color: "#B467D8",
  },
  {
    id: 5,
    name: "ground",
    translation_pt: "terra",

    color: "#EBC062",
  },
  {
    id: 6,
    name: "rock",
    translation_pt: "pedra",
    color: "#755F23",
  },
  {
    id: 7,
    name: "bug",
    translation_pt: "inseto",
    color: "#A7B730",
  },
  {
    id: 8,
    name: "ghost",
    translation_pt: "fantasma",
    color: "#75558F",
  },
  {
    id: 9,
    name: "steel",
    translation_pt: "ferro",
    color: "#BCB8CC",
  },
  {
    id: 10,
    name: "fire",
    translation_pt: "fogo",
    color: "#F28557",
  },
  {
    id: 11,
    name: "water",
    translation_pt: "água",
    color: "#5191BF",
  },
  {
    id: 12,
    name: "grass",
    translation_pt: "grama",
    color: "#99D867",
  },
  {
    id: 13,
    name: "electric",
    translation_pt: "elétrico",
    color: "#FFCF30",
  },
  {
    id: 14,
    name: "psychic",
    translation_pt: "psíquico",
    color: "#FF4B77",
  },
  {
    id: 15,
    name: "ice",
    translation_pt: "gelo",
    color: "#80DAD8",
  },
  {
    id: 16,
    name: "dragon",
    translation_pt: "dragão",
    color: "#7736F9",
  },
  {
    id: 17,
    name: "dark",
    translation_pt: "sombrio",
    color: "#787878",
  },
  {
    id: 18,
    name: "fairy",
    translation_pt: "fada",
    color: "#FF8F9F",
  },
  {
    id: 19,
    name: "stellar",
    translation_pt: "estrelar",
    color: "none",
  },
  {
    id: 10001,
    name: "unknown",
    translation_pt: "desconhecido",
    color: "none",
  },
  {
    id: 10002,
    name: "shadow",
    translation_pt: "sombrio",
    color: "none",
  },
];

export const regionsColors: IRegionColor[] = [
  {
    id: 1,
    name: "kanto",
    color: "#63BD31",
    index: {
      firstPokemonId: 1,
      lastPokemonId: 151,
    },
  },

  {
    id: 2,
    name: "johto",
    color: "#D1C130",
    index: {
      firstPokemonId: 152,
      lastPokemonId: 251,
    },
  },
  {
    id: 3,
    name: "hoenn",
    color: "#4ABCA2",
    index: {
      firstPokemonId: 252,
      lastPokemonId: 386,
    },
  },
  {
    id: 4,
    name: "sinnoh",
    color: "#6C4D6B",
    index: {
      firstPokemonId: 387,
      lastPokemonId: 493,
    },
  },
  {
    id: 5,
    name: "unova",
    color: "#50ADCD",
    index: {
      firstPokemonId: 494,
      lastPokemonId: 649,
    },
  },
  {
    id: 6,
    name: "kalos",
    color: "#FFCF30",
    index: {
      firstPokemonId: 650,
      lastPokemonId: 721,
    },
  },
  {
    id: 7,
    name: "alola",
    color: "#E8553D",
    index: {
      firstPokemonId: 722,
      lastPokemonId: 807,
    },
  },
  {
    id: 8,
    name: "galar",
    color: "#BE3290",
    index: {
      firstPokemonId: 808,
      lastPokemonId: 898,
    },
  },
  {
    id: 9,
    name: "hisui",
    color: "#EBC062",
    index: {
      firstPokemonId: 899,
      lastPokemonId: 905,
    },
  },
  {
    id: 10,
    name: "paldea",
    color: "#7736F9",
    index: {
      firstPokemonId: 906,
      lastPokemonId: 1025,
    },
  },
];
