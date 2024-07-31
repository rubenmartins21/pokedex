import { Box, IconButton, InputAdornment, InputBase } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import usePokemon from "../../hooks/usePokemon";

const Search: React.FC = () => {
  const {
    allPokemons,
    getAllPokemons,
    searchedPokemonsResults,
    setSearchedPokemonsResults,
  } = usePokemon();

  const onSearchChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    let searchResult = searchedPokemonsResults;
    searchResult = allPokemons?.results.filter((d) =>
      d.name.toLowerCase().includes(e.target.value)
    );
    setSearchedPokemonsResults(searchResult);
  };

  React.useEffect(() => {
    if (!allPokemons) {
      getAllPokemons();
    }
  }, []);

  return (
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
          placeholder="Name or number"
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
          onChange={onSearchChange}
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
        <IconButton sx={{ color: "white" }} aria-label="add an alarm">
          <TuneIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Search;
