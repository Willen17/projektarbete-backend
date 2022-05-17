import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function NewProductConfirmation() {
    
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
      setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Success!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Your new product was succesfully added! 
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button style={{
                        color: "#333"
                    }} onClick={handleClose}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}