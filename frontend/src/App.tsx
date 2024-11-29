import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import FloatinShape from "./components/FloatinShape";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import { useAuthStore } from "./store/AuthStore";
import React, { useEffect } from "react";
import HomePage from "./pages/HomePage";
import LoadingSpinner from "./components/LoadingSpinner";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import NotFound from "./pages/NotFoundPage";

//protected routes
const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.isVerified) return <Navigate to="/verify-email" replace />;
  return children;
};
const RedirectAuthUsers = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user?.isVerified) return <Navigate to="/" replace />;

  return children;
};

export default function App() {
  const { checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center overflow-hidden relative">
      <FloatinShape
        color="bg-green-500"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatinShape
        color="bg-emerald-500"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatinShape
        color="bg-lime-500"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              {" "}
              <HomePage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthUsers>
              <LoginPage />
            </RedirectAuthUsers>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectAuthUsers>
              <SignupPage />
            </RedirectAuthUsers>
          }
        />
        <Route
          path="/forget-password"
          element={
            <RedirectAuthUsers>
              <ForgetPasswordPage />
            </RedirectAuthUsers>
          }
        />
        <Route
          path="/verify-email"
          element={
            <RedirectAuthUsers>
              <VerifyEmailPage />
            </RedirectAuthUsers>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthUsers>
              <ResetPasswordPage />
            </RedirectAuthUsers>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
}
