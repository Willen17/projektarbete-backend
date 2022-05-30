import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Container,
  TableCell,
  TableRow
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { useUser } from "../../context/UserContext";

function UserProfilePage() {
  const { currentUser, orders } = useUser();

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
        Welcome {currentUser?.name}
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

                  {orders.length > 0 ? 
                    orders.map((order: { _id: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; createdAt: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; isOrderSent: any; }, index: React.Key | null | undefined) => {
                      return (
                        <TableBody key={index}>
                        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>

                          <TableCell align="center">{order._id}</TableCell>
                          <TableCell align="center">{order.createdAt}</TableCell>
                          <TableCell align="center">{order.isOrderSent ? 'Order sent' : 'Order registered'}</TableCell>
                        </TableRow>
                      </TableBody>
                    )})
                  :          
                    <TableBody>   
                      <TableRow>
                        <TableCell>
                          No orders to show
                        </TableCell>
                      </TableRow>             
                    </TableBody>
                  }

          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default UserProfilePage;