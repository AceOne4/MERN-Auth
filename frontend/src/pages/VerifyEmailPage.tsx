import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/AuthStore";
import toast from "react-hot-toast";

function VerifyEmailPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef<(HTMLInputElement | null)[]>(
    Array(length).fill(null)
  );
  const navigate = useNavigate();
  const { emailVerification, isLoading, error } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await emailVerification(code.join(""));
      navigate("/");
      toast.success("Email verified successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return; // Ensure only numbers

    const newCode = [...code];

    // Handle pasted content (if the value is more than one character)
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split(""); // Split into up to 6 characters
      pastedCode.forEach((digit, i) => (newCode[i] = digit || "")); // Fill newCode with pasted digits
      setCode(newCode);

      // Find the last non-empty input using reverse and findIndex
      const focusIndex =
        newCode
          .slice()
          .reverse()
          .findIndex((digit) => digit !== "") + 1;

      // Ensure we don't go out of bounds//-
      inputRef.current?.[Math.min(focusIndex, 5)]?.focus(); // Ensure we don't go out of bounds//+
    } else {
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input field if value is entered
      if (value && index < 5) {
        inputRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };
  return (
    <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Enter the 6-digit code sent to your email address.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between">
            {code.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputRef.current[i] = el)}
                type="text"
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                aria-label={`Digit ${i + 1}`}
                className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none"
              />
            ))}
          </div>
          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading || code.some((digit) => !digit)}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default VerifyEmailPage;
