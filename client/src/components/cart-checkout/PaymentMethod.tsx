import CreditCardIcon from "@mui/icons-material/CreditCard";
import { Box, Container, Typography } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";
import invoiceLogo from "../../assets/images/invoiceLogo.png";
import SwishLogo from "../../assets/images/SwishLogo.svg";
import { useCart } from "../../context/CartContextProvider";
import PaymentCreditCard from "./payment-methods/PaymentCreditCard";
import PaymentInvoice from "./payment-methods/PaymentInvoice";
import PaymentSwish from "./payment-methods/PaymentSwish";

const PaymentMethod = () => {
  const [selectPayment, setSelectPayment] = useState("credit card");
  const {
    paymentMethod,
    selectPaymentMethod,
    selectSwish,
    selectCreditCard,
    selectInvoice,
  } = useCart();

  /** handle selected of payment method */
  const handleToggle = (event, newSelection: string | null) => {
    if (newSelection !== null) {
      setSelectPayment(newSelection);
      selectPaymentMethod(event.currentTarget.name);
    }
  };

  return (
    <Container
      sx={{
        padding: "1rem",
      }}
    >
      <Typography
        sx={{
          textTransform: "uppercase",
          fontFamily: "Prata",
          mt: "3rem",
          mb: "1rem",
        }}
        variant="h5"
      >
        4. Payment Method
      </Typography>
      <Box
        sx={{
          backgroundColor: "#F3F2F0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "2rem",
          alignItems: "center",
        }}
      >
        <ToggleButtonGroup
          value={selectPayment}
          exclusive
          onChange={handleToggle}
          aria-label="payment method"
        >
          <ToggleButton
            name="Credit Card"
            aria-label="credit card"
            value="credit card"
            onClick={selectCreditCard}
          >
            <CreditCardIcon sx={{ color: "#6C665F" }} />
          </ToggleButton>
          <ToggleButton
            id="swish"
            name="Swish"
            aria-label="swish"
            value="swish"
            onClick={selectSwish}
          >
            <img src={SwishLogo} alt="Swish" height="20px" />
          </ToggleButton>
          <ToggleButton
            id="invoice"
            name="Invoice"
            aria-label="invoice"
            value="invoice"
            onClick={selectInvoice}
          >
            <img src={invoiceLogo} alt="invoice" height="20px" />
          </ToggleButton>
        </ToggleButtonGroup>

        <Container>
          {paymentMethod === "Swish" ? (
            <PaymentSwish />
          ) : paymentMethod === "Invoice" ? (
            <PaymentInvoice />
          ) : (
            <PaymentCreditCard />
          )}
        </Container>
      </Box>
    </Container>
  );
};

export default PaymentMethod;
