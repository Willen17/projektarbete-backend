import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { makeRequest } from "../Helper";
import { useFormik } from "formik";
import { User } from "../context/UserContext";
interface FormValues extends Omit<User, "_id" | "fullname" | "isAdmin"> {
  password: string;
  isApplyingForAdmin: boolean;
}

const ValidationSchema = yup
  .object()
  .shape<Record<keyof FormValues, yup.AnySchema>>({
    firstname: yup.string().required("Required"),
    lastname: yup.string().required("Required"),
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().min(5).max(8).required("Required"),
    isApplyingForAdmin: yup.boolean(),
  });

function SignUp() {
  const navigate = useNavigate();

  const signUpHandler = async (values: FormValues) => {
    let response = await makeRequest("/api/user", "POST", values);
    if (response.ok) {
      navigate("/");
    } else {
      // setError("Email is already in use");
      return;
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik<FormValues>({
      initialValues: {
        firstname: "",
        lastname: "",
        password: "",
        isApplyingForAdmin: false,
        email: "",
      },
      validationSchema: ValidationSchema,
      onSubmit: signUpHandler,
    });

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        minHeight: "35rem",
        alignItems: "center",
      }}
    >
      {/* {errors && (
          <MuiAlert
            style={{
              marginBottom: "-2rem",
              marginTop: "2rem",
            }}
            severity="error"
            onClick={() => setError("")}
          >
            {error}
          </MuiAlert>
        )} */}
      <Box
        sx={{
          height: 510,
          width: 400,
          backgroundColor: "#F3F2F0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: "4rem",
          mb: "4rem",
          paddingBottom: "5rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: { xs: "300px", sm: "450px", md: "600px", lg: "600px" },
          }}
        >
          <Typography
            sx={{
              textTransform: "uppercase",
              fontFamily: "Prata",
              alignItems: "center",
              mt: "5.5rem",
              mb: "1rem",
            }}
            variant="h5"
          >
            Sign Up
          </Typography>
          <Box
            sx={{
              borderTop: "1px solid #AAAAAA",
              width: "50%",
              margin: ".5rem auto",
            }}
          ></Box>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            onSubmit={handleSubmit}
          >
            <TextField
              style={{
                backgroundColor: "white",
                height: "55px",
                marginBottom: ".3rem",
                width: "18rem",
              }}
              id="firstname"
              name="firstname"
              label="First Name"
              type="text"
              margin="normal"
              value={values.firstname}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.firstname && errors.firstname)}
              helperText={errors.firstname}
            />
            <TextField
              style={{
                backgroundColor: "white",
                height: "55px",
                marginBottom: ".3rem",
                width: "18rem",
              }}
              id="lastname"
              name="lastname"
              label="Last Name"
              type="text"
              margin="normal"
              value={values.lastname}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.firstname && errors.firstname)}
              helperText={errors.firstname}
            />
            <TextField
              style={{
                backgroundColor: "white",
                height: "55px",
                marginBottom: ".3rem",
                width: "18rem",
              }}
              id="email"
              name="email"
              label="Email"
              type="text"
              margin="normal"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.firstname && errors.firstname)}
              helperText={errors.firstname}
            />
            <TextField
              style={{
                backgroundColor: "white",
                height: "55px",
                marginBottom: ".3rem",
                width: "18rem",
              }}
              id="password"
              name="password"
              label="Password"
              type="password"
              margin="normal"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.firstname && errors.firstname)}
              helperText={errors.firstname}
            />
            <FormControlLabel
              style={{ color: "grey", marginTop: ".5rem" }}
              control={<Checkbox />}
              value={values.isApplyingForAdmin}
              onChange={handleChange}
              label="Apply for being administrator"
            />
            <Button
              variant="contained"
              style={{
                display: "flex",
                width: "fit-content",
                backgroundColor: "#CAC2B9",
                textTransform: "none",
                marginTop: "1rem",
              }}
              type="submit"
            >
              Sign up
            </Button>
          </form>
          <NavLink
            style={{
              color: "#303030",
              textDecoration: "none",
              marginTop: "2.5rem",
            }}
            to="/login"
          >
            Already have an account? <b>Log in</b>
          </NavLink>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
