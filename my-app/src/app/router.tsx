import { createBrowserRouter } from "react-router-dom";
import RitualCatalog from "@/features/rituals/pages/RitualCatalog";
import RitualDetail from "@/features/rituals/pages/RitualDetail";
import LoginPage from "@/features/auth/pages/LoginPage";
import HomePage from "@/features/landing/pages/HomePage";
import { GuestRoute } from "@/shared/common/GusetRoute";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import UnauthorizedPage from "@/shared/common/UnauthorizedPage";
import { ProtectedRoute } from "@/shared/common/ProtectedRoute";
import ProfilePage from "@/features/auth/pages/ProfilePage";
import NotFoundPage from "@/shared/common/NotFoundPage";

import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import ManageRitualList from "@/features/rituals/pages/ManageRitualList";
import ManageRitualCreate from "@/features/rituals/pages/ManageRitualCreate";
import ManageRitualEdit from "@/features/rituals/pages/ManageRitualEdit";
import UserManageList from "@/features/users/pages/UserManageList";
import AdminLayout from "@/shared/layouts/AdminLayout";
import UserLayout from "@/shared/layouts/UserLayout";

export const router = createBrowserRouter([
  {
    element: <UserLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "rituals", element: <RitualCatalog /> },
      { path: "rituals/:id", element: <RitualDetail /> },
      {
        path: "login",
        element: (
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        ),
      },
      {
        path: "register",
        element: (
          <GuestRoute>
            <RegisterPage />
          </GuestRoute>
        ),
      },
      { path: "unauthorized", element: <UnauthorizedPage /> },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  //Admin

  {
    path: "admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "rituals", element: <ManageRitualList /> },
      { path: "rituals/create", element: <ManageRitualCreate /> },
      { path: "rituals/:id/edit", element: <ManageRitualEdit /> },
      { path: "users", element: <UserManageList /> },
    ],
  },
]);
