import { Box, Container, Typography } from "@mui/material";
import HomeButton from "./HomeButton";

interface Props {
  page: string;
}

const EmptyPage = (props: Props) => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        minHeight: "35rem",
      }}
    >
      <Typography
        sx={{ textTransform: "uppercase", fontFamily: "Prata", mt: "1rem" }}
        variant="h5"
      >
        {props.page}
      </Typography>
      <Box
        sx={{
          pt: "10rem",
        }}
      >
        <Typography sx={{ textAlign: "center", mb: "3rem" }}>
          We are working hard to source new products from worldwide. <br />
          Sign up for our membership to make sure you are the first to be
          notified when we officially launch our store.
        </Typography>
        <HomeButton message="Back to home" />
      </Box>
    </Container>
  );
};

export default EmptyPage;
