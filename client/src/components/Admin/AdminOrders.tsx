import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Container,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { makeRequest } from "../../Helper";
import React, { useState } from "react";
import OrderCard from "./OrderCard";
import { OrderData } from "../../ProductData";

function AdminOrders() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  React.useEffect(() => {
    async function fetch() {
      let response = await makeRequest("/api/order", "GET");
      setOrders(await response.data);
    }
    fetch();
  }, []);

  console.log(orders);
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "20rem",
      }}
    >
      <Typography
        sx={{ textTransform: "uppercase", fontFamily: "Prata", mt: "2rem" }}
        variant="h5"
      >
        Status of orders
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
              <TableRow
                sx={{
                  backgroundColor: "#CAC2B9",
                  color: "#fff",
                }}
              >
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
            {orders.map((order, index) => (
              <OrderCard key={index} order={order} />
            ))}
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default AdminOrders;
