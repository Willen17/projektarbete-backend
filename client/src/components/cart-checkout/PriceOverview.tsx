import { Box, Typography } from "@mui/material";
import { useCart } from "../../context/CartContextProvider";
import { numWithSpaces, UseSumTotal } from "../../Helper";

const PriceOverview = () => {
  const { cart, shipper } = useCart();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h5"
        style={{
          fontFamily: "Prata",
          marginTop: "2rem",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        Total: {numWithSpaces(UseSumTotal(cart, true))} SEK
      </Typography>
      <Typography color="#6C665F" variant="overline">
        includes delivery fee ({shipper.cost} SEK - {shipper.providerName})
      </Typography>
    </Box>
  );
};

export default PriceOverview;
