import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import usePokemon from "../../hooks/usePokemon";
import { IApiResourceList } from "../../utils/interfaces/Utility/ApiResourceList";
import { useSelector } from "react-redux";
import { IPokemonInitialStates } from "../../utils/interfaces/Reducers/PokemonList";
const RegionsFilter: React.FC = () => {
  const [allRegions, setAllRegions] = useState<IApiResourceList>();

  const { getAllRegions, getRegionColor, handleFilterRegionClick } =
    usePokemon();

  const filter = useSelector(
    (state: { pokemons: IPokemonInitialStates }) => state.pokemons.filter
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllRegions();

      setAllRegions(data);
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
      columns={{ xs: 12, sm: 10, md: 10, xl: 10, lg: 10 }}
      justifyContent="center"
      alignItems="center"
    >
      {allRegions?.results.map((item, index) => (
        <Grid
          item
          xs={4}
          sm={2}
          md={2}
          xl={2}
          lg={2}
          key={index}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            onClick={() => {
              handleFilterRegionClick(item.name);
            }}
            sx={{
              width: "110px",
              height: "28px",
              borderRadius: "20px",
              textTransform: "none",
              fontFamily: "Istok Web",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: {
                xs: "12px",
                sm: "12px",
                md: "15px",
                lg: "15px",
                xl: "15px",
              },
              lineHeight: "22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              color:
                filter?.filterType === item.name
                  ? "#FFFFFF"
                  : `${getRegionColor(item.name)}`,
              border: `2px solid ${getRegionColor(item.name)}`,
              background:
                filter?.filterType === item.name
                  ? `${getRegionColor(item.name)}`
                  : "none",
              "&.MuiButtonBase-root:hover": {
                background: `${getRegionColor(item.name)}`,
                color: "#FFFFFF",
                border: `2px solid ${getRegionColor(item.name)}`,
              },
            }}
          >
            {item.name}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default RegionsFilter;
