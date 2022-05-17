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
import { useAdmin } from "../../context/AdminPageContext";
import AdminProductList from "./AdminProductList";

function AdminCollapsibleTable() {
  const { products } = useAdmin();

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
          {products.map((product) => {
            return <AdminProductList key={product.id} product={product} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AdminCollapsibleTable;
