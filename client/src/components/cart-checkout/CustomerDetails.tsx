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
          height: 600,
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
            width: { xs: "240px", sm: "450px", md: "600px", lg: "600px" },
          }}
        >
          <TextField
            style={{
              backgroundColor: "white",
              height: "55px",
              marginBottom: "1.5rem",
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
              marginBottom: "1.5rem",
            }}
            id="street"
            name="street"
            label="Delivery Street"
            type="text"
            margin="normal"
            value={values.street}
            onChange={handleChange}
            error={touched.street && Boolean(errors.street)}
            helperText={errors.street}
          />
          <TextField
            style={{
              backgroundColor: "white",
              height: "55px",
              marginBottom: "1.5rem",
            }}
            id="zipcode"
            name="zipcode"
            label="Zip Code"
            type="text"
            margin="normal"
            value={values.zipcode}
            onChange={handleChange}
            error={touched.zipcode && Boolean(errors.zipcode)}
            helperText={errors.zipcode}
          />
          <TextField
            style={{
              backgroundColor: "white",
              height: "55px",
              marginBottom: "1.5rem",
            }}
            id="city"
            name="city"
            label="City"
            type="text"
            margin="normal"
            value={values.city}
            onChange={handleChange}
            error={touched.city && Boolean(errors.city)}
            helperText={errors.city}
          />

          <TextField
            style={{
              backgroundColor: "white",
              height: "55px",
              marginBottom: "1.5rem",
            }}
            id="email"
            name="email"
            label="Email"
            type="text"
            margin="normal"
            value={values.email}
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            helperText={errors.email}
          />
          <TextField
            style={{
              backgroundColor: "white",
              height: "55px",
              marginBottom: "1.5rem",
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
