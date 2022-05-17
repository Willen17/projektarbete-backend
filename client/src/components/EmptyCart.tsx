import { Box, Container, Typography } from "@mui/material";
import emptyCart from "../assets/images/empty-cart.webp";
import HomeButton from "./shared/HomeButton";

const EmptyCart = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        minHeight: "35rem",
      }}
    >
      <Typography
        sx={{ textTransform: "uppercase", fontFamily: "Prata", mt: "1rem" }}
        variant="h5"
      >
        Shopping Cart
      </Typography>
      <Box
        sx={{
          pt: "2rem",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <img src={emptyCart} alt="empty cart" height="300px" />
        <Typography>Your cart is empty.</Typography>
        <HomeButton message="Explore our collections" />
      </Box>
    </Container>
  );
};

export default EmptyCart;
