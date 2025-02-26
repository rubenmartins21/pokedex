import React, { useEffect, useState } from "react";
import { IPokemon } from "../../utils/interfaces/Pokemon/Pokemon";
import { Box, Grid, Typography } from "@mui/material";
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
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const [generalInfo, setGeneralInfo] = useState<GeneralInfoProps>({
    category: "",
    ability: "",
    weight: 0,
    height: 0,
    gender: "",
  });

  const { getPokemonSpecies, getPrimaryAbility } = usePokemon();

  const activeLocale = i18n.resolvedLanguage;

  useEffect(() => {
    const fetchData = async () => {
      const { category, gender } = await getPokemonSpecies(
        pokemonData.name,
        activeLocale || "en"
      );

      const ability = await getPrimaryAbility(pokemonData);

      setGeneralInfo((prev) => ({
        ...prev,
        weight: pokemonData.weight,
        height: pokemonData.height,
        category,
        ability: ability,
        gender,
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
        width: "100%",
      }}
    >
      <Grid
        item
        xs={6}
        display={"flex"}
        justifyContent="left"
        alignItems="center"
      >
        <Box
          gap={1}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Istok Web",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "30px",
              lineHeight: "43px",
              display: "flex",
              alignItems: "center",

              color: "#3A2F66",
            }}
          >
            {t("pokemonPage.category")}:
          </Typography>
          <Typography
            sx={{
              fontFamily: "Istok Web",
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "24px",
              lineHeight: "35px",

              color: "rgba(58, 47, 102, 0.78)",
            }}
          >
            {generalInfo.category}
          </Typography>
        </Box>
      </Grid>

      <Grid
        item
        xs={6}
        display={"flex"}
        justifyContent="right"
        alignItems="center"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          gap={1}
        >
          <Typography
            sx={{
              fontFamily: "Istok Web",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "30px",
              lineHeight: "43px",
              display: "flex",
              alignItems: "center",

              color: "#3A2F66",
            }}
          >
            {t("pokemonPage.ability")}:
          </Typography>
          <Typography
            sx={{
              fontFamily: "Istok Web",
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "24px",
              lineHeight: "35px",

              color: "rgba(58, 47, 102, 0.78)",
            }}
          >
            {generalInfo.ability}
          </Typography>
        </Box>
      </Grid>

      <Grid
        item
        xs={6}
        display={"flex"}
        justifyContent="left"
        alignItems="center"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          gap={1}
        >
          <Typography
            sx={{
              fontFamily: "Istok Web",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "30px",
              lineHeight: "43px",
              display: "flex",
              alignItems: "center",

              color: "#3A2F66",
            }}
          >
            {t("pokemonPage.height")}:
          </Typography>
          <Typography
            sx={{
              fontFamily: "Istok Web",
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "24px",
              lineHeight: "35px",

              color: "rgba(58, 47, 102, 0.78)",
            }}
          >
            {generalInfo.height}
          </Typography>
        </Box>
      </Grid>

      <Grid
        item
        xs={6}
        display={"flex"}
        justifyContent="right"
        alignItems="center"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          gap={1}
        >
          <Typography
            sx={{
              fontFamily: "Istok Web",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "30px",
              lineHeight: "43px",
              display: "flex",
              alignItems: "center",

              color: "#3A2F66",
            }}
          >
            {t("pokemonPage.weight")}:
          </Typography>
          <Typography
            sx={{
              fontFamily: "Istok Web",
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "24px",
              lineHeight: "35px",

              color: "rgba(58, 47, 102, 0.78)",
            }}
          >
            {generalInfo.weight}
          </Typography>
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        display={"flex"}
        justifyContent="left"
        alignItems="center"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          gap={1}
        >
          <Typography
            sx={{
              fontFamily: "Istok Web",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "30px",
              lineHeight: "43px",
              display: "flex",
              alignItems: "center",

              color: "#3A2F66",
            }}
          >
            {t("pokemonPage.gender")}:
          </Typography>
          <Typography
            sx={{
              fontFamily: "Istok Web",
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "24px",
              lineHeight: "35px",

              color: "rgba(58, 47, 102, 0.78)",
            }}
          >
            {generalInfo.gender}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PokemonGeneralInfo;
