import { Container } from "@mui/material";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContextProvider";
import { useUser } from "../../context/UserContext";
import EmptyCart from "../EmptyCart";
import CheckoutFormContainer from "./CheckoutFormContainer";
import ShoppingCart from "./ShoppingCart";

function CheckoutPage() {
  const { cart } = useCart();
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (currentUser) return;
    toast.error("You need to login to place an order");
    navigate("/login", { replace: true, state: location.pathname });
  }, [currentUser]);

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
