import { Avatar, Box, CircularProgress, Link } from "@mui/material";
import { useEffect, useState } from "react";
import { IPokemon } from "../../utils/interfaces/Pokemon/Pokemon";
import pokeball from "../../assets/pokeball_logo.svg";

export interface PokemonPageCardProps {
  pokemonData: IPokemon;
  dominantColor: string;
}

const PokemonPageCard: React.FC<PokemonPageCardProps> = ({
  pokemonData,
  dominantColor,
}) => {
  const [cardBackground, setCardBackground] = useState<string>("#BFDFCC");

  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      if (!pokemonData) return;

      const loadImg = new Image();
      loadImg.src = pokemonData.sprites.other["official-artwork"].front_default;

      try {
        await new Promise((resolve) => (loadImg.onload = resolve));
        setImgLoaded(true);
      } catch (err) {
        console.error("Failed to load image", err);
      }
    };

    loadImage();
  }, [pokemonData]);

  useEffect(() => {
    if (dominantColor && imgLoaded) {
      setCardBackground(dominantColor);
    }
  }, [dominantColor, imgLoaded]);

  return (
    <Link
      href={`/pokemon-details/${pokemonData.name}/${pokemonData.id}`}
      target="_blank"
      rel="noopener"
      underline="none"
    >
      <Box
        sx={{
          width: {
            xs: "180px",
            sm: "180px",
            md: "260px",
            lg: "300px",
            xl: "400px",
          },
          height: {
            xs: "200px",
            sm: "200px",
            md: "260px",
            lg: "300px",
            xl: "400px",
          },
          borderRadius: "32px",
          background: cardBackground,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "column",
            lg: "row",
            xl: "row",
          },
          transition: "transform 0.3s",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        {!imgLoaded && (
          <Box
            sx={{
              width: "100%",
              marginLeft: "20%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress
              sx={{
                color: "#726B8F",
              }}
            />
          </Box>
        )}

        {imgLoaded && (
          <Avatar
            alt="pokemon logo"
            src={pokemonData.sprites.other["official-artwork"].front_default}
            sx={{
              borderRadius: "0",
              alignItems: "center",
              "& img": {
                objectFit: {
                  xs: "contain",
                  sm: "contain",
                  md: "contain",
                  lg: "fill",
                  xl: "fill",
                },
              },

              width: "100%",
              height: "90%",
            }}
          />
        )}
      </Box>
    </Link>
  );
};

export default PokemonPageCard;
