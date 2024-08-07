import { Grid, Typography } from "@mui/material";
import React from "react";

const GenerationFilter: React.FC = () => {
  const items = ["Item 1", "Item 2", "Item 3"];
  const generateGrid = () => {
    const rows = [];
    let rowIndex = 0;

    const maxRowLength = Math.ceil(Math.sqrt(items.length));

    while (items.length > 0) {
      const rowLength = Math.max(1, maxRowLength - rowIndex);
      const currentRowItems = items.splice(0, rowLength);

      rows.push(
        <Grid item container spacing={2} justifyContent="center" key={rowIndex}>
          {currentRowItems.map((item, index) => (
            <Grid item xs={2} key={index}>
              <Typography variant="h6" align="center">
                {item}
              </Typography>
            </Grid>
          ))}
        </Grid>
      );

      rowIndex++;
    }

    return rows;
  };

  return (
    <Grid container spacing={2} direction="column">
      {generateGrid()}
    </Grid>
  );
};

export default GenerationFilter;
