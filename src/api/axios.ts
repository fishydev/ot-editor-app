import axios from 'axios'

const axiosClient = axios.create()

axiosClient.defaults.baseURL = 'http://localhost:8999/api/v1'

axiosClient.interceptors.request.use((config: any) => {
  if (localStorage.getItem('token')) {
    config.headers.Authorization = localStorage.getItem('token')
  }

  return config
})

export const getRequest = async (URL: string) => {
  return axiosClient.get(`/${URL}`).then((response) => response)
}

export const postRequest = async (URL: string, payload?: any) => {
  return axiosClient.post(`/${URL}`, payload).then((response) => response)
}

export const patchRequest = async (URL: string) => {
  return axiosClient.patch(`/${URL}`).then((response) => response)
}

export const deleteRequest = async (URL: string) => {
  return axiosClient.delete(`/${URL}`).then((response) => response)
}


