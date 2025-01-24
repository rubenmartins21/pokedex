import React from "react";
import Layout from "../../components/Layout/Layout";
import { useParams } from "react-router-dom";
import PokemonCarousel from "../../components/PokemonCarousel/PokemonCarousel";

const PokemonPage: React.FC = () => {
  const { name } = useParams();

  return (
    <Layout>
      <PokemonCarousel />
      <h1>{name}</h1>
    </Layout>
  );
};

export default PokemonPage;
