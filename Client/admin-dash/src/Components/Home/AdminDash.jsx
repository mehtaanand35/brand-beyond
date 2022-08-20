import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { logout } from "../../Redux/Auth/Action";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const AdminDash = ({ logout, isAuth }) => {
  const [state, setState] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:5000/api/user/allusers").then((res) => {
      setState(res.data);
    });
  }, []);
  console.log("data", state);
  return (
    <>
      <Button
        onClick={() => {
          logout();
          navigate("/")
        }}
        style={{ marginBottom: "2%" }}
        variant="contained"
      >
        Logout
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Mongo-ID</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell align="center">{row._id}</StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.email}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
const mapStateToProps = (state) => ({
  isAuth: state.AuthReducer.isAuthenticated,
});
export default connect(mapStateToProps, { logout })(AdminDash);
