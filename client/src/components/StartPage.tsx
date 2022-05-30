import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAdmin } from "../context/AdminPageContext";
import { makeRequest, numWithSpaces } from "../Helper";
import { ProductData } from "../ProductData";

const StartPage = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [randomProducts, setRandomProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await makeRequest<ProductData[]>(`/api/product`, "GET");
      console.log(response.data);
      setProducts(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getRandomProduct = () => {
      let randoms: ProductData[] = [];
      const numOfRandomProducts: number = 6;
      while (randoms.length < numOfRandomProducts) {
        let random: ProductData =
          products[Math.floor(Math.random() * products.length)];
        if (randoms.indexOf(random) === -1) {
          randoms.push(random);
        }
      }
      setRandomProducts(randoms);
    };
    if (products.length) {
      getRandomProduct();
    } else {
      return;
    }
  }, [products]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {randomProducts.map((product) => (
        <Box
          key={product.title}
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Box
            component="img"
            sx={{
              width: {
                xs: 1,
                md: `calc(100vw/2)`,
                lg: `calc(100vw/3)`,
              },
            }}
            alt={product.title}
            src={product.imageURL}
          />
          <Box
            component={Link}
            {...{
              to: `/detail/${product._id}`,
            }}
            style={{
              position: "absolute",
              top: Math.floor(Math.random() * (400 - 50) + 50),
              left: Math.floor(Math.random() * (300 - 50) + 50),
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            <Typography
              variant="h5"
              color="white"
              fontFamily="Prata"
              style={{
                textShadow: "#3c3c3c 1px 0 20px",
              }}
            >
              {product.title} <br />
            </Typography>
            <Typography
              variant="subtitle2"
              color="white"
              fontFamily="Prata"
              style={{ textShadow: "#3c3c3c 1px 0 20px" }}
            >
              {numWithSpaces(product.price)} SEK
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default StartPage;
