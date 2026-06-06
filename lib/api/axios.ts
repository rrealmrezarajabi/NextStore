import axios from "axios";
import { BASE_URL } from "./base-url";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

