import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import valid from "card-validator";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useCart } from "../../context/CartContextProvider";
import { Customer, useOrder } from "../../context/OrderContextProvider";
import CustomerDetails from "./CustomerDetails";
import DeliveryOptions from "./DeliveryOptions";
import PaymentMethod from "./PaymentMethod";
import PriceOverview from "./PriceOverview";
export interface FormValues extends Customer {
  cardNumber: number | "";
  cardExpiry: number | "";
  cardCVC: number | "";
  swish: number | "";
  invoice: number | "";
}

function CheckoutFormContainer() {
  const navigate = useNavigate();
  const { emptyCart, isSwish, isCreditCard, isInvoice } = useCart();
  const { createOrder } = useOrder();

  const [isLoading, setIsLoading] = useState(false);
  console.log(isLoading);

  const phoneRegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  const personalIdentityRegExp =
    /^(19|20)?(\d{6}([-+]|\s)\d{4}|(?!19|20)\d{10})$/;

  const InitialValue: FormValues = {
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
    swish: "",
    invoice: "",
  };

  const ValidationSchema = yup.object().shape({
    name: yup.string().min(2).required("Required"),
    address: yup.string().min(5).required("Required"),
    email: yup.string().email("Invalid email").required("Required"),
    phoneNumber: yup
      .string()
      .required("Required")
      .matches(phoneRegExp, "Invalid phone number"),

    cardNumber: yup.lazy(() => {
      if (isCreditCard) {
        return yup
          .string()
          .required("Required")
          .test(
            "test-number",
            "Invalid card number",
            (value) => valid.number(value).isValid
          );
      }
      return yup.string();
    }),

    cardExpiry: yup.lazy(() => {
      if (isCreditCard) {
        return yup
          .string()
          .required("Required")
          .test(
            "test-number",
            "Invalid",
            (value) => valid.expirationDate(value).isValid
          );
      }
      return yup.string();
    }),

    cardCVC: yup.lazy(() => {
      if (isCreditCard) {
        return yup
          .string()
          .required("Required")
          .test("test-number", "Invalid", (value) => valid.cvv(value).isValid);
      }

      return yup.string();
    }),

    swish: yup.lazy(() => {
      if (isSwish) {
        return yup
          .string()
          .matches(phoneRegExp, "Invalid phone number")
          .required("Required");
      }
      return yup.string();
    }),

    invoice: yup.lazy(() => {
      if (isInvoice) {
        return yup
          .string()
          .required("Required")
          .matches(personalIdentityRegExp, "Invalid personal identity number");
      }
      return yup.string();
    }),
  });

  return (
    <Formik
      initialValues={InitialValue}
      validationSchema={ValidationSchema}
      onSubmit={(values: FormValues) => {
        let promise = new Promise((resolve) => {
          setIsLoading(true);
          setTimeout(() => {
            createOrder(values);
            resolve(values);
          }, 2000);
        });
        promise
          .then(() => {
            setIsLoading(false);
            navigate("/confirmation");
            emptyCart();
          })
          .catch((error: Error) => {
            alert(error.message);
          });
      }}
    >
      <Form>
        <DeliveryOptions />
        <CustomerDetails />
        <PaymentMethod />
        <PriceOverview />
        <Box style={{ textAlign: "center" }}>
          <LoadingButton
            size="large"
            variant="contained"
            loading={isLoading}
            disabled={isLoading}
            loadingIndicator="Confirming..."
            style={{
              textAlign: "center",
              margin: "2rem",
              letterSpacing: "3px",
              backgroundColor: "#CAC2B9",
            }}
            sx={{
              width: {
                xs: "200px",
                sm: "400px",
                md: "400px",
                lg: "400px",
              },
            }}
            type="submit"
          >
            Confirm purchase
          </LoadingButton>
        </Box>
      </Form>
    </Formik>
  );
}

export default CheckoutFormContainer;
