import { useState } from "react";
import Input from "../components/Input";
import { Lock, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import AuthButton from "../components/AuthButton";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter/PasswordStrengthMeter";
import { useAuthStore } from "../store/AuthStore";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signup(email, password, name);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthCard
      title="Create A New Account"
      footer={
        <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-green-400 hover:underline">
            Login
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSignup}>
        <Input
          icon={User}
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
        <PasswordStrengthMeter password={password} />
        <AuthButton label="Sign Up" loading={isLoading} />
      </form>
    </AuthCard>
  );
};

export default SignupPage;
