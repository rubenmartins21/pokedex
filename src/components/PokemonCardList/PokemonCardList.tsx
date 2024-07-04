import React from "react";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import usePokemon from "../../hooks/usePokemon";

const PokemonCardList: React.FC = () => {
  const { t } = useTranslation();

  const { getAllPokemons } = usePokemon();

  React.useEffect(() => {
    getAllPokemons();
  }, []);
  return (
    <Box>
      <h2>{t("homePage.hello")}</h2>
      Pokemon Card list
    </Box>
  );
};

export default PokemonCardList;
