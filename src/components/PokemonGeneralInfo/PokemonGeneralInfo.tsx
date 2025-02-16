import React, { useEffect, useState } from "react";
import { IPokemon } from "../../utils/interfaces/Pokemon/Pokemon";
import { Box, Grid } from "@mui/material";
import usePokemon from "../../hooks/usePokemon";
import { useTranslation } from "react-i18next";

export interface PokemonGeneralInfoProps {
  pokemonData: IPokemon;
}

export interface GeneralInfoProps {
  category: string;
  ability: string;
  weight: number;
  height: number;
  gender: string;
}

const PokemonGeneralInfo: React.FC<PokemonGeneralInfoProps> = ({
  pokemonData,
}) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const [generalInfo, setGeneralInfo] = useState<GeneralInfoProps>({
    category: "",
    ability: "",
    weight: 0,
    height: 0,
    gender: "",
  });

  const { getPokemonCategory, getPrimaryAbility } = usePokemon();

  useEffect(() => {
    const fetchData = async () => {
      const category = await getPokemonCategory(pokemonData.name);

      const ability = await getPrimaryAbility(pokemonData);

      setGeneralInfo((prev) => ({
        ...prev,
        weight: pokemonData.weight,
        height: pokemonData.height,
        category,
        ability: ability,
      }));
    };
    if (pokemonData) {
      fetchData();
    }
  }, [pokemonData, currentLanguage]);
  return (
    <Grid
      container
      columns={12}
      justifyContent="center"
      alignItems="center"
      sx={{
        marginTop: "3rem",
        width: "90%",
      }}
    >
      <Grid
        item
        xs={6}
        display={"flex"}
        justifyContent="left"
        alignItems="center"
      >
        <Box>
          <h1>{generalInfo.category}</h1>
        </Box>
      </Grid>

      <Grid
        item
        xs={6}
        display={"flex"}
        justifyContent="left"
        alignItems="center"
      >
        <Box>
          <h1>{generalInfo.ability}</h1>
        </Box>
      </Grid>

      <Grid
        item
        xs={6}
        display={"flex"}
        justifyContent="left"
        alignItems="center"
      >
        <Box>
          <h1>{generalInfo.height}</h1>
        </Box>
      </Grid>

      <Grid
        item
        xs={6}
        display={"flex"}
        justifyContent="left"
        alignItems="center"
      >
        <Box>
          <h1>{generalInfo.weight}</h1>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PokemonGeneralInfo;
