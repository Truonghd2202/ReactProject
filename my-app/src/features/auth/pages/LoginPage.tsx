import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { LoginForm } from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Học Axios Interceptor & Service Layer
          </CardDescription>
        </CardHeader>

        <CardContent>
          <LoginForm />
        </CardContent>

        {/* Register Link */}
        <div className="text-sm text-center pb-6">
          <span className="text-muted-foreground">Chưa có tài khoản? </span>
          <Link
            to="/register"
            className="text-primary hover:underline font-medium"
          >
            Đăng ký ngay
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
