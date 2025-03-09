import Spinner from "@/components/commun/Spinner";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function PublicRoute({ children }) {
  const navigate = useNavigate();
  const { currentUser, isLoading } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const userRole = currentUser?.user.role;
      switch (userRole) {
        case "admin":
          navigate("/admin");
          break;
        case "student":
          navigate("/student", { replace: true });
          break;
        case "teacher":
          navigate("/teacher");
          break;
        case "enterprise":
          navigate("/enterprise");
          break;
        default:
          navigate("/unauthorized");
          break;
      }
    }
  }, [currentUser, isLoading, navigate]);

  if (isLoading) return <Spinner />;
  return children;
}

export default PublicRoute;
