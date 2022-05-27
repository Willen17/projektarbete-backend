import { Container } from "@mui/material";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContextProvider";
import { useUser } from "../../context/UserContext";
import EmptyCart from "../EmptyCart";
import CheckoutFormContainer from "./CheckoutFormContainer";
import ShoppingCart from "./ShoppingCart";

function CheckoutPage() {
  const { cart } = useCart();
  const { isLoggedIn } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn) return;
    navigate("/login", { replace: true, state: location.pathname });
  }, [isLoggedIn]);

  return cart.length < 1 ? (
    <EmptyCart />
  ) : (
    <Container>
      <ShoppingCart />
      <CheckoutFormContainer />
    </Container>
  );
}

export default CheckoutPage;
