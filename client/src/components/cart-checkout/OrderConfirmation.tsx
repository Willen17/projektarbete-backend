import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useOrder } from "../../context/OrderContextProvider";
import {
  calculateVat,
  numWithSpaces,
  sumProductPrice,
  UseSumTotal,
} from "../../Helper";
import HomeButton from "../shared/HomeButton";

const OrderConfirmation = () => {
  const { order } = useOrder();

  return (
    <Container
      sx={{
        padding: "2rem",
        minHeight: "35rem",
      }}
    >
      {order.map((orderDetail) => {
        return (
          <Container
            maxWidth="md"
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: { xs: "0rem", sm: ".5rem", md: "1rem" },
              background: "#F3F2F0",
              textAlign: "center",
            }}
            key={orderDetail.orderNo}
          >
            <Typography
              sx={{
                textTransform: "uppercase",
                fontFamily: "Prata",
                mt: "1rem",
              }}
              variant="h6"
            >
              Thank you for your purchase!
            </Typography>
            <Typography
              sx={{ fontFamily: "Prata", mt: "1rem" }}
              variant="inherit"
            >
              Order#: {orderDetail.orderNo}
            </Typography>
            <Typography
              sx={{ fontFamily: "Prata", mt: "1rem" }}
              variant="inherit"
            ></Typography>
            <Box>
              <TableContainer>
                <Table aria-label="order list">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontSize: { xs: "12px", sm: "14px" },
                          width: { xs: "100px", sm: "150px", md: "200px" },
                        }}
                      >
                        Article
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: { xs: "12px", sm: "14px" },
                          padding: { xs: 0, sm: 0, md: "1rem" },
                        }}
                        style={{ width: "50px" }}
                      >
                        Quantity
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          fontSize: { xs: "12px", sm: "14px" },
                          padding: { xs: 0, sm: "1rem" },
                        }}
                      >
                        Unit Price
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ fontSize: { xs: "12px", sm: "14px" } }}
                      >
                        Subtotal
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderDetail.boughtItems.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell
                          size="small"
                          component="th"
                          scope="row"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            fontSize: { xs: "12px", sm: "14px" },
                          }}
                        >
                          <img
                            src={product.image}
                            alt={product.title}
                            height="60px"
                          />
                          {product.title}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontSize: { xs: "12px", sm: "14px" } }}
                        >
                          {product.quantity}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            fontSize: { xs: "12px", sm: "14px" },
                            padding: { xs: 0, sm: "1rem" },
                          }}
                        >
                          {numWithSpaces(product.price)} SEK
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            fontSize: { xs: "12px", sm: "14px" },
                          }}
                        >
                          {numWithSpaces(sumProductPrice(product))} SEK
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell
                        size="small"
                        align="right"
                        sx={{
                          border: "none",
                          padding: "30px 16px 5px 16px",
                          fontSize: { xs: "12px", sm: "14px" },
                        }}
                        colSpan={3}
                      >
                        Item Subtotal
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          padding: "30px 16px 5px 16px",
                          border: "none",
                          fontSize: { xs: "12px", sm: "14px" },
                        }}
                        colSpan={1}
                      >
                        {numWithSpaces(
                          UseSumTotal(orderDetail.boughtItems, false) -
                            calculateVat(orderDetail.boughtItems)
                        )}
                        &nbsp;SEK
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        align="right"
                        sx={{
                          border: "none",
                          padding: "4px 16px",
                          fontSize: { xs: "12px", sm: "14px" },
                        }}
                        colSpan={3}
                      >
                        VAT 25%
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          padding: "4px 16px",
                          border: "none",
                          fontSize: { xs: "12px", sm: "14px" },
                        }}
                        colSpan={1}
                      >
                        {numWithSpaces(calculateVat(orderDetail.boughtItems))}
                        &nbsp;SEK
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        align="right"
                        colSpan={3}
                        sx={{
                          border: "none",
                          padding: "4px 16px",
                          fontSize: { xs: "12px", sm: "14px" },
                        }}
                      >
                        Delivery
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          padding: "4px 16px",
                          border: "none",
                          fontSize: { xs: "12px", sm: "14px" },
                        }}
                        colSpan={1}
                      >
                        {numWithSpaces(orderDetail.shipmentOption.cost)} SEK
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        align="right"
                        sx={{
                          border: "none",
                          fontWeight: "bold",
                          padding: "4px 16px",
                          fontSize: { xs: "12px", sm: "14px" },
                        }}
                        colSpan={3}
                      >
                        Total
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          fontWeight: "bold",
                          padding: "4px 16px",
                          border: "none",
                          fontSize: { xs: "12px", sm: "14px" },
                        }}
                        colSpan={1}
                      >
                        {numWithSpaces(
                          UseSumTotal(orderDetail.boughtItems, true)
                        )}
                        &nbsp;SEK
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          border: "none",
                          padding: { xs: "16px 16px 0px 16px", sm: "4px 16px" },
                          fontSize: { xs: "12px", sm: "14px" },
                        }}
                      >
                        Delivery Method
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "none",
                          padding: { xs: "16px 16px 0px 16px", sm: "4px 16px" },
                          fontWeight: "bold",
                          fontSize: { xs: "12px", sm: "14px" },
                        }}
                        colSpan={3}
                      >
                        {orderDetail.shipmentOption.providerName}&nbsp;(
                        {orderDetail.shipmentOption.deliveryTime})
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          border: "none",
                          padding: "16px 16px 0px 16px",
                          fontSize: { xs: "12px", sm: "14px" },
                        }}
                      >
                        Contact Information
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "none",
                          padding: "16px 16px 0 16px",
                          fontWeight: "bold",
                          fontSize: { xs: "12px", sm: "14px" },
                        }}
                        colSpan={3}
                      >
                        {orderDetail.customer.name}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        colSpan={1}
                        sx={{
                          border: "none",
                          padding: "0 16px",
                          fontSize: { xs: "12px", sm: "14px" },
                        }}
                      />
                      <TableCell
                        sx={{
                          border: "none",
                          padding: "0 16px",
                          fontWeight: "bold",
                          fontSize: { xs: "12px", sm: "14px" },
                        }}
                        colSpan={3}
                      >
                        {orderDetail.customer.address}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        colSpan={1}
                        sx={{
                          border: "none",
                          padding: "0px 16px",
                          fontSize: { xs: "12px", sm: "14px" },
                        }}
                      />
                      <TableCell
                        sx={{
                          border: "none",
                          padding: "0px 16px",
                          fontWeight: "bold",
                          fontSize: { xs: "12px", sm: "14px" },
                        }}
                        colSpan={3}
                      >
                        {orderDetail.customer.email}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        colSpan={1}
                        sx={{
                          border: "none",
                          padding: "0px 16px",
                          fontSize: { xs: "12px", sm: "14px" },
                        }}
                      />
                      <TableCell
                        sx={{
                          border: "none",
                          padding: "0px 16px",
                          fontWeight: "bold",
                          fontSize: { xs: "12px", sm: "14px" },
                        }}
                        colSpan={3}
                      >
                        {orderDetail.customer.phoneNumber}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          border: "none",
                          padding: "16px",
                          fontSize: { xs: "12px", sm: "14px" },
                        }}
                      >
                        Payment Method
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "none",
                          fontWeight: "bold",
                          fontSize: { xs: "12px", sm: "14px" },
                        }}
                        colSpan={3}
                      >
                        {orderDetail.paymentMethod}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <HomeButton message="Back to home" />
          </Container>
        );
      })}
    </Container>
  );
};

export default OrderConfirmation;
