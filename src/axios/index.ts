import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export const getData = async <T>(apiUrl: string, params?: object) => {
  const response = await axios.get<T>(apiUrl, { params });
  const { data } = response;
  if (data) {
    return data;
  }
};
