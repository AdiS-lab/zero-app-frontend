import axios from "axios";
interface AuthResponseType {
  accessToken: string;
  refreshToken: string;
}

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

/**
 * intercept a 401 from a bad access token expired or nonexistent
 * refresh both tokens, where refresh token sent in HTTP header
 * make sure only 1 retry, flag the retry attempt
 */

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      try {
        const { data } = await api.post<AuthResponseType>(
          "/api/v1/auth/refresh",
        );

        if (!data) return Promise.reject(error);
        error.config.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return api(error.config);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      // Axios v1+ preferred syntax
      config.headers.set("Authorization", `Bearer ${token}`);

      // Alternative syntax for older Axios versions:
      // config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  },
);

export default api;
