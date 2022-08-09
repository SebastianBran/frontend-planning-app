import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Route, Routes } from "react-router-dom";
import { bindActionCreators } from "redux";
import Appbar from "../../components/Appbar";
import { actionCreator, State } from "../../state";
import Dashboard from "./Dashboard/Dashboard";

export const Authviews = () => {
  const dispatch = useDispatch();
  const { logout } = bindActionCreators(actionCreator, dispatch);
  const state = useSelector((state: State) => state);

  const appbarPaths = [
    {
      name: "Logout",
      path: "/",
      action: () => {
        dispatch(logout());
      },
    },
  ];

  return (
    <Box sx={{ height: "100%" }}>
      <Appbar
        paths={appbarPaths}
        userName={state.auth.user ? state.auth.user.name : ""}
      />

      <Routes>
        <Route index element={<Dashboard />} />
      </Routes>

      <Outlet />
    </Box>
  );
};

export default Authviews;
