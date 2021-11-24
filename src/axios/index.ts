import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export const getData = async <T extends object>(
  apiUrl: string,
  params?: object
) => {
  try {
    const response = await axios.get<T>(apiUrl, { params });
    const { data } = response;
    if (data) {
      return data;
    }
  } catch (error: any) {
    return { error: error.response?.data?.message } as T;
  }
};
