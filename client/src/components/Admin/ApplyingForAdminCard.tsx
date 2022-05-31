import {
  SelectChangeEvent,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Table,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  ButtonGroup,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState, useEffect, Fragment } from "react";
import { toast } from "react-toastify";
import { User } from "../../context/UserContext";
import { makeRequest } from "../../Helper";

interface OrderProps {
  user: User;
}

function ApplyingForAdminCard(props: OrderProps) {
  const [open, setOpen] = useState(false);
  const [isApplyingForAdmin, setIsApplyingForAdmin] = useState<string>();

  function changeAdminStatus(status: boolean, userID: string) {
    let body = { isApplyingForAdmin: false, isAdmin: false };
    if (status === true) body = { isApplyingForAdmin: false, isAdmin: true };
    if (status === false) body = { isApplyingForAdmin: false, isAdmin: false };
    async function fetch() {
      let response = await makeRequest(`/api/user/${userID}`, "PUT", body);
      if (!response.ok) return toast.error(await response.data);
      toast.success(await response.data);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
    fetch();
  }

  return (
    <Fragment>
      <TableBody>
        <TableRow>
          <TableCell component="th" scope="row">
            {props.user.firstname + " " + props.user.lastname}
          </TableCell>
          <TableCell align="right">
            <FormControl
              sx={{
                m: 1,
                minWidth: 100,
                backgroundColor: "white",
              }}
              size="small"
            >
              <Button
                color="error"
                onClick={() => changeAdminStatus(false, props.user._id)}
              >
                Decline
              </Button>
              <Button
                color="success"
                onClick={() => changeAdminStatus(true, props.user._id)}
              >
                Accept
              </Button>

              {/* <InputLabel id="demo-select-small">Current status</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={isApplyingForAdmin}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={"decline"}>Decline</MenuItem>
                    <MenuItem value={"promote"}>Promote</MenuItem>
                  </Select> */}
            </FormControl>
          </TableCell>
        </TableRow>
      </TableBody>
    </Fragment>
  );
}

export default ApplyingForAdminCard;
