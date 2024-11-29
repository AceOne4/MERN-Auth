import AuthCard from "../components/AuthCard";
import Input from "../components/Input";
import { Lock } from "lucide-react";
import AuthButton from "../components/AuthButton";
import { FormEvent, useState } from "react";
import { useAuthStore } from "../store/AuthStore";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();
  const { resetPassword, isLoading, error, message } = useAuthStore();

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== ConfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await resetPassword(token!, password);
      toast.success(
        "Password reset successfully, redirecting to login page..."
      );
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Error resetting password");
    }
  };
  console.log("Error:", error);
  console.log("Message:", message);

  return (
    <AuthCard title="Reset Password" footer={<div></div>}>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
      <form onSubmit={handleResetPassword}>
        <Input
          icon={Lock}
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          icon={Lock}
          type="password"
          placeholder="Confirm New Password"
          value={ConfirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <AuthButton label="Set New Password" loading={isLoading} />
      </form>
    </AuthCard>
  );
}

export default ResetPasswordPage;
