import { DeleteOutline } from "@mui/icons-material";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { Fragment, useState } from "react";
import { useAdmin } from "../../context/AdminPageContext";
import { numWithSpaces } from "../../Helper";
import { ProductData } from "../../ProductData";
import RemoveProductConfirmation from "./RemoveProductConfirmation";

interface Props {
  product: ProductData;
}

function AdminProductList(props: Props) {
  const { isEdit, setEdit, saveProduct } = useAdmin();

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(props.product.image);
  const [title, setTitle] = useState(props.product.title);
  const [description, setDescription] = useState(props.product.description);
  const [price, setPrice] = useState(props.product.price);
  const [openRemove, setOpenRemove] = useState(false);

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
        <TableCell>{props.product.id}</TableCell>
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
                  <TableRow contentEditable={isEdit}>
                    <TableCell
                      align="left"
                      sx={{
                        paddingX: { md: "5rem" },
                      }}
                    >
                      {isEdit ? (
                        <Box
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={props.product.image}
                            alt={props.product.title}
                            style={{ maxHeight: "180px" }}
                          />
                          <TextField
                            required
                            multiline
                            label="Image URL"
                            variant="standard"
                            onChange={(event) => setImage(event.target.value)}
                            inputProps={{ style: { fontSize: ".9rem" } }}
                            InputLabelProps={{ style: { fontSize: ".9rem" } }}
                          />
                        </Box>
                      ) : (
                        <img
                          src={props.product.image}
                          alt={props.product.title}
                          style={{ maxHeight: "180px" }}
                        />
                      )}
                    </TableCell>

                    <TableCell align="center">{props.product.id}</TableCell>
                    <TableCell align="center">
                      {isEdit ? (
                        <TextField
                          value={title}
                          variant="standard"
                          onChange={(event) => setTitle(event.target.value)}
                          inputProps={{ style: { fontSize: ".9rem" } }}
                          InputLabelProps={{ style: { fontSize: ".9rem" } }}
                        />
                      ) : (
                        props.product.title
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {isEdit ? (
                        <TextField
                          value={String(price)}
                          variant="standard"
                          onChange={(event) => {
                            console.log(isNaN(Number(event.target.value)));
                            if (!isNaN(Number(event.target.value))) {
                              setPrice(Number(event.target.value));
                            }
                          }}
                          inputProps={{ style: { fontSize: ".9rem" } }}
                          InputLabelProps={{ style: { fontSize: ".9rem" } }}
                        />
                      ) : (
                        numWithSpaces(props.product.price)
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Button onClick={() => setOpenRemove(true)}>
                        {openRemove ? (
                          <RemoveProductConfirmation product={props.product} />
                        ) : undefined}
                        <DeleteOutline style={{ color: "#ed6c02" }} />
                      </Button>

                      {!isEdit ? (
                        <Button
                          onClick={() => {
                            setEdit(true);
                          }}
                        >
                          <EditIcon style={{ color: "#ed6c02" }} />
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            saveProduct({
                              id: props.product.id,
                              title,
                              image,
                              description,
                              price,
                            });
                          }}
                        >
                          <DoneIcon style={{ color: "#ed6c02" }} />
                        </Button>
                      )}
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

                  <TableCell
                    colSpan={5}
                    align="left"
                    sx={{
                      paddingX: { md: "5rem" },
                    }}
                  >
                    {isEdit ? (
                      <TextareaAutosize
                        aria-label="description"
                        value={description}
                        style={{
                          width: "100%",
                          border: "none",
                          fontFamily: "inherit",
                          fontSize: ".9rem",
                          padding: "0.5rem 0.2rem ",
                          backgroundColor: "#F8F4EF",
                          borderBottom: "1px solid grey",
                        }}
                        onChange={(event) => setDescription(event.target.value)}
                      />
                    ) : (
                      props.product.description
                    )}
                  </TableCell>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}
export default AdminProductList;
