import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { User } from "../../context/UserContext";
import { makeRequest } from "../../Helper";
import ApplyingForAdminCard from "./ApplyingForAdminCard";

function AppliedForAdmin() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetch() {
      let response = await makeRequest("/api/user", "GET");
      let newList = response.data.filter(
        (user: User) => user.isApplyingForAdmin === true
      );
      setUsers(newList);
    }
    fetch();
  }, []);
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "20rem",
      }}
    >
      <Typography
        sx={{ textTransform: "uppercase", fontFamily: "Prata", mt: "2rem" }}
        variant="h5"
      >
        Applied for admin
      </Typography>
      <Box
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "2rem",
        }}
      >
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#CAC2B9",
                  color: "#fff",
                  width: "100%",
                }}
              >
                <TableCell
                  colSpan={9}
                  sx={{
                    color: "#fff",
                    fontSize: "1rem",
                    fontfamily: "Roboto, Helvetica, Arial, sans-serif",
                  }}
                >
                  Name
                </TableCell>
              </TableRow>
            </TableHead>
            {users.map((user, index) => (
              <ApplyingForAdminCard key={index} user={user} />
            ))}
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default AppliedForAdmin;
