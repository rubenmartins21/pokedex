import React, { useEffect, useState } from "react";
import {
  IAllPokemonsResults,
  IPokemon,
} from "../../utils/interfaces/Pokemon/Pokemon";
import { Avatar, Box } from "@mui/material";
import usePokemon from "../../hooks/usePokemon";

export interface PokemonCardProps {
  pokemon: IAllPokemonsResults;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const { getPokemonsDetails } = usePokemon();
  const [pokemonData, setPokemonData] = useState<IPokemon>();

  const fecthData = async () => {
    const response = await getPokemonsDetails(pokemon.url);

    setPokemonData(response);
  };

  useEffect(() => {
    if (pokemon) {
      fecthData();
    }
  }, [pokemon]);
  return (
    <>
      {pokemonData && (
        <Box>
          <Avatar
            alt="pokemon logo"
            src={pokemonData.sprites.other["official-artwork"].front_default}
            sx={{
              borderRadius: "0",
              alignItems: "center",
              width: "139.47px",
              height: "130.25px",
            }}
          />
        </Box>
      )}
    </>
  );
};

export default PokemonCard;
