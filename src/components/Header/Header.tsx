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
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";

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
              marginLeft: "20px",
            }}
          >
            <Avatar
              alt="pokemon logo"
              src={"src/assets/pokemon_logo.png"}
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: "0",
                alignItems: "center",
              }}
            />
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
                            alt="pokemon logo"
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
