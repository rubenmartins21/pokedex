import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import usePokemon from "../../hooks/usePokemon";
import { useTranslation } from "react-i18next";
import { IApiResourceList } from "../../utils/interfaces/Utility/ApiResourceList";

const PokemonTypesFilter: React.FC = () => {
  const [allTypes, setAllTypes] = useState<IApiResourceList>();

  const {
    getAllPokemonsTypes,
    getTranslatedType,
    getTypeConstant,
    handleFilterTypeClick,
  } = usePokemon();

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
            onClick={() => handleFilterTypeClick(item.name)}
            sx={{
              position: "absolute",
              width: "89px",
              height: "22px",
              background: `${getTypeConstant(item.name)?.color}`,
              borderRadius: "7px",
              textTransform: "none",
              fontFamily: "Istok Web",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "15px",
              lineHeight: "22px",
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              color: "#FFFFFF",
              "&.MuiButtonBase-root:hover": {
                background: `${getTypeConstant(item.name)?.color}`,
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
