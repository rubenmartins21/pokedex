import React from "react";
import Layout from "../../components/Layout/Layout";
import PokemonCardList from "../../components/PokemonCardList/PokemonCardList";
import Search from "../../components/Search/Search";
import GoTopButton from "../../components/GoTopButton/GoTopButton";

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Search />
      <PokemonCardList />
      <GoTopButton />
    </Layout>
  );
};

export default HomePage;
