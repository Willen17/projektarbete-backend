import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { Box, Container, Grid, Link, Typography } from "@mui/material";

function Footer() {
  return (
    <footer>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 8 }}
        bgcolor="#6C665F"
        color="white"
        sx={{ boxShadow: 3 }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>
                <Typography variant="subtitle1">Customer Care</Typography>
              </Box>

              <Link underline="none" href="/" color="inherit">
                <Typography variant="body2" mt="1rem">
                  Contact us
                </Typography>
              </Link>
              <Link underline="none" href="/" color="inherit">
                <Typography variant="body2" mt=".2rem">
                  Support
                </Typography>
              </Link>
              <Link underline="none" href="/" color="inherit">
                <Typography variant="body2" mt=".2rem">
                  FAQ
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>
                <Typography variant="subtitle1">Collection</Typography>
              </Box>
              <Link underline="none" href="/" color="inherit">
                <Typography variant="body2" mt="1rem">
                  The Lookbook
                </Typography>
              </Link>
              <Link underline="none" href="/" color="inherit">
                <Typography variant="body2" mt=".2rem">
                  2022 Spring Collection
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>
                <Typography variant="subtitle1">About Us</Typography>
              </Box>
              <Link underline="none" href="/" color="inherit">
                <Typography variant="body2" mt="1rem">
                  Design philiosophy
                </Typography>
              </Link>
              <Link underline="none" href="/" color="inherit">
                <Typography variant="body2" mt=".2rem">
                  Find a store near you
                </Typography>
              </Link>
              <Link underline="none" href="/" color="inherit">
                <Typography variant="body2" mt=".2rem">
                  Work with us
                </Typography>
              </Link>
            </Grid>
          </Grid>
          <Box
            textAlign="center"
            pt={{ xs: 5, sm: 8 }}
            pb={{ xs: 5, sm: 0 }}
            display="flex"
            justifyContent="space-evenly"
          >
            <LocalPhoneIcon />
            <InstagramIcon />
            <FacebookIcon />
          </Box>
          <Typography
            variant="body2"
            textAlign="center"
            pt={{ xs: 2, sm: 4 }}
            pb={{ xs: 2, sm: 0 }}
            style={{ fontFamily: "Prata" }}
          >
            comme ci comme ça &reg; {new Date().getFullYear()}
          </Typography>
        </Container>
      </Box>
    </footer>
  );
}

export default Footer;
