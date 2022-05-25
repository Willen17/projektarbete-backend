import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { makeRequest } from "../../Helper";
import { ProductData } from "../../ProductData";
import AdminProductList from "./AdminProductList";

function AdminCollapsibleTable() {
  const [products, setProducts] = useState<ProductData[]>();

  useEffect(() => {
    const fetchData = async () => {
      let response = await makeRequest(`/api/product/`, "GET");
      setProducts(response.data);
    };
    fetchData();
  }, []);

  return (
    <TableContainer component={Paper} sx={{ my: "1.5rem" }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow style={{ backgroundColor: "#CAC2B9" }}>
            <TableCell />
            <TableCell align="left">
              <Typography variant="subtitle1" fontWeight="bold" color="white">
                Title
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="subtitle1" fontWeight="bold" color="white">
                ID
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="subtitle1" fontWeight="bold" color="white">
                Price
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.map((product) => {
            return <AdminProductList key={product._id} product={product} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AdminCollapsibleTable;
