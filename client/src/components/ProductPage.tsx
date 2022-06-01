import { Box, CircularProgress, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../context/AdminPageContext";
import { makeRequest, numWithSpaces } from "../Helper";
import { ProductData } from "../ProductData";
import AddToCartButton from "./shared/AddToCartButton";

function ProductPage() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductData>();

  useEffect(() => {
    const fetchData = async () => {
      let response = await makeRequest(`/api/product/${params.id}`, "GET");
      setProduct(response.data);
    };
    fetchData();
  }, [params]);

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "4rem",
        marginBottom: "4rem",
      }}
      sx={{
        flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
      }}
    >
      {" "}
      {product && product.imageURL ? (
        <Container
          component="img"
          height="300"
          style={{
            height: "650px",
            maxWidth: "500px",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
          src={product?.imageURL}
        ></Container>
      ) : (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          width: "fit-content",
        }}
        sx={{
          marginLeft: { md: 0, lg: "2rem" },
          marginTop: { sm: 0, md: "4rem", lg: "4rem" },
        }}
      >
        <Typography variant="h3" gutterBottom style={{ fontSize: "2rem" }}>
          {product?.title}
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          style={{
            fontSize: "13px",
            marginTop: "1rem",
            marginBottom: "2rem",
            maxWidth: "400px",
            color: "#545454",
          }}
        >
          {product?.description}
        </Typography>
        <Typography
          variant="h4"
          gutterBottom
          style={{
            fontSize: "1.4rem",
          }}
        >
          {product?.price} SEK
        </Typography>
        {product && product.stock > 0 ? (
          <AddToCartButton
            product={product!}
            size="large"
            style={{
              margin: "2rem",
              maxWidth: "360px",
              backgroundColor: "#CAC2B9",
              letterSpacing: "3px",
            }}
          />
        ) : (
          <Typography>Out of stock</Typography>
        )}
      </Container>
    </Container>
  );
}

export default ProductPage;
