import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
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
