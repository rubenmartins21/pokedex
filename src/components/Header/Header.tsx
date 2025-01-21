import React from "react";
import {
  Box,
  Avatar,
  Popover,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Typography,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const { i18n } = useTranslation();

  const isMobile = useMediaQuery("(max-width:500px)");

  const activeLocale = i18n.resolvedLanguage;

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const [selectedLang, setSelectedLang] = React.useState<string>(
    activeLocale ? activeLocale : "en"
  );

  const handleLangButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlLanguageItemClick = (lang: string) => {
    i18n.changeLanguage(lang);
    setSelectedLang(lang);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const MobileHeader = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link
          to={"/"}
          rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Istok Web",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "42px",
              lineHeight: "60px",
              textAlign: "center",
              color: "#3A2F66",
              marginTop: "30px",
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            Poképedia
          </Typography>
        </Link>
      </Box>
    );
  };

  return (
    <>
      {isMobile && <MobileHeader />}
      {!isMobile && (
        <Box
          sx={{
            background: "#726B8F",
            height: "90px",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link
              to={"/"}
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "100%",
              }}
            >
              <Avatar
                alt="pokemon logo"
                src={"src/assets/logo.png"}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "100%",
                    md: "100%",
                    xl: "70%",
                    lg: "70%",
                  },

                  height: {
                    xs: "100%",
                    sm: "100%",
                    md: "100%",
                    xl: "70%",
                    lg: "70%",
                  },
                }}
              />
            </Link>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginRight: "20px",
            }}
          >
            <IconButton
              aria-label="languagee button"
              onClick={handleLangButtonClick}
            >
              <LanguageIcon
                sx={{
                  width: "43px",
                  height: "45px",
                  color: "white",
                }}
              />
            </IconButton>

            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <nav aria-label="main mailbox folders">
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => handlLanguageItemClick("en")}
                        selected={selectedLang === "en"}
                      >
                        <ListItemIcon>
                          <Avatar
                            alt="country flag"
                            src={"src/assets/flags/englandFlag.svg"}
                            sx={{
                              width: "50%",
                              height: "50%",
                              borderRadius: "0",
                              alignItems: "center",
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary="EN"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontFamily: "Istok Web",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "17px",
                              textAlign: "center",
                            },
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => handlLanguageItemClick("pt")}
                        selected={selectedLang === "pt"}
                      >
                        <ListItemIcon>
                          <Avatar
                            alt="pokemon logo"
                            src={"src/assets/flags/portugueseFlag.svg"}
                            sx={{
                              width: "50%",
                              height: "50%",
                              borderRadius: "0",
                              alignItems: "center",
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary="PT"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontFamily: "Istok Web",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "17px",
                              textAlign: "center",
                            },
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </nav>
              </Box>
            </Popover>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Header;
