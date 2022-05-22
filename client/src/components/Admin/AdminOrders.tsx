import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Container,
  IconButton,
  TableCell,
  TableRow,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function AdminOrders() {
  const [open, setOpen] = React.useState(false);
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "35rem",
      }}
    >
      <Typography
        sx={{ textTransform: "uppercase", fontFamily: "Prata", mt: "2rem" }}
        variant="h5"
      >
        Orders
      </Typography>
      <Box
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "2rem",
        }}
      >
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#CAC2B9", color: "#fff" }}>
                <TableCell />
                <TableCell
                  sx={{
                    color: "#fff",
                    fontSize: "1rem",
                    fontfamily: "Roboto, Helvetica, Arial, sans-serif",
                  }}
                >
                  Customer
                </TableCell>
                <TableCell
                  sx={{
                    color: "#fff",
                    fontSize: "1rem",
                    fontfamily: "Roboto, Helvetica, Arial, sans-serif",
                  }}
                  align="right"
                >
                  Ordernumber
                </TableCell>
                <TableCell
                  sx={{
                    color: "#fff",
                    fontSize: "1rem",
                    fontfamily: "Roboto, Helvetica, Arial, sans-serif",
                  }}
                  align="right"
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                  >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                  Sara Lindqvist
                </TableCell>
                <TableCell align="right">34234234</TableCell>
                <TableCell align="right">Sent</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={6}>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box
                      sx={{
                        backgroundColor: "rgb(248, 244, 239)",
                      }}
                    >
                      <Table size="small" aria-label="purchases">
                        <TableHead>
                          <TableRow>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                height: "100px",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                sx={{
                                  mt: "1rem",
                                  mb: "1rem",
                                  mr: "1rem",
                                }}
                                variant="body1"
                              >
                                Change status of order
                              </Typography>
                              <FormControl
                                sx={{
                                  m: 1,
                                  minWidth: 120,
                                  backgroundColor: "white",
                                }}
                                size="small"
                              >
                                <InputLabel id="demo-select-small">
                                  Status
                                </InputLabel>
                                <Select
                                  labelId="demo-select-small"
                                  id="demo-select-small"
                                  // value={}
                                  label="Age"
                                  //onChange={handleChange}
                                >
                                  <MenuItem value={10}>Recieved</MenuItem>
                                  <MenuItem value={20}>Sent</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                          </TableRow>
                        </TableHead>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default AdminOrders;
