import React, { useEffect, useState } from "react";
import {
  IAllPokemonsResults,
  IPokemon,
} from "../../utils/interfaces/Pokemon/Pokemon";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import usePokemon from "../../hooks/usePokemon";
import { useTranslation } from "react-i18next";

export interface PokemonCardProps {
  pokemon: IAllPokemonsResults;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const {
    getPokemonsDetails,
    getTypeColor,
    getTranslatedType,
    getPokemonPaletteColor,
    getPokemonDominantColor,
  } = usePokemon();

  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const [pokemonData, setPokemonData] = useState<IPokemon>();

  const [cardBackground, setCardBackground] = useState<string>("#BFDFCC");

  const fecthData = async () => {
    const response = await getPokemonsDetails(pokemon.url);

    setPokemonData(response);
  };

  useEffect(() => {
    if (pokemon) {
      fecthData();
    }
  }, [pokemon]);

  useEffect(() => {
    if (pokemonData) {
      const dominantColor = getPokemonDominantColor(pokemonData.id);
      if (dominantColor) {
        setCardBackground(dominantColor);
      }
    }
  }, [pokemonData, getPokemonPaletteColor]);

  const numberOfDigits = (n: number) => {
    let result = 0;
    const id = n;

    while (n > 0) {
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
  return (
    <>
      {pokemonData && (
        <Box
          sx={{
            width: {
              xs: "170px",
              sm: "170px",
              md: "170px",
              lg: "197.58px",
              xl: "197.58px",
            },
            height: "268.64px",
            marginBottom: "40px",
          }}
        >
          <Box
            sx={{
              width: {
                xs: "170px",
                sm: "170px",
                md: "170px",
                lg: "197.58px",
                xl: "197.58px",
              },
              height: "194.51px",
              borderRadius: "12px",
              background: cardBackground,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="pokemon logo"
              src={pokemonData.sprites.other["official-artwork"].front_default}
              sx={{
                borderRadius: "0",
                alignItems: "center",
                "& img": {
                  objectFit: {
                    xs: "fill",
                    sm: "fill",
                    md: "fill",
                    lg: "cover",
                    xl: "cover",
                  },
                },

                width: {
                  xs: "80%",
                  sm: "80%",
                  md: "80%",
                  lg: "auto",
                  xl: "auto",
                },
                height: {
                  xs: "80%",
                  sm: "80%",
                  md: "80%",
                  lg: "90%",
                  xl: "90%",
                },
              }}
            />
          </Box>

          <Box sx={{ marginTop: "10px" }}>
            <Typography
              sx={{
                fontFamily: "Istok Web",
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "16px",
                lineheight: "23px",

                color: "rgba(58, 47, 102, 0.65)",
              }}
            >
              n {numberOfDigits(pokemonData.id)}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography
              sx={{
                fontFamily: "Istok Web",
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "22px",
                lineHeight: "32px",
                color: "#3A2F66",
              }}
            >
              {pokemonData.name.charAt(0).toUpperCase() +
                pokemonData.name.slice(1)}
            </Typography>
          </Box>
          <Grid
            container
            spacing={{
              xs: 0,
              sm: 0,
              md: 0,
              lg: 9,
              xl: 9,
            }}
            direction="row"
          >
            {pokemonData.types.map((item, index) => (
              <Grid item xs={6} sm={3} md={2} key={index}>
                <Box
                  sx={{
                    background: `${getTypeColor(item.type.name)}`,
                    width: "64.46px",
                    height: "20.64px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Istok Web",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "12px",
                      lineHeight: "17px",
                      textAlign: "center",
                      color: "#fff",
                    }}
                  >
                    {getTranslatedType(item.type.name, currentLanguage)}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default PokemonCard;
