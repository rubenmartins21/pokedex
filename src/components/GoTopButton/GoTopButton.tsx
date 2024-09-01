import { Box, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const GoTopButton: React.FC = () => {
  const [scrollPosition, setSrollPosition] = useState(0);
  const [showGoTop, setshowGoTop] = useState(false);

  const handleVisibleButton = () => {
    const position = window.pageYOffset;
    setSrollPosition(position);

    if (scrollPosition > 50) {
      return setshowGoTop(true);
    } else if (scrollPosition < 50) {
      return setshowGoTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleVisibleButton);
  });

  const handleGoToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    showGoTop && (
      <Box
        sx={{
          position: "fixed",
          cursor: "pointer",
          bottom: "5%",
          left: "95%",
          display: {
            xs: "none",
            sm: "none",
            md: "none",
            lg: "block",
            xl: "block",
          },
        }}
      >
        <IconButton
          aria-label="go-top"
          size="large"
          sx={{
            backgroundColor: "#726B8F",
            "&:hover": {
              backgroundColor: "#726B8F",
            },
          }}
          onClick={handleGoToTop}
        >
          <KeyboardArrowUpIcon
            fontSize="inherit"
            sx={{
              color: "#ffffff",
            }}
          />
        </IconButton>
      </Box>
    )
  );
};

export default GoTopButton;
