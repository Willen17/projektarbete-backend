import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

function AppliedForAdmin() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "25rem",
      }}
    >
      <Typography
        sx={{
          textTransform: "uppercase",
          fontFamily: "Prata",
          mt: "2rem",
          mb: "2rem",
        }}
        variant="h5"
      >
        Applied For Admin
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#CAC2B9", color: "#fff" }}>
              <TableCell
                sx={{
                  color: "#fff",
                  fontSize: "1rem",
                  fontfamily: "Roboto, Helvetica, Arial, sans-serif",
                  borderBottom: "none",
                }}
              >
                Name
              </TableCell>
            </TableRow>
          </TableHead>
          <TableRow style={{ display: "flex", flexDirection: "column" }}>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TableCell
                sx={{
                  color: "#000",
                  fontSize: "1rem",
                  fontfamily: "Roboto, Helvetica, Arial, sans-serif",
                  borderBottom: "none",
                  mt: "1rem",
                }}
              >
                Sara Lindqvist
              </TableCell>
              <TableCell
                sx={{
                  color: "#000",
                  fontSize: "1rem",
                  fontfamily: "Roboto, Helvetica, Arial, sans-serif",
                  borderBottom: "none",
                }}
                align="right"
              >
                <FormControl
                  sx={{
                    m: 1,
                    minWidth: 120,
                    backgroundColor: "white",
                  }}
                  size="small"
                >
                  <InputLabel id="demo-select-small">Approve</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    // value={}
                    label="Age"
                    //onChange={}
                  >
                    <MenuItem value={"notSent"}>Yes</MenuItem>
                    <MenuItem value={"sent"}>No</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TableCell
                sx={{
                  color: "#000",
                  fontSize: "1rem",
                  fontfamily: "Roboto, Helvetica, Arial, sans-serif",
                  borderBottom: "none",
                  mt: "1rem",
                }}
              >
                Sara Lindqvist
              </TableCell>
              <TableCell
                sx={{
                  color: "#000",
                  fontSize: "1rem",
                  fontfamily: "Roboto, Helvetica, Arial, sans-serif",
                  borderBottom: "none",
                }}
                align="right"
              >
                <FormControl
                  sx={{
                    m: 1,
                    minWidth: 120,
                    backgroundColor: "white",
                  }}
                  size="small"
                >
                  <InputLabel id="demo-select-small">Approve</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    // value={}
                    label="Age"
                    //onChange={}
                  >
                    <MenuItem value={"notSent"}>Yes</MenuItem>
                    <MenuItem value={"sent"}>No</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
            </Box>
          </TableRow>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default AppliedForAdmin;
