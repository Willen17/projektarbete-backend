import { Box, Container, Typography } from "@mui/material";
import HomeButton from "./shared/HomeButton";

const NotFound = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
      }}
    >
      <Box
        sx={{
          height: "20rem",
          pt: "10rem",
        }}
      >
        <Typography sx={{ textAlign: "center", fontFamily: "Prata" }}>
          This page doesn't seem to exist.
        </Typography>
        <HomeButton message="Back to home" />
      </Box>
    </Container>
  );
};

export default NotFound;
