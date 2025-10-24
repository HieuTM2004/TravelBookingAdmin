import axios from "axios";
import { refreshTokenRequest } from "./authAPI";

const apiClient = axios.create({
  baseURL: "https://localhost:7228/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor để thêm token vào header
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor để xử lý lỗi 401 và làm mới token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Đánh dấu yêu cầu đã được thử lại

      try {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (!accessToken || !refreshToken) {
          throw new Error("No tokens available");
        }

        const newTokens = await refreshTokenRequest({
          accessToken,
          refreshToken,
        });

        // Lưu token mới
        localStorage.setItem("accessToken", newTokens.tokens.accessToken);
        localStorage.setItem("refreshToken", newTokens.tokens.refreshToken);

        // Cập nhật header với token mới và thử lại yêu cầu
        originalRequest.headers.Authorization = `Bearer ${newTokens.tokens.accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Nếu làm mới token thất bại, xóa token và chuyển hướng về đăng nhập
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
