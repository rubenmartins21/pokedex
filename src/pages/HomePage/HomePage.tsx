import React from "react";
import Layout from "../../components/Layout/Layout";
import PokemonCardList from "../../components/PokemonCardList/PokemonCardList";

const HomePage: React.FC = () => {
  return (
    <Layout>
      <PokemonCardList />
    </Layout>
  );
};

export default HomePage;
