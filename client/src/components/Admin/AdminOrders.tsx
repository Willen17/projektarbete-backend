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
        {orders.map((order, index) => (
          <OrderCard key={index} order={order} />
        ))}
      </Box>
    </Container>
  );
}

export default AdminOrders;
