import { Grid, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePokemon from "../../hooks/usePokemon";
import { IPokemon } from "../../utils/interfaces/Pokemon/Pokemon";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

const PokemonCarousel: React.FC = () => {
  const { id } = useParams();

  const { getNextPrevPokemon, numberOfDigits } = usePokemon();

  const navigate = useNavigate();

  const [nextPokemonData, setNextPokemonData] = useState<IPokemon>();
  const [prevPokemonData, setPrevPokemonData] = useState<IPokemon>();

  const handleButtonClick = (position: string) => {
    if (position === "next" && nextPokemonData) {
      navigate(
        `/pokemon-details/${nextPokemonData.name}/${nextPokemonData.id}`
      );
    }

    if (position === "prev" && prevPokemonData) {
      navigate(
        `/pokemon-details/${prevPokemonData.name}/${prevPokemonData.id}`
      );
    }
  };

  useEffect(() => {
    if (id) {
      getNextPrevPokemon(id)
        .then((result) => {
          if (result) {
            const { nextPokemon, prevPokemon } = result;
            setNextPokemonData(nextPokemon);
            setPrevPokemonData(prevPokemon);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch Pokémon:", error.message);
        });
    }
  }, [id]);

  return (
    <Grid
      container
      spacing={3}
      columns={12}
      justifyContent="center"
      alignItems="center"
      sx={{
        marginTop: "10px",
      }}
    >
      <Grid
        item
        xs={nextPokemonData ? 6 : 12}
        display={prevPokemonData ? "flex" : "none"}
        justifyContent="left"
        alignItems="center"
      >
        <IconButton
          aria-label="go-left"
          size="medium"
          sx={{
            backgroundColor: "#726B8F",
            marginLeft: "20px",
            "&:hover": {
              backgroundColor: "#726B8F",
            },
          }}
          onClick={() => handleButtonClick("prev")}
        >
          <KeyboardArrowLeft
            fontSize="inherit"
            sx={{
              color: "#ffffff",
            }}
          />
        </IconButton>

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
            marginLeft: "10px",
            textTransform: "capitalize",
          }}
        >
          {numberOfDigits(prevPokemonData?.id)} {prevPokemonData?.name}
        </Typography>
      </Grid>

      <Grid
        item
        xs={prevPokemonData ? 6 : 12}
        display={nextPokemonData ? "flex" : "none"}
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
          {nextPokemonData?.name} {numberOfDigits(nextPokemonData?.id)}
        </Typography>

        <IconButton
          aria-label="go-right"
          size="medium"
          sx={{
            backgroundColor: "#726B8F",
            marginRight: "20px",
            "&:hover": {
              backgroundColor: "#726B8F",
            },
          }}
          onClick={() => handleButtonClick("next")}
        >
          <KeyboardArrowRight
            fontSize="inherit"
            sx={{
              color: "#ffffff",
            }}
          />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default PokemonCarousel;
