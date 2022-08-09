import { Status, Task } from "../../../../models/Task.model";
import {
  Card,
  Grid,
  IconButton,
  Typography,
  ListItemIcon,
  Menu,
  MenuItem,
  List,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { actionCreator, State } from "../../../../state";
import { bindActionCreators } from "redux";
import {
  PendingOutlined,
  DeleteOutlineOutlined,
  CheckCircleSharp,
  CheckCircleOutlineRounded,
  QueryBuilder,
} from "@mui/icons-material";
import { useState } from "react";
import { useSnackbar } from "notistack";

interface CardTaskProps {
  task: Task;
  status: Status;
}

export const CardTask = ({ task, status }: CardTaskProps) => {
  const { updateTask, deleteTask } = bindActionCreators(
    actionCreator,
    useDispatch()
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openStatusSelect, setOpenStatusSelect] = useState(false);
  const open = Boolean(anchorEl);
  const statuMenuOptions = Object.keys(Status) as (keyof typeof Status)[];
  const state = useSelector((state: State) => state);
  const { enqueueSnackbar } = useSnackbar();

  const handleCheck = () => {
    const status = task.status === Status.DONE ? Status.TO_DO : Status.DONE;
    updateTask(task.id, { ...task, status });
  };

  const handleStatusSelect = (event: React.MouseEvent<HTMLElement>) => {
    const attribute = (event.target as HTMLElement).attributes.getNamedItem(
      "value"
    );
    if (attribute !== null) {
      const status = attribute.value as Status;
      updateTask(task.id, { ...task, status });
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClickStatus = () => {
    setOpenStatusSelect(!openStatusSelect);
  };

  const handleDelete = () => {
    deleteTask(task.id);

    if (!state.tasks.error) {
      enqueueSnackbar("Task delete success", { variant: "success" });
    }
  };

  const getIconStatus = (status: Status) => {
    switch (status) {
      case Status.TO_DO:
        return <PendingOutlined />;
      case Status.IN_PROGRESS:
        return <QueryBuilder />;
      case Status.DONE:
        return <CheckCircleSharp color="success" />;
    }
  };

  const getIconStatusSelect = (status: Status) => {
    switch (status) {
      case Status.TO_DO:
        return <PendingOutlined />;
      case Status.IN_PROGRESS:
        return <QueryBuilder />;
      case Status.DONE:
        return <CheckCircleOutlineRounded />;
    }
  };

  return (
    <Card
      sx={{
        boxSizing: "border-box",
        p: 1,
        mb: 1,
        bgcolor: "primary.main",
        color: "primary.contrastText",
        border: "1px solid",
        borderColor: "secondary.dark",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <IconButton
            aria-label="check"
            sx={{ mb: 9, color: "primary.contrastText" }}
            onClick={handleCheck}
          >
            {getIconStatus(task.status)}
          </IconButton>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1" component="div" sx={{ my: 1 }}>
            {task.name}
          </Typography>
          <Typography variant="body2">{task.description}</Typography>
        </Grid>
        <Grid item xs={2}>
          <IconButton
            aria-label="settings"
            onClick={handleMenuClick}
            sx={{ color: "primary.contrastText" }}
          >
            <MoreVertIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClickStatus}>
          <ListItemIcon>{getIconStatusSelect(status)}</ListItemIcon>
          Status: {state.tasks.statusLabels[status]}
        </MenuItem>
        {openStatusSelect && (
          <List
            sx={{
              ml: 2,
              "& .MuiListItemIcon-root": {
                minWidth: 32,
                height: 24,
                mr: 1,
              },
            }}
          >
            {statuMenuOptions.map((status) => (
              <MenuItem
                key={status}
                value={status}
                onClick={handleStatusSelect}
              >
                <ListItemIcon>
                  {getIconStatusSelect(status as Status)}
                </ListItemIcon>
                {state.tasks.statusLabels[status]}
              </MenuItem>
            ))}
          </List>
        )}
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteOutlineOutlined />
          </ListItemIcon>
          Remove
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default CardTask;
