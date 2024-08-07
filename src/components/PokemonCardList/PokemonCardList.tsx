import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import usePokemon from "../../hooks/usePokemon";
import PokemonCard from "../PokemonCard/PokemonCard";
import { useSelector } from "react-redux";
import { IPokemonInitialStates } from "../../utils/interfaces/Reducers/PokemonList";

const PokemonCardList: React.FC = () => {
  const { t } = useTranslation();
  const pokemonsCardsList = useSelector(
    (state: { pokemons: IPokemonInitialStates }) =>
      state.pokemons.pokemonsCardsList
  );
  const { getPokemons } = usePokemon();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchAllPokemonsData = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const fromSearchReset = false;
      await getPokemons(fromSearchReset);
    } catch (error) {
      console.error("Failed to fetch Pokémon data:", error);
    } finally {
      setIsLoading(false);
    }
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "75%",
        }}
      >
        {pokemonsCardsList?.results && (
          <Box sx={{ flexGrow: 1, marginTop: "20px" }}>
            <Grid
              container
              spacing={{
                xs: 12,
                sm: 12,
                md: 12,
                lg: 2,
                xl: 2,
              }}
              columns={{ xs: 2, sm: 12, md: 12, xl: 12, lg: 12 }}
            >
              {pokemonsCardsList?.results.map((pokemon, index) => (
                <Grid
                  item
                  xs={1}
                  sm={4}
                  md={3}
                  lg={
                    pokemonsCardsList?.results.length < 4
                      ? 12 / pokemonsCardsList?.results.length
                      : 3
                  }
                  xl={
                    pokemonsCardsList?.results.length < 4
                      ? 12 / pokemonsCardsList?.results.length
                      : 3
                  }
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: {
                      xs: 0,
                      sm: 0,
                      md: 0,
                      lg: "100px",
                      xl: "100px",
                    },
                  }}
                >
                  <PokemonCard pokemon={pokemon} />
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
              marginBottom: "20px",
              marginTop: "20px",
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
            <CircularProgress
              sx={{
                color: "#726B8F",
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PokemonCardList;
