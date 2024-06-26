import React from "react";
import { Box } from "@mui/material";

const Header: React.FC = () => {
  return (
    <Box
      sx={{
        background: "red",
        height: "90px",
        width: "100%",
      }}
    >
      <h1>Header</h1>
    </Box>
  );
};

export default Header;
