import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  InputBase,
  Typography,
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
import GenerationFilter from "../GenerationFilter/GenerationFilter";

const Search: React.FC = () => {
  const { t } = useTranslation();

  const [showFilterArea, setShowFilterArea] = useState<boolean>(false);

  const [filterSection, setFilterSection] = useState<string>("type");

  const allPokemons = useSelector(
    (state: { pokemons: IPokemonInitialStates }) => state.pokemons.allPokemons
  );

  const { getAllPokemons, onSearch } = usePokemon();

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!allPokemons) {
      getAllPokemons();
    }
  }, [allPokemons]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: "40px",
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
              width: "599.43px",
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
                onSearch();
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
            onClick={() => setShowFilterArea(!showFilterArea)}
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
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                width: "200px",
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
                {" "}
                Type
              </Button>

              <Button
                variant="text"
                onClick={() => setFilterSection("generation")}
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
                  color: filterSection === "generation" ? "#3A2F66" : "#8D99D6",
                  cursor: "pointer",
                }}
              >
                {" "}
                Generation
              </Button>
            </Box>

            {filterSection === "type" && <PokemonTypesFilter />}

            {filterSection === "generation" && <GenerationFilter />}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Search;
