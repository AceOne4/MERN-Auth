import { useState } from "react";
import Input from "../components/Input";
import { Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import AuthButton from "../components/AuthButton";
import { useAuthStore } from "../store/AuthStore";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
      toast.success("Welcome Back ");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthCard
      title="Welcome Back"
      footer={
        <p className="text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-green-400 hover:underline">
            Sign Up
          </Link>
        </p>
      }
    >
      <form onSubmit={handleLogin}>
        <Input
          icon={Mail}
          type="text"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          icon={Lock}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to="/forget-password" className="text-green-400 hover:underline">
          Forget password?
        </Link>
        {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

        <AuthButton label="Login" loading={isLoading} />
      </form>
    </AuthCard>
  );
};

export default LoginPage;
