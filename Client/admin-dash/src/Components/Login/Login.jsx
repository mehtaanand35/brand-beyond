import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Redux/Auth/Action";

import { connect } from "react-redux";

const Login = ({ login, isAuth, user }) => {
  const navigate = useNavigate();
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const { email, password } = data;

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };
  if (isAuth && user) {
    const { role } = user;
    if (role === 1) {
      navigate("/admin");
    } else {
      navigate("/public");
    }
  }

  return (
    <div className="register-form">
      <h1 className="text-center">Login</h1>
      <div className="register-input">
        <form onSubmit={onSubmit}>
          <Box
            sx={{
              "& > :not(style)": { m: 1, width: "90%" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="standard-basic"
              type="email"
              label="Email"
              variant="standard"
              value={email}
              onChange={handleChange("email")}
            />
            <TextField
              id="standard-basic"
              type="password"
              label="Password"
              variant="standard"
              value={password}
              onChange={handleChange("password")}
            />
          </Box>

          <button>LogIn</button>
        </form>
        <h3 className="text-center">
          Dont't have an account? <Link to="/">Register</Link>
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
export default connect(mapToStateProps, { login })(Login);
