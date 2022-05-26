import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Container,
  IconButton,
  TableCell,
  TableRow
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function UserProfilePage() {
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
        Profile
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
            <TableHead >
              <TableRow sx={{ backgroundColor: "#CAC2B9", color: "#fff" }}>
                <TableCell />
                <TableCell
                  sx={{
                    color: "#fff",
                    fontSize: "1rem",
                    fontfamily: "Roboto, Helvetica, Arial, sans-serif",
                  }}
                  align="center"
                >
                  Ordernumber
                </TableCell>
                <TableCell
                  sx={{
                    color: "#fff",
                    fontSize: "1rem",
                    fontfamily: "Roboto, Helvetica, Arial, sans-serif",
                  }}
                  align="center"
                >
                  Date
                </TableCell>
                <TableCell
                  sx={{
                    color: "#fff",
                    fontSize: "1rem",
                    fontfamily: "Roboto, Helvetica, Arial, sans-serif",
                  }}
                  align="center"
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
                    sx={{
                      padding: "0px",
                      margin: "0px",
                    }}
                    onClick={() => setOpen(!open)}
                  >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                    8334926
                </TableCell>
                <TableCell align="center">2022-05-25</TableCell>
                <TableCell align="center">Order registered</TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  colSpan={6}
                  sx={{
                    padding: "0px",
                    margin: "0px",
                  }}
                >
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box
                      sx={{
                        backgroundColor: "rgb(248, 244, 239)",
                        padding: "0px",
                        margin: "0px",
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

export default UserProfilePage;