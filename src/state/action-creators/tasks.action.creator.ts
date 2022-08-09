import { Dispatch } from "react";
import { Task, TaskCreate } from "../../models/Task.model";
import tasksService from "../../services/tasks.service";
import { TasksActionTypes } from "../action-types/tasks.type";
import { TasksAction } from "../actions/tasks.action";

export const fetchTasksRequest = (): TasksAction => {
  return {
    type: TasksActionTypes.FETCH_TASKS_REQUEST,
  };
};

export const reciveAllTasks = (tasks: Task[]): TasksAction => {
  return {
    type: TasksActionTypes.RECIVE_ALL_TASKS,
    payload: {
      tasks: tasks,
    },
  };
};

export const getAllTasks = () => {
  return async (dispatch: Dispatch<TasksAction>) => {
    dispatch(fetchTasksRequest());
    return await tasksService
      .getAll()
      .call.then((response) => {
        dispatch(reciveAllTasks(response.data.result));
      })
      .catch((error) => dispatch(failureFetchRequest()));
  };
};

export const reciveTaskById = (): TasksAction => {
  return {
    type: TasksActionTypes.RECIVE_TASK_BY_ID,
  };
};

export const getTaskById = (id: number) => {
  return async (dispatch: Dispatch<TasksAction>) => {
    dispatch(fetchTasksRequest());
    return await tasksService
      .getById(id)
      .call.then((response) => {
        dispatch(reciveTaskById());
        getAllTasks();
      })
      .catch((error) => dispatch(failureFetchRequest()));
  };
};

export const reciveCreateTask = (task: Task): TasksAction => {
  return {
    type: TasksActionTypes.RECIVE_CREATE_TASK,
    payload: {
      task: task,
    },
  };
};

export const createTask = (task: TaskCreate) => {
  return async (dispatch: Dispatch<TasksAction>) => {
    dispatch(fetchTasksRequest());
    return await tasksService
      .create(task)
      .call.then((response) => {
        dispatch(reciveCreateTask(response.data.result));
      })
      .catch(() => dispatch(failureFetchRequest()));
  };
};

export const reciveUpdateTask = (task: Task): TasksAction => {
  return {
    type: TasksActionTypes.RECIVE_UPDATE_TASK,
    payload: {
      task: task,
    },
  };
};

export const updateTask = (id: number, task: Task) => {
  return async (dispatch: Dispatch<TasksAction>) => {
    dispatch(fetchTasksRequest());
    return await tasksService
      .update(id, task)
      .call.then((response) => {
        dispatch(reciveUpdateTask(response.data.result));
      })
      .catch((error) => dispatch(failureFetchRequest()));
  };
};

export const deleteTaskFromState = (id: number): TasksAction => {
  return {
    type: TasksActionTypes.DELETE_TASK,
    payload: {
      id: id,
    },
  };
};

export const deleteTask = (id: number) => {
  return async (dispatch: Dispatch<TasksAction>) => {
    dispatch(fetchTasksRequest());
    return await tasksService
      .delete(id)
      .call.then((response) => {
        dispatch(deleteTaskFromState(id));
      })
      .catch((error) => dispatch(failureFetchRequest()));
  };
};

export const failureFetchRequest = (): TasksAction => {
  return {
    type: TasksActionTypes.FAILURE_FETCH_REQUEST,
  };
};