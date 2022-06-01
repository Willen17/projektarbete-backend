import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContextProvider";
import { useUser } from "../context/UserContext";
import { makeRequest, sumQuantity } from "../Helper";
import { toast } from "react-toastify";

interface Page {
  label: string;
  href: string;
}

function Header() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [anchorMenu, setAnchorMenu] = useState(false);
  const { ccLogo, icon, iconsContainer, quantityIcon } = useStyles();
  const { logOutUser, currentUser } = useUser();

  const menuLeft: Page[] = [
    {
      label: "Furniture",
      href: "/category/furniture",
    },
    {
      label: "Chairs",
      href: "/category/chairs",
    },
    {
      label: "Tables",
      href: "/category/tables",
    },
  ];

  const menuRight: Page[] = [
    {
      label: "Decorations",
      href: "/category/decorations",
    },
    {
      label: "Beds",
      href: "/category/beds",
    },
  ];

  const ProfileMenu: Page[] = [
    {
      label: "profile",
      href: `/userProfilePage/${currentUser?._id}`
    },
    {
      label: "admin",
      href: `/admin`
    }
  ]

  const handleOpenMenu = () => {
    setAnchorMenu(true);
  };

  const handleCloseMenu = () => {
    setAnchorMenu(false);
  };

  const logOutHandler = async () => {
    await makeRequest("/api/logout", "DELETE");
    logOutUser(false);
    handleCloseMenu();
  };

  const logInHandler = async () => {
    navigate("/login");
    handleCloseMenu();
  };

  const icons = () => {
    return (
      <div className={iconsContainer}>
        {currentUser?.isAdmin ? (
        <Box           
          sx={{
            display: { xs: "none", sm: "none", md: "none", lg: "block" },
          }}
          >
          <Link to="/admin">
            <img
              className={icon}
              src="/assets/icons/icon-user.webp"
              alt="admin"
            />
          </Link>
        </Box>
        ) : (
          ""
        )}
        {currentUser && !currentUser.isAdmin ? (
          <Box           
            sx={{
              display: { xs: "none", sm: "none", md: "none", lg: "block" },
            }}
          >
          <Link to={`/userProfilePage/${currentUser._id}`}>
            <img
              className={icon}
              src="/assets/icons/icon-user.webp"
              alt="user"
            />
          </Link>
          </Box>
        ) : (
          ""
        )}
        <Link className={quantityIcon} to="/checkoutpage">
          <Badge
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            badgeContent={sumQuantity(cart)}
            color="warning"
          >
            <img
              className={icon}
              src="/assets/icons/icon-shopping-cart.webp"
              alt="cart"
            />
          </Badge>
        </Link>
        {currentUser ? (
          <Button
            style={{
              color: "white",
            }}
            sx={{
              textTransform: "capitalize",
              fontFamily: "Prata",
              display: { xs: "none", sm: "none", md: "none", lg: "block" },
            }}
            onClick={logOutHandler}
          >
            Logout
          </Button>
        ) : (
          <Button
            style={{
              color: "white",
            }}
            sx={{
              textTransform: "capitalize",
              fontFamily: "Prata",
              display: { xs: "none", sm: "none", md: "none", lg: "block" },
            }}
            onClick={logInHandler}
          >
            Login
          </Button>
        )}
      </div>
    );
  };

  const getMenuButtonsLeft = () => {
    return menuLeft.map(({ label, href }) => {
      return (
        <Button
          component={Link}
          {...{
            key: label,
            color: "inherit",
            to: href,
          }}
          sx={{
            textTransform: "capitalize",
            fontFamily: "Prata",
            m: "2.5rem",
            display: { xs: "none", sm: "none", md: "none", lg: "block" },
          }}
        >
          {label}
        </Button>
      );
    });
  };

  const getMenuButtonsRight = () => {
    return menuRight.map(({ label, href }) => {
      return (
        <Button
          component={Link}
          {...{
            key: label,
            color: "inherit",
            to: href,
          }}
          sx={{
            textTransform: "capitalize",
            fontFamily: "Prata",
            m: "2.5rem",
            display: { xs: "none", sm: "none", md: "none", lg: "block" },
          }}
        >
          {label}
        </Button>
      );
    });
  };

  return (
    <AppBar
      sx={{
        backgroundColor: "#6C665F",
        padding: "0rem 1rem",
        placeContent: "center",
        display: "flex",
        flexDirection: "row",
        height: "6rem",
        position: "sticky",
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          justifyContent: {
            xs: "space-between",
            sm: "space-between",
            md: "space-around",
            lg: "space-around",
          },
        }}
      >
        <Box
          sx={{
            display: {
              xs: "flex",
              sm: "flex",
              md: "flex",
              lg: "none",
            },
          }}
        >
          <IconButton
            size="large"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenMenu}
            sx={{
              color: "white",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorReference="anchorPosition"
            anchorPosition={{ top: 75, left: 0 }}
            keepMounted
            open={Boolean(anchorMenu)}
            onClose={handleCloseMenu}
            sx={{
              display: { xs: "block", md: "block" },
            }}
          >
            {menuLeft.map((item) => (
              <MenuItem
                component={Link}
                sx={{
                  width: "200px",
                }}
                key={item.label}
                onClick={handleCloseMenu}
                to={item.href}
              >
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    fontFamily: "Prata",
                    fontSize: ".9rem",
                  }}
                  textAlign="center"
                >
                  {item.label}
                </Typography>
              </MenuItem>
            ))}
            {menuRight.map((item) => (
              <MenuItem
                key={item.label}
                onClick={handleCloseMenu}
                component={Link}
                to={item.href}
              >
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    fontFamily: "Prata",
                    fontSize: ".9rem",
                  }}
                  textAlign="center"
                >
                  {item.label}
                </Typography>
              </MenuItem>
            ))}
            {currentUser?.isAdmin ? (
              <MenuItem
                onClick={handleCloseMenu}
                component={Link}
                to={"/admin"}
              >
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    fontFamily: "Prata",
                    fontSize: ".9rem",
                  }}
                  textAlign="center"
                >
                  Profile
                </Typography>
              </MenuItem>  
            ) : ''
            }
            {currentUser && !currentUser.isAdmin ? (
              <MenuItem
                onClick={handleCloseMenu}
                component={Link}
                to={`/userProfilePage/${currentUser._id}`}
              >
              <Typography
                sx={{
                  textTransform: "capitalize",
                  fontFamily: "Prata",
                  fontSize: ".9rem",
                }}
                textAlign="center"
              >
                Profile
              </Typography>
              </MenuItem>  
              ) : ''
            }
            {currentUser ? (
              <MenuItem
                onClick={logOutHandler}
              >
              <Typography
                sx={{
                  textTransform: "capitalize",
                  fontFamily: "Prata",
                  fontSize: ".9rem",
                }}
                textAlign="center"
              >
                Logout
              </Typography>
              </MenuItem>
            ) : (
              <MenuItem
                onClick={logInHandler}
              >
              <Typography
                sx={{
                  textTransform: "capitalize",
                  fontFamily: "Prata",
                  fontSize: ".9rem",
                }}
                textAlign="center"
              >
                Login
              </Typography>
              </MenuItem>
            )}
          </Menu>
        </Box>
        {getMenuButtonsLeft()}
        <Link to="/">
          <img
            className={ccLogo}
            src="/assets/images/logo.svg"
            alt="comme ci comme ça"
          ></img>
        </Link>
        {getMenuButtonsRight()}
        {icons()}
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles(() => ({
  ccLogo: {
    width: "80px",
    height: "80px",
    margin: "0 1rem",
  },
  iconsContainer: {
    display: "flex",
    alignSelf: "center",
  },
  icon: {
    width: "25px",
    height: "25px",
    margin: ".5rem",
  },
  menuItems: {
    textTransform: "capitalize",
    fontFamily: "Prata",
  },
  quantityIcon: {
    textDecoration: "none",
    position: "relative",
  },
}));

export default Header;
