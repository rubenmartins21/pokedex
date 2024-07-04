import axiosInstance from "../api/axiosInstance";

const usePokemon = () => {
  const getAllPokemons = async () => {
    axiosInstance
      .get("https://pokeapi.co/api/v2/pokemon/")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    getAllPokemons,
  };
};

export default usePokemon;
