import axios from 'axios'
import { useSnackbar } from "notistack"

const axiosClient = axios.create()

const { enqueueSnackbar } = useSnackbar()

axiosClient.defaults.baseURL = 'http://localhost:8999/api/v1'

axiosClient.interceptors.request.use((config: any) => {
  if (localStorage.getItem('token')) {
    config.headers.Authorization = localStorage.getItem('token')
  }

  return config
})

axiosClient.interceptors.response.use((response) => {
  return response
}, (error) => {
  enqueueSnackbar(error, { variant: 'error' })
})

export const getRequest = async (URL: string) => {
  return axiosClient.get(`/${URL}`).then((response) => response)
}

export const postRequest = async (URL: string, payload?: any) => {
  if (payload) return axiosClient.post(`/${URL}`, payload).then((response) => response)
  return axiosClient.post(`/${URL}`).then((response) => response)
}

export const patchRequest = async (URL: string) => {
  return axiosClient.patch(`/${URL}`).then((response) => response)
}

export const deleteRequest = async (URL: string, payload?: any) => {
  if (payload) return axiosClient.delete(`/${URL}`, payload).then((response) => response)
  return axiosClient.delete(`/${URL}`).then((response) => response)
}


