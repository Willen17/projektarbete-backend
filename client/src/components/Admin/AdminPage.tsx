import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Container,
  Typography,
  Modal,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 1rem",
          marginTop: "3rem",
        }}
      >
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
      </Box>
      <AdminCollapsibleTable />
    </Container>
  );
}
export default AdminPage;
