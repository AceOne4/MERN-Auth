import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import Input from "../components/Input";
import { ArrowLeft, Mail } from "lucide-react";
import { FormEvent, useState } from "react";
import AuthButton from "../components/AuthButton";
import { useAuthStore } from "../store/AuthStore";

function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { forgetPassword, isLoading } = useAuthStore();
  const handleforgotPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email);

    await forgetPassword(email);
    setIsSubmitted(true);
  };
  return (
    <AuthCard
      title="Forgot Password"
      footer={
        <div className="px-8 py-4  bg-opacity-50 flex justify-center">
          <Link
            to="/login"
            className="text-green-400 hover:underline flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
          </Link>
        </div>
      }
    >
      {!isSubmitted ? (
        <form onSubmit={handleforgotPassword}>
          <p className="text-gray-300 mb-6 text-center">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
          <Input
            icon={Mail}
            type="text"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/*error && <p className="text-red-500 font-semibold mt-2">{error}</p>*/}

          <AuthButton label="Send Reset Link" loading={isLoading} />
        </form>
      ) : (
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Mail className="h-8 w-8 text-white" />
          </motion.div>
          <p className="text-gray-300 mb-6">
            If an account exists for {email}, you will receive a password reset
            link shortly.
          </p>
        </div>
      )}
    </AuthCard>
  );
}

export default ForgetPasswordPage;
