import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Collapse,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  TableContainer,
  SelectChangeEvent,
} from "@mui/material";
import { OrderData } from "../../ProductData";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Fragment, useEffect, useState } from "react";
import { makeRequest, numWithSpaces, sumProductPrice } from "../../Helper";
import { toast } from "react-toastify";

interface OrderProps {
  order: OrderData;
}

function OrderCard(props: OrderProps) {
  const [open, setOpen] = useState(false);
  const [isSent, setIsSent] = useState<string>();

  useEffect(() => {
    if (props.order.isOrderSent) {
      return setIsSent("sent");
    } else setIsSent("notSent");
  }, [props.order.isOrderSent]);

  const handleChange = async (event: SelectChangeEvent) => {
    if (event.target.value === "sent") {
      let response = await makeRequest(`/api/order/${props.order._id}`, "PUT", {
        isOrderSent: true,
      });
      if (!response.ok) return toast.error(response.data);

      return toast.success(`Order: ${props.order._id} status changed to sent`);
    } else {
      let response = await makeRequest(`/api/order/${props.order._id}`, "PUT", {
        isOrderSent: false,
      });
      if (!response.ok) return toast.error(response.data);

      return toast.success(
        `Order: ${props.order._id} status changed to not sent`
      );
    }
  };

  return (
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
        <TableBody>
          <Fragment>
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
              <TableCell component="th" scope="row">
                {props.order.customer.firstname}
              </TableCell>
              <TableCell align="right">{props.order._id}</TableCell>
              <TableCell align="right">
                {!props.order.isOrderSent ? "Not sent" : "Sent"}
              </TableCell>
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
                    <Table size="medium" aria-label="purchases">
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" sx={{ fontWeight: "bold" }}>
                            Products
                          </TableCell>
                          <TableCell />
                        </TableRow>
                        {props.order.products.map((product) => (
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
                                src={`/api/media/${product.imageId}`}
                                alt={product.title}
                                height="60px"
                              />
                              {product.title}
                            </TableCell>
                            {/* <TableCell
                              align="center"
                              sx={{ fontSize: { xs: "12px", sm: "14px" } }}
                            >
                              {product.quantity}
                            </TableCell> */}
                            <TableCell
                              align="right"
                              sx={{
                                fontSize: { xs: "12px", sm: "14px" },
                                padding: { xs: 0, sm: "1rem" },
                              }}
                            >
                              {numWithSpaces(product.price)} SEK
                            </TableCell>
                            {/* <TableCell
                              align="right"
                              sx={{
                                fontSize: { xs: "12px", sm: "14px" },
                              }}
                            >
                              {numWithSpaces(sumProductPrice(product.price))} SEK
                            </TableCell> */}
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell>Change status of order</TableCell>
                          <TableCell align="right">
                            <FormControl
                              sx={{
                                m: 1,
                                minWidth: 100,
                                backgroundColor: "white",
                              }}
                              size="small"
                            >
                              <InputLabel id="demo-select-small">
                                Current status
                              </InputLabel>
                              <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={isSent}
                                label="Age"
                                onChange={handleChange}
                              >
                                <MenuItem value={"notSent"}>Not Sent</MenuItem>
                                <MenuItem value={"sent"}>Sent</MenuItem>
                              </Select>
                            </FormControl>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </Fragment>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrderCard;
