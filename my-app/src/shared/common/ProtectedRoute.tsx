import { Navigate, useLocation } from "react-router-dom";
import type { UserRole } from "../types";
import { useAuthStore } from "@/features/auth/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({
  children,
  allowedRoles,
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { accessToken, role } = useAuthStore();
  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <>{children}</>;
};
