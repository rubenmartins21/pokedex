import React, { useEffect, useState } from "react";
import {
  IAllPokemonsResults,
  IPokemon,
} from "../../utils/interfaces/Pokemon/Pokemon";
import { Avatar, Box, CircularProgress, Grid, Typography } from "@mui/material";
import usePokemon from "../../hooks/usePokemon";
import { useTranslation } from "react-i18next";

export interface PokemonCardProps {
  pokemon: IAllPokemonsResults;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const {
    getPokemonsDetails,
    getTypeConstant,
    getTranslatedType,
    getPokemonPaletteColor,
    getPokemonDominantColor,
  } = usePokemon();

  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const [pokemonData, setPokemonData] = useState<IPokemon>();

  const [cardBackground, setCardBackground] = useState<string>("#BFDFCC");

  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      if (!pokemonData) return;

      const loadImg = new Image();
      loadImg.src = pokemonData.sprites.other["official-artwork"].front_default;

      try {
        await new Promise((resolve) => (loadImg.onload = resolve));
        setImgLoaded(true);
      } catch (err) {
        console.error("Failed to load image", err);
      }
    };

    loadImage();
  }, [pokemonData]);

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
            height: {
              xs: "260px",
              sm: "260px",
              md: "260px",
              lg: "194.51px",
              xl: "194.51px",
            },
            marginBottom: {
              xs: "0px",
              sm: "0px",
              md: "0px",
              lg: "40px",
              xl: "40px",
            },
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
              height: {
                xs: "260px",
                sm: "260px",
                md: "260px",
                lg: "194.51px",
                xl: "194.51px",
              },
              borderRadius: "12px",
              background: cardBackground,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: {
                xs: "column",
                sm: "column",
                md: "column",
                lg: "row",
                xl: "row",
              },
            }}
          >
            {!imgLoaded && (
              <Box
                sx={{
                  width: "100%",
                  marginLeft: "20%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress
                  sx={{
                    color: "#726B8F",
                  }}
                />
              </Box>
            )}

            {imgLoaded && (
              <Avatar
                alt="pokemon logo"
                src={
                  pokemonData.sprites.other["official-artwork"].front_default
                }
                sx={{
                  borderRadius: "0",
                  alignItems: "center",
                  "& img": {
                    objectFit: {
                      xs: "contain",
                      sm: "contain",
                      md: "contain",
                      lg: "fill",
                      xl: "fill",
                    },
                  },

                  width: {
                    xs: "100%",
                    sm: "100%",
                    md: "100%",
                    lg: "100%",
                    xl: "100%",
                  },
                  height: {
                    xs: "50%",
                    sm: "50%",
                    md: "50%",
                    lg: "100%",
                    xl: "100%",
                  },
                }}
              />
            )}

            <Box
              sx={{
                marginTop: "2px",
                display: {
                  xs: "block",
                  sm: "block",
                  md: "block",
                  lg: "none",
                  xl: "none",
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Istok Web",
                  fontStyle: "normal",
                  fontWeight: 700,
                  fontSize: "16px",
                  lineheight: "23px",

                  color: "#FFFFFF",
                }}
              >
                n {numberOfDigits(pokemonData.id)}
              </Typography>
            </Box>

            <Box
              sx={{
                marginBottom: "5px",
                display: {
                  xs: "block",
                  sm: "block",
                  md: "block",
                  lg: "none",
                  xl: "none",
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Istok Web",
                  fontStyle: "normal",
                  fontWeight: 700,
                  fontSize: "22px",
                  lineHeight: "32px",
                  color: "#FFFFFF",
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
              sx={{
                width: {
                  xs: "90%",
                  sm: "100%",
                  md: "100%",
                  lg: "100%",
                  xl: "100%",
                },
              }}
            >
              {pokemonData.types.map((item, index) => (
                <Grid
                  item
                  xs={pokemonData.types.length === 1 ? 12 : 6}
                  sm={pokemonData.types.length === 1 ? 12 : 6}
                  md={pokemonData.types.length === 1 ? 12 : 6}
                  key={index}
                  sx={{
                    display: {
                      xs: "flex",
                      sm: "flex",
                      md: "flex",
                      lg: "none",
                      xl: "none",
                    },
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      background: `${getTypeConstant(item.type.name)?.color}`,
                      width: "64.46px",
                      height: "20.64px",
                      display: {
                        xs: "flex",
                        sm: "flex",
                        md: "flex",
                        lg: "none",
                        xl: "none",
                      },
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

          <Box
            sx={{
              marginTop: "10px",
              display: {
                xs: "none",
                sm: "none",
                md: "none",
                lg: "block",
                xl: "block",
              },
            }}
          >
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
          <Box
            sx={{
              marginBottom: "10px",
              display: {
                xs: "none",
                sm: "none",
                md: "none",
                lg: "block",
                xl: "block",
              },
            }}
          >
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
                    background: `${getTypeConstant(item.type.name)?.color}`,
                    width: "64.46px",
                    height: "20.64px",
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "none",
                      lg: "flex",
                      xl: "flex",
                    },
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
