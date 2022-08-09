import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Status } from "../../../../models/Task.model";
import { actionCreator, State } from "../../../../state";

interface CreateTaskFormProps {
  toggleCreateTask: () => void;
  status: Status;
}

const formDataInitialState = {
  name: "",
  description: "",
};

export const CreateTaskForm = ({
  toggleCreateTask,
  status,
}: CreateTaskFormProps) => {
  const [formData, setFormData] = useState(formDataInitialState);
  const { createTask } = bindActionCreators(actionCreator, useDispatch());
  const state = useSelector((state: State) => state);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.name !== "") {
      createTask({ ...formData, status });

      if (!state.tasks.error) {
        enqueueSnackbar("Task create success", { variant: "success" });
      }

      toggleCreateTask();
    }
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ width: "100%", mb: 2, color: "primary.contrastText" }}
    >
      <TextField
        size="small"
        variant="outlined"
        placeholder="Enter a name"
        name="name"
        value={formData.name}
        onChange={handleFormChange}
        multiline
        sx={{
          mb: 1,
          width: "100%",
          bgcolor: "primary.main",
          "& .MuiInputBase-root": {
            color: "primary.contrastText",
          },
          boxSizing: "border-box",
          border: "1px solid",
          borderColor: "secondary.dark",
        }}
      />
      <TextField
        size="small"
        variant="outlined"
        placeholder="Enter a description"
        name="description"
        value={formData.description}
        onChange={handleFormChange}
        multiline
        sx={{
          mb: 1,
          width: "100%",
          bgcolor: "primary.main",
          "& .MuiInputBase-root": {
            color: "primary.contrastText",
          },
          boxSizing: "border-box",
          border: "1px solid",
          borderColor: "secondary.dark",
        }}
      />
      <Box sx={{ width: "100%", display: "flex" }}>
        <Button
          variant="contained"
          sx={{ width: "49%" }}
          type="submit"
          disabled={formData.name === ""}
        >
          Añadir
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: "49%", ml: "auto" }}
          onClick={toggleCreateTask}
        >
          Cancelar
        </Button>
      </Box>
    </Box>
  );
};

export default CreateTaskForm;
