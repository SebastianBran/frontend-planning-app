import { Box, Container, Grid, ThemeProvider, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Status } from "../../../models/Task.model";
import DashboardColumn from "./components/DashboardColumn";
import { bindActionCreators } from "redux";
import { actionCreator } from "../../../state";
import { theme } from "../../../themes/theme";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { getAllTasks } = bindActionCreators(actionCreator, dispatch);

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          height: "calc(100% - 80px)",
          py: 2,
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Dashboard
        </Typography>
        <Box
          sx={{
            height: "calc(100% - 50px)",
            overflowX: "auto",
            overflowY: "hidden",
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              height: "100%",
              minWidth: "1000px",
              maxWidth: "100%",
              p: 2,
              bgcolor: "primary.main",
            }}
          >
            <DashboardColumn status={Status.TO_DO} />
            <DashboardColumn status={Status.IN_PROGRESS} />
            <DashboardColumn status={Status.DONE} />
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;
