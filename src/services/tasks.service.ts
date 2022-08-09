import { TaskCreate, TaskUpdate } from "../models/Task.model";
import http from "./http-common";

class TasksService {
  getAll() {
    return { call: http.get("/tasks") };
  }

  getById(id: number) {
    return { call: http.get(`/tasks/${id}`) };
  }

  create(data: TaskCreate) {
    return { call: http.post("/tasks", data) };
  }

  update(id: number, data: TaskUpdate) {
    return { call: http.put(`/tasks/${id}`, data) };
  }

  delete(id: number) {
    return { call: http.delete(`/tasks/${id}`) };
  }
}

export default new TasksService();
