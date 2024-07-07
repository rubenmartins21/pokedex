import React from "react";
import Header from "../Header/Header";
import { Box } from "@mui/material";

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        background: "#DFFBFF",
        minHeight: "100vh",
      }}
    >
      <Header />
      {children}
    </Box>
  );
};

export default Layout;
