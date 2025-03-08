/* import { useNavigate } from "react-router";
import { useAuth } from "./AuthContext";

function ProtectedRoute({ allowedRoles, children }) {
  const navigate = useNavigate();
  const { user, isLoading, isError } = useAuth();
  if (isLoading) return <div>Loading...</div>;
  if (isError || !user?.isAuthenticated) return navigate("/login");
  if (user?.role !== allowedRoles) return navigate("/unauthorized");

  return children;
}

export default ProtectedRoute; */
