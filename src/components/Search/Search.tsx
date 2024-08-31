import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  InputBase,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import usePokemon from "../../hooks/usePokemon";
import { useSelector } from "react-redux";
import { IPokemonInitialStates } from "../../utils/interfaces/Reducers/PokemonList";
import { useDispatch } from "react-redux";
import { updatePokemonSearchValue } from "../../store/actionCreators";
import { useTranslation } from "react-i18next";
import PokemonTypesFilter from "../PokemonTypesFilter/PokemonTypesFilter";
import RegionsFilter from "../RegionFilter/RegionFilter";

const Search: React.FC = () => {
  const { t } = useTranslation();

  const [showFilterArea, setShowFilterArea] = useState<boolean>(false);

  const [filterSection, setFilterSection] = useState<string>("type");

  const allPokemons = useSelector(
    (state: { pokemons: IPokemonInitialStates }) => state.pokemons.allPokemons
  );

  const filter = useSelector(
    (state: { pokemons: IPokemonInitialStates }) => state.pokemons.filter
  );

  const { getAllPokemons, onSearch, resetFilter, getRegionColor } =
    usePokemon();

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!allPokemons) {
      getAllPokemons();
    }
  }, [allPokemons]);

  const handleShowFilterArea = () => {
    setShowFilterArea(!showFilterArea);

    if (filter) {
      const regionExist = getRegionColor(filter.filterType);

      setFilterSection(regionExist ? "region" : "type");
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
          marginBottom: showFilterArea ? "30px" : "60px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <InputBase
            startAdornment={
              <InputAdornment
                position="start"
                sx={{
                  marginLeft: "10px",
                }}
              >
                <SearchIcon />
              </InputAdornment>
            }
            placeholder={t("homePage.namerOrNumber")}
            inputProps={{ "aria-label": "name or number search" }}
            sx={{
              ml: 1,
              flex: 1,
              width: {
                xs: "300px",
                sm: "500px",
                md: "500px",
                lg: "599.43px",
                xl: "599.43px",
              },
              height: "35.18px",
              background: "#EDEEF3",
              borderRadius: "7px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Istok Web",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: "32px",
              color: "#3A2F66",
              "& input::placeholder": {
                fontFamily: "Istok Web",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: "32px",
                color: "rgba(114, 107, 143, 0.45)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            }}
            onKeyDown={(e) => {
              if (e.code == "Enter") {
                onSearch("searchClick");
              }
            }}
            onChange={(e) => {
              dispatch(updatePokemonSearchValue(e.target.value));
            }}
          />
        </Box>
        <Box
          sx={{
            width: "36.84px",
            height: "34.4px",
            background: "#726B8F",
            borderRadius: "7px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "10px",
          }}
        >
          <IconButton
            sx={{ color: "white" }}
            aria-label="apply filters"
            onClick={() => handleShowFilterArea()}
          >
            <TuneIcon />
          </IconButton>
        </Box>
      </Box>
      {showFilterArea && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginBottom: "5%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                width: "200px",
                marginBottom: "2%",
              }}
            >
              <Button
                variant="text"
                onClick={() => setFilterSection("type")}
                sx={{
                  fontFamily: "Istok Web",
                  fontStyle: "normal",
                  fontWeight: 700,
                  fontSize: "20px",
                  lineHeight: "29px",
                  display: "flex",
                  alignItems: "center",
                  textalign: "center",
                  textTransform: "none",
                  color: filterSection === "type" ? "#3A2F66" : "#8D99D6",
                  cursor: "pointer",
                }}
              >
                {t("homePage.type")}
              </Button>

              <Button
                variant="text"
                onClick={() => setFilterSection("region")}
                sx={{
                  fontFamily: "Istok Web",
                  fontStyle: "normal",
                  fontWeight: 700,
                  fontSize: "20px",
                  lineHeight: "29px",
                  display: "flex",
                  alignItems: "center",
                  textalign: "center",
                  textTransform: "none",
                  color: filterSection === "region" ? "#3A2F66" : "#8D99D6",
                  cursor: "pointer",
                }}
              >
                {t("homePage.area")}
              </Button>
            </Box>

            <Box
              sx={{
                width: {
                  xs: "50%",
                  sm: "50%",
                  md: "40%",
                  lg: "40%",
                  xl: "30%",
                },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {filterSection === "type" && <PokemonTypesFilter />}

              {filterSection === "region" && <RegionsFilter />}
            </Box>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "40px",
              }}
            >
              <Button
                variant="outlined"
                onClick={async () => resetFilter()}
                sx={{
                  width: "150px",
                  height: "35px",
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
                  marginTop: "20px",
                  "&:hover": {
                    backgroundColor: "#726B8F",
                    border: "2px solid #726B8F",
                    boxShadow: "none",
                    color: "white",
                  },
                }}
              >
                {t("homePage.reset")}
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Search;
