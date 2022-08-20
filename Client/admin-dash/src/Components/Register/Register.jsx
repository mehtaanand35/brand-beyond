import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { register } from "../../Redux/Auth/Action";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const Register = ({ register, isAuth, user }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPasswrod: "",
  });

  const { name, email, password, confirmPasswrod } = data;

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    if (password !== confirmPasswrod) {
      toast.error("Passwords do not match");
    } else {
      register({ name, email, password });
    }
  };
  if (isAuth && user) {
    const { name } = user;
    toast.success(`welcome ${name}`);
    
  }
  return (
    <div className="register-form">
      <h1 className="text-center">Register</h1>
      <div className="register-input">
        <form onSubmit={onSubmit}>
          <Box
            sx={{
              "& > :not(style)": { m: 1, width: "90%", fontSize: "20px" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="name"
              value={name}
              label="Name"
              variant="standard"
              onChange={handleChange("name")}
            />
            <TextField
              id="email"
              type="email"
              value={email}
              label="Email"
              variant="standard"
              onChange={handleChange("email")}
            />
            <TextField
              id="password"
              type="password"
              value={password}
              label="Password"
              variant="standard"
              onChange={handleChange("password")}
            />
            <TextField
              id="confirmPasswrod"
              type="password"
              value={confirmPasswrod}
              label="Confirm Password"
              variant="standard"
              onChange={handleChange("confirmPasswrod")}
            />
          </Box>
          <Button variant="contained">SignUp</Button>
        </form>
        <h3 className="text-center">
          Already have an account? <Link to="/login">Login</Link>
        </h3>
      </div>
    </div>
  );
};

const mapToStateProps = (state) => ({
  isAuth: state.AuthReducer.isAuthenticated,
  isLoading: state.AuthReducer.loading,
  user: state.AuthReducer.user,
});

export default connect(mapToStateProps, { register })(Register);
