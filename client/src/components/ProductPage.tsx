import { Box, Container, Typography } from "@mui/material";
import ProductCard from "./ProductCard";

function ProductPage() {
  return (
    <Box>
      <Container>
        <Typography
          sx={{
            padding: "1rem 0 ",
            textTransform: "uppercase",
            fontFamily: "Prata",
            mt: "1rem",
          }}
          variant="h5"
        >
          Furniture
        </Typography>
      </Container>
      <ProductCard />
    </Box>
  );
}

export default ProductPage;
