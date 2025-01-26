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
      console.log(pokeball);
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
            xs: "170px",
            sm: "170px",
            md: "170px",
            lg: "197.58px",
            xl: "197.58px",
          },
          height: {
            xs: "260px",
            sm: "260px",
            md: "260px",
            lg: "194.51px",
            xl: "194.51px",
          },
          borderRadius: "12px",
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

              width: {
                xs: "100%",
                sm: "100%",
                md: "100%",
                lg: "100%",
                xl: "100%",
              },
              height: {
                xs: "50%",
                sm: "50%",
                md: "50%",
                lg: "100%",
                xl: "100%",
              },
            }}
          />
        )}

        {imgLoaded && (
          <Avatar
            alt="pokeball logo"
            src={pokeball}
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
            }}
          />
        )}
      </Box>
    </Link>
  );
};

export default PokemonPageCard;
