import axios, { AxiosInstance } from "axios";

// interface CustomResponse<T> extends AxiosResponse {
//   data: T;
// }

// interface ErrorResponse {
//   status: number;
//   // You can add more properties if needed
// }

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// axiosInstance.interceptors.response.use(
//   (response: CustomResponse<any>) => response,
//   async (error: AxiosError<ErrorResponse>) => {
//     // You can handle error here if needed

//     return Promise.reject(error);
//   }
// );

export { axiosInstance };
