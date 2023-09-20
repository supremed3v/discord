import React, { useState } from "react";
import Loader from "../helpers/Loader";
import {
  Avatar,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { styled } from "@mui/material/styles";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Paper = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const AvatarWrapper = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
}));

const Form = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const SwitchContainer = styled(Grid)(({ theme }) => ({
  alignSelf: "flex-end",
}));

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    // Handle form field changes here (update the state of the formFields object)
    setFormFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { login, loading, user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login or signup form submission here
    if (isSignup) {
      // Handle signup here
    } else {
      // Handle login here
      login(formFields.email, formFields.password);
      if (loading) return <Loader />;
      if (user) navigate("/");
    }
  };

  const handleSwitch = () => {
    setIsSignup((prev) => !prev);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper>
        <AvatarWrapper>
          <LockOutlinedIcon />
        </AvatarWrapper>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign Up" : "Sign In"}
        </Typography>
        <Form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formFields.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formFields.password}
            onChange={handleChange}
          />
          {isSignup && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
            />
          )}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </SubmitButton>
          <Grid container>
            <SwitchContainer item>
              <Typography component="span">
                {isSignup
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </Typography>
              <Switch checked={isSignup} onChange={handleSwitch} />
            </SwitchContainer>
          </Grid>
        </Form>
        <Link href="#" variant="body2">
          Forgot password?
        </Link>
      </Paper>
    </Container>
  );
};

export default Login;
