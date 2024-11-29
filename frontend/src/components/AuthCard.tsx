// components/AuthCard.tsx
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  children: ReactNode;
  footer: ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ title, children, footer }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          {title}
        </h2>
        {children}
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center items-center">
        {footer}
      </div>
    </motion.div>
  );
};

export default AuthCard;
