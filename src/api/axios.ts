import axios from "axios";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = "http://localhost:8999/api"

export const getRequest = (URL: string) => {
  return axiosClient.get(`/${URL}`).then(response => response)
}

export const postRequest = (URL: string) => {
  return axiosClient.post(`/${URL}`).then(response => response)
}

export const patchRequest = (URL: string) => {
  return axiosClient.patch(`/${URL}`).then(response => response)
}

export const deleteRequest = (URL: string) => {
  return axiosClient.delete(`/${URL}`).then(response => response)
}