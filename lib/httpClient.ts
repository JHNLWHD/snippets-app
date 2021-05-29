import axios, { AxiosInstance, AxiosResponse } from 'axios'

import { HttpClientConfig } from '../types/HttpClient.type'

function handleResponseInterceptor(response: AxiosResponse): AxiosResponse {
  return response
}

function createAxiosInstance(config: HttpClientConfig): AxiosInstance {
  return axios.create(config)
}

function initializeInterceptors(axiosInstance: AxiosInstance): void {
  axiosInstance.interceptors.response.use(handleResponseInterceptor)
}

function createHttpClient(config: HttpClientConfig): AxiosInstance {
  const instance = createAxiosInstance(config)

  initializeInterceptors(instance)

  return instance
}

export default createHttpClient
