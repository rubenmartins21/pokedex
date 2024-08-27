import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import usePokemon from "../../hooks/usePokemon";
import { IApiResourceList } from "../../utils/interfaces/Utility/ApiResourceList";
import { useSelector } from "react-redux";
import { IPokemonInitialStates } from "../../utils/interfaces/Reducers/PokemonList";
const RegionsFilter: React.FC = () => {
  const [allRegions, setAllRegions] = useState<IApiResourceList>();

  const filter = useSelector(
    (state: { pokemons: IPokemonInitialStates }) => state.pokemons.filter
  );

  const [clickedRegion, setClickedRegion] = useState<string>(
    filter?.filterType
  );

  const {
    getAllRegions,
    getRegionColor,
    handleFilterRegionClick,
    resetFilter,
  } = usePokemon();

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
    >
      {allRegions?.results.map((item, index) => (
        <Grid item xs={4} sm={2} md={2} xl={2} lg={2} key={index}>
          <Button
            onClick={() => {
              handleFilterRegionClick(item.name);
              setClickedRegion(clickedRegion === item.name ? "" : item.name);
              if (clickedRegion === item.name) {
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
                clickedRegion === item.name
                  ? "#FFFFFF"
                  : `${getRegionColor(item.name)}`,
              border: `2px solid ${getRegionColor(item.name)}`,
              background:
                clickedRegion === item.name
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
