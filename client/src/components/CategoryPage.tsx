import { Box, CircularProgress, Container, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { makeRequest } from "../Helper";
import { ProductData } from "../ProductData";

function CategoryPage() {
  const params = useParams<{ category: string }>();
  const [productList, setProductList] = useState<ProductData[]>([]);

  useEffect(() => {
    setProductList([]);
    const fetchData = async () => {
      let response = await makeRequest(
        `/api/category/${params.category}`,
        "GET"
      );
      setProductList(response.response);
    };
    fetchData();
  }, [params]);
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
          {params.category}
        </Typography>
      </Container>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "3rem 10rem",
          justifyContent: "center",
          paddingTop: "2rem",
          paddingBottom: "6rem",
          flexDirection: "row",
        }}
      >
        {productList.length ? (
          productList.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "3rem 10rem",
              justifyContent: "center",
              paddingTop: "2rem",
              paddingBottom: "6rem",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default CategoryPage;
