import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Container,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import AddProductForm from "./AddProductForm";
import AdminCollapsibleTable from "./AdminCollapsibleTable";
import AdminOrders from "./AdminOrders";
import AppliedForAdmin from "./AppliedForAdmin";

function AdminPage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        minHeight: "35rem",
      }}
    >
      <AppliedForAdmin />
      <AdminOrders />
      <Typography
        sx={{ textTransform: "uppercase", fontFamily: "Prata" }}
        variant="h5"
      >
        Change products
      </Typography>
      <Box style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          style={{
            display: "flex",
            width: "fit-content",
            backgroundColor: "#CAC2B9",
            textTransform: "none",
          }}
          onClick={() => setIsOpen(true)}
        >
          ADD
          <AddIcon />
        </Button>
        <Dialog
          open={isOpen}
          onClose={handleClose}
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          {" "}
          <DialogTitle id="scroll-dialog-title">Add product</DialogTitle>
          <DialogContent dividers={true}>
            <AddProductForm />
          </DialogContent>
        </Dialog>
      </Box>
      <AdminCollapsibleTable />
    </Container>
  );
}
export default AdminPage;
