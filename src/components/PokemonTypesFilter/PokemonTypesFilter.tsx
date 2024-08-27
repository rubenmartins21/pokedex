import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import usePokemon from "../../hooks/usePokemon";
import { useTranslation } from "react-i18next";
import { IApiResourceList } from "../../utils/interfaces/Utility/ApiResourceList";
import { useSelector } from "react-redux";
import { IPokemonInitialStates } from "../../utils/interfaces/Reducers/PokemonList";

const PokemonTypesFilter: React.FC = () => {
  const {
    getAllPokemonsTypes,
    getTranslatedType,
    getTypeConstant,
    handleFilterTypeClick,
    resetFilter,
  } = usePokemon();

  const [allTypes, setAllTypes] = useState<IApiResourceList>();

  const filter = useSelector(
    (state: { pokemons: IPokemonInitialStates }) => state.pokemons.filter
  );

  const [clickedType, setClickedType] = useState<string>(filter?.filterType);

  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllPokemonsTypes();

      setAllTypes(data);
    };

    fetchData();
  }, []);

  return (
    <Grid
      container
      spacing={{
        xs: 5,
        sm: 5,
        md: 5,
        lg: 5,
        xl: 5,
      }}
      columns={{ xs: 12, sm: 12, md: 12, xl: 12, lg: 12 }}
    >
      {allTypes?.results.map((item, index) => (
        <Grid item xs={4} sm={4} md={4} xl={4} lg={4} key={index}>
          <Button
            variant="outlined"
            onClick={() => {
              handleFilterTypeClick(item.name);
              setClickedType(clickedType === item.name ? "" : item.name);
              if (clickedType === item.name) {
                resetFilter();
              }
            }}
            sx={{
              position: "absolute",
              width: "110px",
              height: "28px",
              borderRadius: "20px",
              textTransform: "none",
              fontFamily: "Istok Web",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "15px",
              lineHeight: "22px",
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              color:
                clickedType === item.name
                  ? "#FFFFFF"
                  : `${getTypeConstant(item.name)?.color}`,
              border: `2px solid ${getTypeConstant(item.name)?.color}`,
              background:
                clickedType === item.name
                  ? `${getTypeConstant(item.name)?.color}`
                  : "none",
              "&.MuiButtonBase-root:hover": {
                background: `${getTypeConstant(item.name)?.color}`,
                color: "#FFFFFF",
                border: `2px solid ${getTypeConstant(item.name)?.color}`,
              },
            }}
          >
            {getTranslatedType(item.name, currentLanguage)}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default PokemonTypesFilter;
