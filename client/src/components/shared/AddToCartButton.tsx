import LoadingButton from "@mui/lab/LoadingButton";
import { CSSProperties, useState } from "react";
import { useCart } from "../../context/CartContextProvider";
import { ProductData } from "../../ProductData";

interface Props {
  product: ProductData;
  size: string | any;
  style?: CSSProperties;
}

const AddToCartButton = (props: Props) => {
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  // change button text for one second
  const buttonOnLoad = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <LoadingButton
      size={props.size}
      variant="contained"
      loading={isLoading}
      loadingIndicator="Adding..."
      style={{ ...props.style, backgroundColor: "#CAC2B9" }}
      onClick={() => {
        buttonOnLoad();
        addToCart(props.product);
      }}
    >
      Add to cart
    </LoadingButton>
  );
};

export default AddToCartButton;
