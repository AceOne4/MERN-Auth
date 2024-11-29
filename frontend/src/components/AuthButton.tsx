// components/AuthButton.tsx
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

interface AuthButtonProps {
  label: string;
  loading?: boolean;
  type?: "button" | "submit";
}

const AuthButton: React.FC<AuthButtonProps> = ({
  label,
  type = "submit",
  loading = false,
}) => (
  <motion.button
    className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    type={type}
    disabled={loading}
  >
    {loading ? (
      <Loader className="animate-spin text-center mx-auto" size={24} />
    ) : (
      label
    )}
  </motion.button>
);

export default AuthButton;
