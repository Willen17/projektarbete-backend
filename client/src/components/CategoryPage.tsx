import { Box, Container, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { makeRequest } from "../Helper";
import { ProductData } from "../ProductData";

function CategoryPage() {
  const params = useParams<{ category: string }>();
  const [productList, setProductList] = useState<ProductData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await makeRequest(
        `/api/category/${params.category}`,
        "GET"
      );
      console.log(response);
      // setProductList(response);
    };
    fetchData();
  }, []);

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

      {/* <ProductCard /> */}
    </Box>
  );
}

export default CategoryPage;
