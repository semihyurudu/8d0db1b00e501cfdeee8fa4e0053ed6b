import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: "https://5f6d939160cf97001641b049.mockapi.io/tkn/",
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
})