import React from "react";
import Header from "../Header/Header";
import { Box } from "@mui/material";
import Footer from "../Footer/Footer";

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
      <Footer />
    </Box>
  );
};

export default Layout;
