import { AxiosResponse } from "axios";
import { axiosInstance } from "./config";

export interface Todo {
  _id: string;
  title: string;
  desc: string;
  completed: boolean;
}

interface ApiResponse {
  todos: Todo[]; // Ensure the response has a property 'todos' containing an array of Todo objects
}

interface GetSingleResponse {
  todo: Todo; // Ensure the response has a property 'todos' containing an array of Todo objects
}

export const GetTodos = async (): Promise<AxiosResponse<ApiResponse>> => {
  const url = `/todos`;
  return await axiosInstance.get<ApiResponse>(url);
};

export const GetTodoData = async (
  id: string
): Promise<AxiosResponse<GetSingleResponse>> => {
  const url = `/todos/${id}`;
  return await axiosInstance.get<GetSingleResponse>(url);
};

export const AddTodo = async (
  payload: Omit<Todo, "_id" | "createdAt">
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
