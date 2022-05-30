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
      <Typography
        sx={{ textTransform: "uppercase", fontFamily: "Prata", mt: "1rem" }}
        variant="h5"
      >
        Admin
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
