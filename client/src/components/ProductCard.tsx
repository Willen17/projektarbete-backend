import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useAdmin } from "../context/AdminPageContext";
import { numWithSpaces } from "../Helper";
import AddToCartButton from "./shared/AddToCartButton";

function ProductCard() {
  const { products } = useAdmin();

  return (
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
      {products.map((product) => (
        <Card sx={cardStyle} key={product.title}>
          <Link to={`/detail/${product.id}`} style={linkStyle}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="250"
                style={imgStyle}
                src={product.image}
                title={product.title}
                id={product.id}
              ></CardMedia>
            </CardActionArea>
            <Typography
              style={{ marginTop: "1rem" }}
              gutterBottom
              variant="h5"
              component="h2"
            >
              {product.title}
            </Typography>
          </Link>
          <Box
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {numWithSpaces(product.price)} SEK
            </Typography>
            <CardActions>
              <AddToCartButton product={product} size="small" />
            </CardActions>
          </Box>
        </Card>
      ))}
    </Box>
  );
}

const cardStyle: SxProps<Theme> = {
  width: 250,
  padding: "1rem",
  boxShadow: "none",
};

const imgStyle: CSSProperties = {
  height: 350,
};

const linkStyle: CSSProperties = {
  textDecoration: "none",
  color: "#333",
};

export default ProductCard;
