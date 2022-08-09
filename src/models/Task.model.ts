export enum Status {
  TO_DO = "TO_DO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export interface Task {
  id: number;
  name: string;
  description: string;
  status: Status;
}

export interface TaskCreate {
  name: string;
  description: string;
  status: Status;
}

export interface TaskUpdate {
  name: string;
  description: string;
  status: Status;
}