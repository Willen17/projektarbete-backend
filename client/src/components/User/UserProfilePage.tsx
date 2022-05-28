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
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useUser } from "../../context/UserContext";
// import { useEffect, useState } from "react";
// import { makeRequest } from "../../Helper";
import { useLocation } from "react-router-dom";

function UserProfilePage() {
  const [open, setOpen] = React.useState(false);
  const { currentUser, orders } = useUser();
  // const [orders, setOrders] = useState<any>([]);
  // const location = useLocation();

  // useEffect(() => {
  //   const getOrder = async () => {
  //     let response = await makeRequest(`/api/order/${currentUser.data.user._id}`, "GET");
  //     if(response.ok) {
  //       console.log(response);
  //       setOrders(response.data);
  //       return;
  //     }
  //   }
  //   getOrder();
  // }, [location])

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
        Welcome {currentUser.data?.user.name}
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
                    orders.map((order, index) => {
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