import React from "react";
import Layout from "../../components/Layout/Layout";
import PokemonCarousel from "../../components/PokemonCarousel/PokemonCarousel";
import PokemonDetails from "../../components/PokemonsDetails/PokemonDetails";

const PokemonPage: React.FC = () => {
  return (
    <Layout>
      <PokemonCarousel />
      <PokemonDetails />
    </Layout>
  );
};

export default PokemonPage;
