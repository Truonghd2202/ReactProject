import axios from "axios";
import { useAuthStore } from "@/features/auth/store";
import { env } from "./env";
import { API_ENDPOINTS } from "@/shared/constants";
import { toast } from "sonner";
const apiClient = axios.create({
  baseURL: env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15_000, //15s
  withCredentials: true,
});

//Request Interceptor: Attach Token(tự động gán token vào trong header)
apiClient.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

/**
 @param error - lỗi nếu refresh thất bại
 @param token - Token mới nếu refresh thành công
 */
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((p) => {
    if (token) p.resolve(token);
    else p.reject(error);
  });
  failedQueue = [];
};

// Response Interceptor:Handle Data Normalization
apiClient.interceptors.response.use(
  // ===== CASE 1: Response thành công =====
  (response) => {
    return response.data?.data !== undefined
      ? response.data.data
      : response.data;
  },

  // ===== CASE 2: Response lỗi =====
  async (error) => {
    const originalRequest = error.config;

    const notAuthReqs = !originalRequest.url?.includes("/auth");
    const is401 = error.response?.status === 401;
    const notRetriedYet = !originalRequest._retry;

    if (is401 && notRetriedYet && notAuthReqs) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;
      try {
        const res = await axios.post(
          `${env.API_URL}${API_ENDPOINTS.AUTH.REFRESH}`,
          {},
          { withCredentials: true },
        );
        const newToken: string =
          res.data?.data?.accessToken ?? res.data?.accessToken;

        useAuthStore.getState().setAuth({
          accessToken: newToken,
          role: useAuthStore.getState().role,
        });

        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        useAuthStore.getState().clearAuth();
        toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    const message =
      error.response?.data?.message ?? error.message ?? "Đã có lỗi xảy ra";
    error.message = message;

    const isLogoutEndpoint = originalRequest.url?.includes("/auth/logout");
    if (!isLogoutEndpoint) {
      toast.error(message);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
