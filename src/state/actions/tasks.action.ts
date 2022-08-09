import { Task } from "../../models/Task.model";
import { TasksActionTypes } from "../action-types/tasks.type";

export interface FetchTasksRequest {
  type: TasksActionTypes.FETCH_TASKS_REQUEST;
}

export interface ReciveAllTasks {
  type: TasksActionTypes.RECIVE_ALL_TASKS;
  payload: {
    tasks: Task[];
  };
}

export interface ReciveCrateTask {
  type: TasksActionTypes.RECIVE_CREATE_TASK;
  payload: {
    task: Task;
  };
}

export interface ReciveUpdateTask {
  type: TasksActionTypes.RECIVE_UPDATE_TASK;
  payload: {
    task: Task;
  };
}

export interface ReciveTaskById {
  type: TasksActionTypes.RECIVE_TASK_BY_ID;
}

export interface DeleteTaskFromState {
  type: TasksActionTypes.DELETE_TASK;
  payload: {
    id: number;
  };
}

export interface FailureFetchRequest {
  type: TasksActionTypes.FAILURE_FETCH_REQUEST;
}

export type TasksAction =
  | FetchTasksRequest
  | ReciveAllTasks
  | ReciveTaskById
  | ReciveCrateTask
  | ReciveUpdateTask
  | DeleteTaskFromState
  | FailureFetchRequest;
