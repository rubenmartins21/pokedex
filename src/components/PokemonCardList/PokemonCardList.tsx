import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import usePokemon from "../../hooks/usePokemon";
import PokemonCard from "../PokemonCard/PokemonCard";

const PokemonCardList: React.FC = () => {
  const { t } = useTranslation();

  const { getAllPokemons, pokemonsDetails } = usePokemon();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchAllPokemonsData = async () => {
    if (isLoading) return;

    setIsLoading(true);

    getAllPokemons();

    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchAllPokemonsData();
  }, []);

  const handleLoadClick = async () => {
    fetchAllPokemonsData();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {pokemonsDetails &&
        pokemonsDetails.map((item) => <PokemonCard pokemon={item} />)}
      {!isLoading && (
        <Button
          variant="outlined"
          sx={{
            width: "281px",
            height: "51",
            borderRadius: "12px",
            fontFamily: "Istok Web",
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "22px",
            lineHeight: "32px",
            display: "flex",
            alignItems: "center",
            color: "#726B8F",
            textTransform: "none",
            border: "2px solid #726B8F",
            "&:hover": {
              backgroundColor: "#726B8F",
              border: "2px solid #726B8F",
              boxShadow: "none",
              color: "white",
            },
          }}
          onClick={() => handleLoadClick()}
        >
          {t("homePage.loadPokemons")}
        </Button>
      )}

      {isLoading && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default PokemonCardList;
