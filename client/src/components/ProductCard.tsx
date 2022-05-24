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
import { ProductData } from "../ProductData";
import AddToCartButton from "./shared/AddToCartButton";

interface cardProps {
  product: ProductData;
}

function ProductCard(props: cardProps) {
  return (
    <Card sx={cardStyle} key={props.product.title}>
      <Link to={`/detail/${props.product._id}`} style={linkStyle}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="250"
            style={imgStyle}
            src={props.product.imageURL}
            title={props.product.title}
            id={props.product._id}
          ></CardMedia>
        </CardActionArea>
        <Typography
          style={{ marginTop: "1rem" }}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {props.product.title}
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
          {numWithSpaces(props.product.price)} SEK
        </Typography>
        <CardActions>
          <AddToCartButton product={props.product} size="small" />
        </CardActions>
      </Box>
    </Card>
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
