import Axios, { AxiosRequestConfig } from "axios";
// export const baseUrl = "https://ab.host.levitation.co.in";
export const baseUrl = "http://localhost:5000";

const defaultAxios = Axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
  },
});
defaultAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export function apiClient(
  method: string,
  url: string,
  options: AxiosRequestConfig<unknown> = {}
) {
  const { data = {}, headers = {}, params = {}, ...rest } = options;
  //   headers.Authorization = `Bearer ${cookies.get("token")}`;
  return defaultAxios({
    url,
    data,
    method,
    params,
    headers,
    ...rest,
  });
}

export const apis = {
  get: (url: string, args: AxiosRequestConfig<unknown>) =>
    apiClient("get", url, args),
  post: (url: string, args: AxiosRequestConfig<unknown>) =>
    apiClient("post", url, args),
  put: (url: string, args: AxiosRequestConfig<unknown>) =>
    apiClient("put", url, args),
  patch: (url: string, args: AxiosRequestConfig<unknown>) =>
    apiClient("patch", url, args),
  delete: (url: string, args: AxiosRequestConfig<unknown>) =>
    apiClient("delete", url, args),
};
