import { Status, Task } from "../../models/Task.model";
import { TasksActionTypes } from "../action-types/tasks.type";
import { TasksAction } from "../actions/tasks.action";

export interface ITasksState {
  loading: boolean;
  error: boolean;
  tasks: Task[];
  message: string;
  statusLabels: { [key in Task["status"]]: string };
  isCreatingTask: boolean;
}

const initialState: ITasksState = {
  loading: false,
  error: false,
  tasks: [],
  message: "",
  statusLabels: {
    [Status.TO_DO]: "To do",
    [Status.IN_PROGRESS]: "In progress",
    [Status.DONE]: "Done",
  },
  isCreatingTask: false,
};

const tasksReducer = (
  state: ITasksState = initialState,
  action: TasksAction
) => {
  switch (action.type) {
    case TasksActionTypes.FETCH_TASKS_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        message: "Fetching tasks",
      };
    case TasksActionTypes.RECIVE_ALL_TASKS:
      return {
        ...state,
        loading: false,
        error: false,
        tasks: action.payload.tasks,
        message: "Tasks fetched",
      };
    case TasksActionTypes.RECIVE_TASK_BY_ID:
      return {
        ...state,
        loading: false,
        error: false,
        message: "Task fetched",
      };
    case TasksActionTypes.RECIVE_UPDATE_TASK:
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.task.id
      );
      if (index !== -1) state.tasks[index] = action.payload.task;
      return {
        ...state,
        loading: false,
        error: false,
        message: "Task updated",
      };
    case TasksActionTypes.RECIVE_CREATE_TASK:
      state.tasks.push(action.payload.task);
      return {
        ...state,
        loading: false,
        error: false,
        message: "Task Created",
      };
    case TasksActionTypes.DELETE_TASK:
      const indexToDelete = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (indexToDelete !== -1) state.tasks.splice(indexToDelete, 1);
      return {
        ...state,
        loading: false,
        error: false,
        message: "Task deleted",
      }
    case TasksActionTypes.FAILURE_FETCH_REQUEST:
      return {
        ...state,
        loading: false,
        error: true,
        message: "Error fetching tasks",
      };
    default:
      return state;
  }
};

export default tasksReducer;
