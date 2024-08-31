import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import usePokemon from "../../hooks/usePokemon";
import PokemonCard from "../PokemonCard/PokemonCard";
import { useSelector } from "react-redux";
import { IPokemonInitialStates } from "../../utils/interfaces/Reducers/PokemonList";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../../store/actionCreators";

const PokemonCardList: React.FC = () => {
  const { t } = useTranslation();

  const filter = useSelector(
    (state: { pokemons: IPokemonInitialStates }) => state.pokemons.filter
  );

  const pokemonsCardsList = useSelector(
    (state: { pokemons: IPokemonInitialStates }) =>
      state.pokemons.pokemonsCardsList
  );

  const isLoading = useSelector(
    (state: { pokemons: IPokemonInitialStates }) => state.pokemons.isLoading
  );

  const searchValue = useSelector(
    (state: { pokemons: IPokemonInitialStates }) => state.pokemons.searchValue
  );
  const {
    getPokemons,
    handleFilterTypeClick,
    onSearch,
    getRegionConstant,
    handleFilterRegionClick,
  } = usePokemon();

  const dispatch = useDispatch();

  const fetchAllPokemonsData = async () => {
    if (isLoading) return;

    dispatch(setIsLoading(true));

    try {
      await getPokemons(false);
    } catch (error) {
      console.error("Failed to fetch Pokémon data:", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  React.useEffect(() => {
    fetchAllPokemonsData();
  }, []);

  const handleLoadClick = async () => {
    if (!filter && searchValue.length === 0) {
      return fetchAllPokemonsData();
    }

    if (filter && filter.filterType) {
      const { filterType } = filter;

      if (filterType !== "search") {
        const regionConstant = getRegionConstant(filterType);

        if (!regionConstant) {
          return handleFilterTypeClick(filterType);
        }

        return handleFilterRegionClick(filterType);
      }
    }

    onSearch("load");
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
        {!isLoading && pokemonsCardsList?.results && (
          <Box sx={{ flexGrow: 1, marginTop: "0px" }}>
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
              borderRadius: "20px",
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
              marginBottom: "20%",
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
