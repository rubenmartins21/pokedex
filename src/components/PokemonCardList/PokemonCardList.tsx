import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
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
      {pokemonsDetails && (
        <Box sx={{ flexGrow: 1, marginTop: "20px" }}>
          <Grid
            container
            // spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 2, md: 12 }}
          >
            {pokemonsDetails.map((item, index) => (
              <Grid
                xs={12}
                sm={3}
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <PokemonCard pokemon={item} key={index} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
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
