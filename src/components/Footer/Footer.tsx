import React from "react";
import { Box, useMediaQuery, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const isMobile = useMediaQuery("(max-width:500px)");

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
            width: isMobile ? "80%" : "60%",
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
              fontSize: isMobile ? "14px" : "16px",
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
              fontSize: isMobile ? "14px" : "16px",
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
