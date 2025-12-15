import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../modules/auth/context/auth.context";
import { ProtectedLayoutScreen } from "../modules/layout/screens/ProtectedLayoutScreen";

export default function ProtectedLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return <ProtectedLayoutScreen />;
}
