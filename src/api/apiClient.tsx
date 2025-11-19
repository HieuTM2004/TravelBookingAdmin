import axios from "axios";

// Tạo instance chính
const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Danh sách API không cần Token
const PUBLIC_ENDPOINTS = [
  "/Auth/login",
  "/Auth/register",
  "/Auth/admin-register",
  "/Auth/refresh",
];

const isPublicEndpoint = (url: string | undefined) => {
  if (!url) return false;
  return PUBLIC_ENDPOINTS.some((path) =>
    url.toLowerCase().includes(path.toLowerCase())
  );
};

// --- REQUEST INTERCEPTOR ---
apiClient.interceptors.request.use(
  (config) => {
    console.log("🚀 Đang chuẩn bị gửi request tới:", config.url);
    console.log(
      "🔑 Token trong LocalStorage:",
      localStorage.getItem("accessToken")
    );
    if (config.method?.toUpperCase() === "GET") {
      return config;
    }
    if (isPublicEndpoint(config.url)) {
      return config;
    }

    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- RESPONSE INTERCEPTOR ---
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      // Nếu API bị lỗi chính là API login hoặc refresh thì bỏ qua
      if (isPublicEndpoint(originalRequest.url)) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        console.log("accessToken:", accessToken);
        console.log("refreshToken:", refreshToken);

        if (!accessToken || !refreshToken) {
          throw new Error("No tokens available");
        }

        // --- KHẮC PHỤC CIRCULAR DEPENDENCY TẠI ĐÂY ---
        // Sử dụng một instance axios MỚI HOÀN TOÀN để gọi refresh
        // Không dùng apiClient để gọi, cũng không import từ authAPI
        const response = await axios.post(
          "/api/Auth/refresh", // Lưu ý: Dùng full path hoặc setup baseURL nếu cần
          { accessToken, refreshToken },
          { headers: { "Content-Type": "application/json" } }
        );

        const newTokens = response.data;

        localStorage.setItem("accessToken", newTokens.accessToken);
        localStorage.setItem("refreshToken", newTokens.refreshToken);

        apiClient.defaults.headers.common.Authorization = `Bearer ${newTokens.accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;

        processQueue(null, newTokens.accessToken);
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.clear(); // Xóa sạch storage
        window.location.href = "/signin";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
