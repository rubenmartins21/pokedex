import React from "react";
import Layout from "../../components/Layout/Layout";
import PokemonCardList from "../../components/PokemonCardList/PokemonCardList";
import { Typography } from "@mui/material";
import Search from "../../components/Search/Search";

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Typography
        sx={{
          fontFamily: "Istok Web",
          fontStyle: "normal",
          fontWeight: 700,
          fontSize: "42px",
          lineHeight: "60px",
          textAlign: "center",
          color: "#3A2F66",
          marginTop: "30px",
          textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        Pokédex
      </Typography>
      <Search />
      <PokemonCardList />
    </Layout>
  );
};

export default HomePage;
