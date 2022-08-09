import { Box, Grid, IconButton, Typography } from "@mui/material";
import { Status, Task } from "../../../../models/Task.model";
import CardTask from "./CardTask";
import { State } from "../../../../state";
import { connect } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import CreateTaskForm from "./CreateTaskForm";
import { useState } from "react";

interface DashboardColumnProps {
  tasks: Task[];
  title: string;
  status: Status;
}

export const DashboardColumn = ({
  tasks,
  title,
  status,
}: DashboardColumnProps) => {
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  const handleAddTaskButton = () => {
    setIsCreatingTask(!isCreatingTask);
  };

  return (
    <Grid
      item
      xs={4}
      sx={{
        height: "100%",
      }}
    >
      <Box
        sx={{
          borderRadius: 2,
          bgcolor: "primary.light",
          p: 1,
          boxSizing: "border-box",
          height: "100%",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography color="primary.contrastText">
            <Box
              component="span"
              sx={{ borderRadius: 2, background: "red", px: 1, mr: 1 }}
            >
              {tasks.length}
            </Box>
            {title}
          </Typography>
          <IconButton
            size="small"
            sx={{ ml: "auto", color: "primary.contrastText" }}
            onClick={handleAddTaskButton}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box
          sx={{
            height: "calc(100% - 30px)",
            overflowY: "auto",
            mt: 1,
          }}
        >
          {isCreatingTask && (
            <CreateTaskForm
              toggleCreateTask={handleAddTaskButton}
              status={status}
            />
          )}
          {tasks.map((task) => (
            <CardTask key={task.id} task={task} status={status} />
          ))}
        </Box>
      </Box>
    </Grid>
  );
};

const mapStateToProps = (state: State, ownProps: { status: Status }) => {
  return {
    tasks: state.tasks.tasks.filter((task) => task.status === ownProps.status),
    title: state.tasks.statusLabels[ownProps.status] as string,
    status: ownProps.status,
  };
};

export default connect(mapStateToProps)(DashboardColumn);
