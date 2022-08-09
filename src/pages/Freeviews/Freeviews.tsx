import { Box } from "@mui/material";
import { Outlet, Route, Routes } from "react-router-dom";
import Appbar from "../../components/Appbar";
import Login from "./Login/Login";
import Register from "./Register/Register";

export const Freeviews = () => {
  const appbarPaths = [
    { name: "Login", path: "", action: () => {} },
    { name: "Register", path: "register", action: () => {} },
  ];

  return (
    <Box>
      <Appbar paths={appbarPaths} />

      <Routes>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>

      <Outlet />
    </Box>
  );
};

export default Freeviews;
