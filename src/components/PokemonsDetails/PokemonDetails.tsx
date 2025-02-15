import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PokemonPageCard from "../PokemonPageCard/PokemonPageCard";
import usePokemon from "../../hooks/usePokemon";
import { IPokemon } from "../../utils/interfaces/Pokemon/Pokemon";

const PokemonDetails: React.FC = () => {
  const { id } = useParams();

  const [pokemonData, setPokemonData] = useState<IPokemon>();

  const [dominantColor, setDominantColor] = useState<string>();

  const {
    getPokemonById,
    pokemonColorPaletteExtractor,
    pokemonPaletteColor,
    getPokemonDominantColor,
  } = usePokemon();

  const fecthData = async (id: string) => {
    const response = await getPokemonById(id);

    pokemonColorPaletteExtractor(
      Number(id),
      response.sprites.other["official-artwork"].front_default
    );
    setPokemonData(response);
  };

  useEffect(() => {
    if (pokemonPaletteColor) {
      const dominantColorResult = getPokemonDominantColor(Number(id));
      setDominantColor(dominantColorResult);
    }
  }, [pokemonPaletteColor]);

  useEffect(() => {
    if (id) {
      fecthData(id);
    }
  }, [id]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        columns={12}
        justifyContent="center"
        alignItems="center"
        sx={{
          marginTop: "3rem",
          width: "90%",
        }}
      >
        <Grid
          item
          xs={6}
          display={"flex"}
          justifyContent="left"
          alignItems="center"
        >
          {pokemonData && dominantColor && (
            <PokemonPageCard
              pokemonData={pokemonData}
              dominantColor={dominantColor}
            />
          )}
        </Grid>

        <Grid
          item
          xs={6}
          display={"flex"}
          justifyContent="right"
          alignItems="center"
        >
          <Typography
            sx={{
              fontFamily: "'Istok Web', sans-serif",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "22px",
              lineHeight: "26px",
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              color: "#3A2F66",
              marginRight: "10px",
              textTransform: "capitalize",
            }}
          >
            right
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PokemonDetails;
