import Spinner from "@/components/commun/Spinner";
import { useAuth } from "@/context/AuthContext";

import { Navigate } from "react-router";

function PublicRoute({ children }) {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) return <Spinner />;
  if (currentUser) {
    const userRole = currentUser?.user.role;
    switch (userRole) {
      case "admin":
        return <Navigate replace to="/admin" />;
      case "student":
        return <Navigate replace to="/student" />;
      case "teacher":
        return <Navigate replace to="/teacher" />;
      case "enterprise":
        return <Navigate replace to="/enterprise" />;
      default:
        return <Navigate replace to="/unauthorized" />;
    }
  }

  return children;
}

export default PublicRoute;
