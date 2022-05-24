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
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: { xs: "0rem", sm: ".5rem", md: "1rem" },
          background: "#F3F2F0",
          textAlign: "center",
        }}
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
        <Typography sx={{ fontFamily: "Prata", mt: "1rem" }} variant="inherit">
          Order#: SKA FIXAS
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
                {order?.products.map((product) => (
                  <TableRow key={product._id}>
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
                        src={product.imageURL}
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
                      UseSumTotal(order!.products, false) -
                        calculateVat(order!.products)
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
                    {numWithSpaces(calculateVat(order!.products))}
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
                    {numWithSpaces(order!.deliveryMethod.cost)} SEK
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
                    {numWithSpaces(UseSumTotal(order!.products, true))}
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
                    {order?.deliveryMethod.title}&nbsp;(
                    {order?.deliveryMethod.deliveryTime})
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
                    {order?.customer}
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
                    {order?.address.street}
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
                    colSpan={1}
                  >
                    {order?.address.city}
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
                    colSpan={1}
                  >
                    {order?.address.zipcode}
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
                    {order?.email}
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
                    {order?.phoneNumber}
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
                    {order?.paymentMethod}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <HomeButton message="Back to home" />
      </Container>
    </Container>
  );
};

export default OrderConfirmation;
