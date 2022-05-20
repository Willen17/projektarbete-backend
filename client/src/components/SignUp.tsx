import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    TextField,
    Typography,
  } from "@mui/material";
import { useState } from "react";
  import { NavLink } from "react-router-dom";
import { makeRequest } from "../Helper";
  
  function SignUp() {
      const [firstName, setFirstName] = useState('');
      const [lastName, setLastName] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');

      const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
      }

      const handleLastNameChange = (e) => {
        setLastName(e.target.value);
      }

      const handleEmailChange = (e) => {
        setEmail(e.target.value);
      }

      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      }

    const signUpHandler = (e) => {
        e.preventDefault();
        const newUserData = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password,
            isAdmin: false,
        }

        makeRequest('/api/user', "POST", newUserData);
    }

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
                    justifyContent: "center"
                }}
                onSubmit={signUpHandler}>
                <TextField
                style={{
                    backgroundColor: "white",
                    height: "55px",
                    marginBottom: ".3rem",
                    width: "18rem",
                }}
                id="firstName"
                name="firstName"
                label="First Name"
                type="text"
                margin="normal"
                onChange={handleFirstNameChange}
                />
                <TextField
                style={{
                    backgroundColor: "white",
                    height: "55px",
                    marginBottom: ".3rem",
                    width: "18rem",
                }}
                id="lastName"
                name="lastName"
                label="Last Name"
                type="text"
                margin="normal"
                onChange={handleLastNameChange}
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
                onChange={handleEmailChange}
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
                onChange={handlePasswordChange}
                />
                <FormControlLabel
                style={{ color: "grey", marginTop: ".5rem" }}
                control={<Checkbox />}
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