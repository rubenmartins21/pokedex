import React, { useEffect, useState } from "react";
import {
  IAllPokemonsResults,
  IPokemon,
} from "../../utils/interfaces/Pokemon/Pokemon";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import usePokemon from "../../hooks/usePokemon";

export interface PokemonCardProps {
  pokemon: IAllPokemonsResults;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const { getPokemonsDetails, getTypeColor } = usePokemon();
  const [pokemonData, setPokemonData] = useState<IPokemon>();

  const fecthData = async () => {
    const response = await getPokemonsDetails(pokemon.url);

    setPokemonData(response);
  };

  useEffect(() => {
    if (pokemon) {
      fecthData();
    }
  }, [pokemon]);

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
            width: "197.58px",
            height: "268.64px",
          }}
        >
          <Box
            sx={{
              width: "197.58px",
              height: "184.51px",
              borderRadius: "12px",
              background: "#BFDFCC",
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
                width: "139.47px",
                height: "130.25px",
              }}
            />
          </Box>

          <Box>
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
          <Box>
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
              {pokemonData.name}
            </Typography>
          </Box>
          <Grid container spacing={2} columns={{ xs: 1, sm: 2, md: 2 }}>
            {pokemonData.types.map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box
                  sx={{
                    background: `${getTypeColor(item.type.name)}`,
                    width: "64.46px",
                    height: "15.64px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
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
                    {item.type.name}
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
