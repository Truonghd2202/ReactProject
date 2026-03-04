import { authService } from "@/features/auth/services";
import { useAuthStore } from "@/features/auth/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const clearTokens = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: () => {
      return authService.logout();
    },

    onSuccess: () => {
      // 1. Xóa token trong store
      clearTokens();

      // 2. Xóa sạch mọi cache của React Query
      // (tránh user sau thấy data user trước)
      queryClient.removeQueries();

      // 3. Redirect
      navigate("/login");
      toast.info("Đã đăng xuất");
    },

    onError: () => {
      // Dù API lỗi, Client vẫn phải Logout để đảm bảo UX
      clearTokens();
      queryClient.removeQueries();
      navigate("/login");
    },
  });
};
