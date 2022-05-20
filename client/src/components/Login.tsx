import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Alert,
    AlertProps
  } from "@mui/material";
import { useState } from "react";
  import { NavLink } from "react-router-dom";
import { makeRequest } from "../Helper";

function MuiAlert(props: JSX.IntrinsicAttributes & AlertProps) {
    return <Alert elevation={6} variant="filled" {...props} />;
  }
  
  function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const signInHandler = (e) => {
        e.preventDefault();
        if(email === '' || password === '') {
            setError("All fields are required");
            return;
        }
        setError('');
        const userData = {
            email: email,
            password: password,
            isAdmin: false,
        }

        makeRequest('/api/login', "POST", userData);
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
        {error && (
            <MuiAlert 
                style={{
                    marginBottom: '-2rem', 
                    marginTop: '2rem'
                }} 
                severity="error" 
                onClick={() => setError('')}>
                {error}
            </MuiAlert>
        )}
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
              Log In
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
                onSubmit={signInHandler}>
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
                    onChange={e => setEmail(e.target.value)}
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
                    onChange={e => setPassword(e.target.value)}
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
                Log In
                </Button>
            </form>
            <NavLink
              style={{
                color: "#303030",
                textDecoration: "none",
                marginTop: "3rem",
              }}
              to="/signup"
            >
              Don't have an account? <b>Sign up</b>
            </NavLink>
          </Box>
        </Box>
      </Container>
    );
  }
  
  export default LogIn;