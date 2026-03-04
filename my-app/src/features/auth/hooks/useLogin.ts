import { authService } from "@/features/auth/services";
import { useAuthStore } from "@/features/auth/store";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { AuthResponse, LoginInput, LoginRequest } from "../type";
import { jwtDecode } from "jwt-decode";
import type { UserRole } from "@/shared/types";

interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
}

export const useLogin = () => {
  const navigate = useNavigate();
  const setTokens = useAuthStore((state) => state.setAuth);
  const location = useLocation();
  const { setAuth } = useAuthStore();

  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ?? "/";

  return useMutation<AuthResponse, Error, LoginRequest>({
    // mutationFn nhận vào object credentials từ Form
    mutationFn: (data) => authService.login(data),

    onSuccess: (res) => {
      const decoded = jwtDecode<JwtPayload>(res.accessToken);

      setAuth({
        accessToken: res.accessToken,
        role: decoded.role,
      });

      // 2. Thông báo
      toast.success("Đăng nhập thành công!");

      if (decoded.role === "admin") {
        navigate("/admin/rituals", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    },
  });
};
