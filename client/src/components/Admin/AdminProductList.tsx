import { DeleteOutline } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Fragment, useState } from "react";
import { useAdmin } from "../../context/AdminPageContext";
import { numWithSpaces } from "../../Helper";
import { ProductData } from "../../ProductData";

import EditProductForm from "./EditProductForm";
import RemoveProductConfirmation from "./RemoveProductConfirmation";

interface Props {
  product: ProductData;
}

function AdminProductList(props: Props) {
  const { saveProduct } = useAdmin();

  const [open, setOpen] = useState(false);
  const [imageURL, setImage] = useState(props.product.imageURL);
  const [title, setTitle] = useState(props.product.title);
  const [description, setDescription] = useState(props.product.description);
  const [price, setPrice] = useState(props.product.price);
  const [openRemove, setOpenRemove] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {props.product.title}
        </TableCell>
        <TableCell>{props.product._id}</TableCell>
        <TableCell>{numWithSpaces(props.product.price)} SEK</TableCell>
      </TableRow>
      {/* All info om produkten som är klickad*/}
      <TableRow>
        <TableCell
          style={{
            padding: 0,
            backgroundColor: "#F8F4EF",
          }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="left"
                      sx={{
                        paddingX: { md: "5rem" },
                        color: "#6C665F",
                      }}
                    >
                      Image
                    </TableCell>
                    <TableCell align="center" style={{ color: "#6C665F" }}>
                      ID
                    </TableCell>
                    <TableCell align="center" style={{ color: "#6C665F" }}>
                      Title
                    </TableCell>
                    <TableCell align="center" style={{ color: "#6C665F" }}>
                      Price
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        paddingX: { md: "5rem" },
                      }}
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      align="left"
                      sx={{
                        paddingX: { md: "5rem" },
                      }}
                    >
                      <img
                        src={props.product.imageURL}
                        alt={props.product.title}
                        style={{ maxHeight: "180px" }}
                      />
                    </TableCell>

                    <TableCell align="center">{props.product._id!}</TableCell>
                    <TableCell align="center">{props.product.title}</TableCell>
                    <TableCell align="center">
                      {numWithSpaces(props.product.price)}
                    </TableCell>
                    <TableCell align="center">
                      <Button onClick={() => setOpenRemove(true)}>
                        {openRemove ? (
                          <RemoveProductConfirmation product={props.product} />
                        ) : undefined}
                        <DeleteOutline style={{ color: "#ed6c02" }} />
                      </Button>

                      <Button onClick={() => setIsOpen(true)}>
                        <EditIcon style={{ color: "#ed6c02" }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      colSpan={1}
                      align="left"
                      sx={{
                        paddingX: { md: "5rem" },
                        color: "#6C665F",
                      }}
                    >
                      Categories:
                    </TableCell>
                    <TableCell
                      colSpan={5}
                      align="left"
                      sx={{
                        paddingX: { md: "5rem" },
                      }}
                    >
                      {props.product.category.map(
                        (oneCategory) => `${oneCategory}, `
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      colSpan={1}
                      align="left"
                      sx={{
                        paddingX: { md: "5rem" },
                        color: "#6C665F",
                      }}
                    >
                      Stock:
                    </TableCell>
                    <TableCell
                      colSpan={5}
                      align="left"
                      sx={{
                        paddingX: { md: "5rem" },
                      }}
                    >
                      {props.product.stock}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      align="left"
                      sx={{
                        paddingX: { md: "5rem" },
                        color: "#6C665F",
                      }}
                    >
                      Description
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      align="left"
                      sx={{
                        paddingX: { md: "5rem" },
                      }}
                    >
                      {props.product.description}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        {" "}
        <DialogTitle id="scroll-dialog-title">Update Product</DialogTitle>
        <DialogContent dividers={true}>
          <EditProductForm product={props.product} />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
export default AdminProductList;
