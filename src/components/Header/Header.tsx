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
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const [selectedLang, setSelectedLang] = React.useState<string>("pt");

  const handleLangButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlLanguageItemClick = (lang: string) => {
    setSelectedLang(lang);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
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
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <nav aria-label="main mailbox folders">
              <List>
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
                    <ListItemText primary="PT" />
                  </ListItemButton>
                </ListItem>
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
                    <ListItemText primary="EN" />
                  </ListItemButton>
                </ListItem>
              </List>
            </nav>
          </Box>
        </Popover>
      </Box>
    </Box>
  );
};

export default Header;
