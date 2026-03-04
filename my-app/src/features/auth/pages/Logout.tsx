import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Ghost } from "lucide-react";
import { useAuthStore } from "../store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";
import { Button } from "@/shared/components/ui/button";

const LogoutButton = () => {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state: any) => state.clearAuth);

  const handleLogout = () => {
    clearAuth();
    toast.success("Đăng xuất thành công!", {
      description: "Hẹn gặp lại bạn sau!",
    });
    navigate("/login");
    // Không cần window.location.reload()
    // vì navigate sẽ chuyển trang và component sẽ tự động re-render
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm">
          Logout
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn muốn đăng xuất?</AlertDialogTitle>
          <AlertDialogDescription>Bạn cần login lại.</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout} variant="destructive">
            Đăng xuất
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutButton;
