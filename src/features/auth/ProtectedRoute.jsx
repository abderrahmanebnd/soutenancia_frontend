import Spinner from "@/components/commun/Spinner";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function ProtectedRoute({ allowedRoles, children }) {
  const navigate = useNavigate();
  const { currentUser, isLoading } = useAuth();

  useEffect(() => {
    if (!currentUser && !isLoading) {
      navigate("/login", { replace: true });
    }
  }, [currentUser, isLoading, navigate]);
  useEffect(() => {
    if (currentUser && currentUser.user.role !== allowedRoles) {
      navigate("/unauthorized");
    }
  }, [currentUser, allowedRoles, navigate]);

  if (isLoading) return <Spinner />;
  return children;
}

export default ProtectedRoute;
