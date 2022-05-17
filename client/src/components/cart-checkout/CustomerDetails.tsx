import { Box, Container, TextField, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { FormValues } from "./CheckoutFormContainer";

const CustomerDetails = () => {
  const { values, errors, touched, handleChange } =
    useFormikContext<FormValues>();

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
        3. Contact Details
      </Typography>
      <Box
        sx={{
          height: 470,
          backgroundColor: "#F3F2F0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "300px", sm: "450px", md: "600px", lg: "600px" },
          }}
        >
          <TextField
            style={{
              backgroundColor: "white",
              height: "55px",
              marginBottom: "1rem",
            }}
            id="name"
            name="name"
            label="Name"
            type="text"
            margin="normal"
            value={values.name}
            onChange={handleChange}
            error={touched.name && Boolean(errors.name)}
            helperText={errors.name}
          />
          <TextField
            style={{
              backgroundColor: "white",
              height: "55px",
              marginBottom: "1rem",
            }}
            id="address"
            name="address"
            label="Delivery Address"
            type="text"
            margin="normal"
            value={values.address}
            onChange={handleChange}
            error={touched.address && Boolean(errors.address)}
            helperText={errors.address}
          />
          <TextField
            style={{
              backgroundColor: "white",
              height: "55px",
              marginBottom: "1rem",
            }}
            id="email"
            name="email"
            label="Email"
            type="text"
            margin="normal"
            value={values.email}
            onChange={handleChange}
            error={touched.address && Boolean(errors.email)}
            helperText={errors.email}
          />
          <TextField
            style={{
              backgroundColor: "white",
              height: "55px",
              marginBottom: "1rem",
            }}
            id="phoneNumber"
            name="phoneNumber"
            label="Phone number"
            type="text"
            margin="normal"
            value={values.phoneNumber}
            onChange={handleChange}
            error={touched.phoneNumber && Boolean(errors.phoneNumber)}
            helperText={errors.phoneNumber}
          />
        </Box>
      </Box>
    </Container>
  );
};
export default CustomerDetails;
