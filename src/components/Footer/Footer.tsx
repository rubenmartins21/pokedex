import React from "react";
import { Box, Avatar, useMediaQuery, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const isMobile = useMediaQuery("(max-width:500px)");

  const MobileHeader = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Avatar
          alt="pokemon logo"
          src={"src/assets/pokemon_logo.png"}
          sx={{
            width: "30%",
            height: "30%",
            marginTop: "10px",
            borderRadius: "0",
            alignItems: "center",
          }}
        />
      </Box>
    );
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "60%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Istok Web",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "14px",
              color: "#726B8F",
              lineHeight: "20px",
              textAlign: "center",
            }}
          >
            {t("footer.reservedRights")}
          </Typography>

          <Typography
            sx={{
              marginTop: "5px",
              marginBottom: "20px",
              fontFamily: "Istok Web",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "14px",
              color: "#726B8F",
              lineHeight: "20px",
              textAlign: "center",
            }}
          >
            {t("footer.copyright")}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
