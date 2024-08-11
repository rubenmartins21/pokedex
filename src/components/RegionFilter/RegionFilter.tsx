import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import usePokemon from "../../hooks/usePokemon";
import { IApiResourceList } from "../../utils/interfaces/Utility/ApiResourceList";
const RegionsFilter: React.FC = () => {
  const [allRegions, setAllRegions] = useState<IApiResourceList>();

  const { getAllRegions, getRegionColor } = usePokemon();

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
      columns={{ xs: 10, sm: 10, md: 10, xl: 10, lg: 10 }}
    >
      {allRegions?.results.map((item, index) => (
        <Grid item xs={2} sm={2} md={2} xl={2} lg={2} key={index}>
          <Button
            sx={{
              position: "absolute",
              width: "89px",
              height: "22px",
              background: `${getRegionColor(item.name)}`,
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
                background: `${getRegionColor(item.name)}`,
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
