import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import FormValidation from "../../../hooks/formValidation";
import useFetchAndLoad from "../../../hooks/useFeatchAndLoad";
import authService from "../../../services/auth.service";
import { Regex } from "../../../utilities/regex.utility";
import { actionCreator } from "../../../state";
import { useSnackbar } from "notistack";

const formDataInitialState = {
  email: "",
  password: "",
};

export const Login = () => {
  const [formData, setFormData] = useState(formDataInitialState);
  const [showPassword, setShowPassword] = useState(false);
  const { loading, callEndpoint } = useFetchAndLoad();
  const { userLogin } = bindActionCreators(actionCreator, useDispatch());
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const formRules = {
    email: [
      {
        regex: Regex.IS_REQUIRED,
        message: "Email is required",
      },
      {
        regex: Regex.EMAIL,
        message: "Invalid email",
      },
    ],
    password: [
      {
        regex: Regex.IS_REQUIRED,
        message: "Password is required",
      },
    ],
  };

  const { errors, validate } = FormValidation({ rules: formRules });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate(formData)) {
      await callEndpoint(authService.login(formData))
        .then((response) => {
          userLogin(response.data.result.accessToken, () =>
            navigate("/auth", { replace: true })
          );
          enqueueSnackbar("Login sucess", { variant: "success" });
        })
        .catch((error) => {
          enqueueSnackbar(error.response.data.message, { variant: "error" });
        });
      setFormData(formDataInitialState);
    }
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={{ mx: "auto", width: 400 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: "100%", display: "flex", flexDirection: "column" }}
      >
        <h1>Welcome back</h1>

        <Typography sx={{ mb: 4 }} variant="subtitle1">
          Welcome back! Please enter your details
        </Typography>

        <TextField
          label="Email"
          variant="outlined"
          placeholder="Example: email@email.com"
          name="email"
          value={formData.email}
          onChange={handleFormChange}
          sx={{ mb: 3 }}
          {...(errors.email && {
            error: true,
            helperText: errors.email,
          })}
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          placeholder="xxxxxxxx"
          name="password"
          value={formData.password}
          onChange={handleFormChange}
          sx={{ mb: 3 }}
          {...(errors.password && {
            error: true,
            helperText: errors.password,
          })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {loading ? (
          <Box sx={{ mb: 3, display: "flex" }}>
            <CircularProgress sx={{ mx: "auto" }} />
          </Box>
        ) : (
          <Button
            sx={{ mb: 3 }}
            variant="contained"
            type="submit"
            disabled={!formData.email || !formData.password}
          >
            Sign in
          </Button>
        )}

        <Typography sx={{ mb: 4, mx: "auto" }} variant="subtitle1">
          Dont have an account?{" "}
          <Link component={RouterLink} to="register" color="primary.light">
            Register
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
