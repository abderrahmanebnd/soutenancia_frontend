import Spinner from "@/components/commun/Spinner";
import { useAuth } from "@/context/AuthContext";

import { Navigate } from "react-router";

function ProtectedRoute({ allowedRoles, children }) {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) return <Spinner />;

  if (!currentUser && !isLoading) return <Navigate replace to=".auth/login" />;

  if (currentUser && !allowedRoles.includes(currentUser.user.role))
    return <Navigate replace to="/unauthorized" />;

  return children;
}

export default ProtectedRoute;
