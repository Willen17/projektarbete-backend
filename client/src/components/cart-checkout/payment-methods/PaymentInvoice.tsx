import { Box, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import invoiceLogo from "../../../assets/images/invoiceLogo.png";
import { FormValues } from "../../cart-checkout/CheckoutFormContainer";

const PaymentInvoice = () => {
  const { values, errors, touched, handleChange } =
    useFormikContext<FormValues>();

  return (
    <Box
      sx={{
        display: "flex",
        m: "2rem",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <img
        src={invoiceLogo}
        alt="invoice"
        height="25px"
        style={{ marginTop: ".5rem", marginRight: "1rem" }}
      />
      <TextField
        style={{
          backgroundColor: "white",
          width: "220px",
          height: "40px",
        }}
        id="invoice"
        name="invoice"
        label="Personal Identity Number"
        type="text"
        size="small"
        placeholder="YYYYMMDD-XXXX"
        value={values.invoice}
        onChange={handleChange}
        error={touched.invoice && Boolean(errors.invoice)}
        helperText={errors.invoice}
      />
    </Box>
  );
};

export default PaymentInvoice;
