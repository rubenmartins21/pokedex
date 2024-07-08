import React from "react";
import { IPokemon } from "../../utils/interfaces/Pokemon/Pokemon";
import { Avatar, Box } from "@mui/material";

export interface PokemonCardProps {
  pokemon: IPokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <Box>
      <Avatar
        alt="pokemon logo"
        src={pokemon.sprites.other["official-artwork"].front_default}
        sx={{
          width: "50%",
          height: "50%",
          borderRadius: "0",
          alignItems: "center",
        }}
      />
    </Box>
  );
};

export default PokemonCard;
