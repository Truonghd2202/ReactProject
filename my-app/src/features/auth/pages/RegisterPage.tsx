import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Link } from "react-router-dom";
import { RegisterForm } from "../components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex justify-center mt-20 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            Đăng ký tài khoản
          </CardTitle>
        </CardHeader>

        <CardContent>
          <RegisterForm />

          <div className="mt-6 text-center text-sm">
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Đăng nhập
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
