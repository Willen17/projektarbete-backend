import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

import { useAdmin } from "../../context/AdminPageContext";
import { ProductData } from "../../ProductData";

interface Props {
  product: ProductData;
}

function RemoveProductConfirmation(props: Props) {
  const [remove, setRemove] = useState(true);

  const handleClose = () => {
    setRemove(false);
  };

  const { removeProduct } = useAdmin();

  return (
    <div>
      <Dialog
        open={remove}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to remove this item?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be reverted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{
              color: "#333",
            }}
            onClick={handleClose}
          >
            NO
          </Button>
          <Button
            style={{
              color: "#333",
            }}
            onClick={() => removeProduct(props.product)}
          >
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default RemoveProductConfirmation;
