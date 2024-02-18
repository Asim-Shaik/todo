import { AxiosResponse } from "axios";
import { axiosInstance } from "./config";

interface Todo {
  _id: string;
  title: string;
  desc: string;
  completed: boolean;
  createdAt: string;
}

export const GetTodos = async (): Promise<AxiosResponse<Todo[]>> => {
  const url = `/todos`;
  return await axiosInstance.get<Todo[]>(url);
};

export const GetTodoData = async (id: string): Promise<AxiosResponse<Todo>> => {
  const url = `/todos/${id}`;
  return await axiosInstance.get<Todo>(url);
};

export const AddTodo = async (
  payload: Omit<Todo, "_id">
): Promise<AxiosResponse<Todo>> => {
  const url = `/todos`;
  return await axiosInstance.post<Todo>(url, payload);
};

export const EditTodo = async (
  payload: Partial<Todo>,
  id: string
): Promise<AxiosResponse<Todo>> => {
  const url = `/todos/${id}`;
  return await axiosInstance.patch<Todo>(url, payload);
};

export const DeleteTodo = async (id: string): Promise<AxiosResponse<void>> => {
  const url = `todos/${id}`;
  return await axiosInstance.delete<void>(url);
};
