import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import FormValidation from "../../../hooks/formValidation";
import useFetchAndLoad from "../../../hooks/useFeatchAndLoad";
import { Role } from "../../../models/User.model";
import authService from "../../../services/auth.service";
import { actionCreator } from "../../../state";
import { Regex } from "../../../utilities/regex.utility";

const formDataInitialState = {
  name: "",
  email: "",
  password: "",
};

export const Register = () => {
  const [formData, setFormData] = useState(formDataInitialState);
  const [showPassword, setShowPassword] = useState(false);
  const { loading, callEndpoint } = useFetchAndLoad();
  const { userLogin } = bindActionCreators(actionCreator, useDispatch());
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const formRules = {
    name: [
      {
        regex: Regex.IS_REQUIRED,
        message: "Name is required",
      },
      {
        regex: Regex.MIN_LENGTH_2,
        message: "Name must be at least 2 characters",
      },
    ],
    email: [
      {
        regex: Regex.IS_REQUIRED,
        message: "Email is required",
      },
      {
        regex: Regex.EMAIL,
        message: "Invalid email. Please enter a valid email",
      },
    ],
    password: [
      {
        regex: Regex.IS_REQUIRED,
        message: "Password is required",
      },
      {
        regex: Regex.MIN_LENGTH_8,
        message: "Password must be at least 8 characters",
      },
      {
        regex: Regex.PASSWORD,
        message:
          "Password must be contain at least one number, one special character and one uppercase letter.",
      },
    ],
  };

  const { errors, validate } = FormValidation({ rules: formRules });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate(formData)) {
      await callEndpoint(authService.register({ ...formData, role: Role.USER }))
        .then((response) => {
          userLogin(response.data.result.accessToken, () =>
            navigate("/auth", { replace: true })
          );
          enqueueSnackbar("Register sucess", { variant: "success" });
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
        <h1>Create an account</h1>

        <Typography sx={{ mb: 4 }} variant="subtitle1">
          Create an account to start using Planning
        </Typography>

        <TextField
          label="Name"
          variant="outlined"
          placeholder="Example: Pedro"
          name="name"
          value={formData.name}
          onChange={handleFormChange}
          sx={{ mb: 3 }}
          {...(errors.name && {
            error: true,
            helperText: errors.name,
          })}
        />

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
            disabled={!formData.name || !formData.email || !formData.password}
          >
            Sign up
          </Button>
        )}

        <Typography sx={{ mb: 4, mx: "auto" }} variant="subtitle1">
          Already have an account?{" "}
          <Link component={RouterLink} to="/" color="primary.light">
            Sign in
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
