import Spinner from "@/components/commun/Spinner";
import { useAuth } from "@/context/AuthContext";

import { Navigate } from "react-router";

function IsCompletedRoute({ children }) {
  const { currentUser, isLoading } = useAuth();
  if (isLoading) return <Spinner />;
  if (!currentUser && !isLoading) return <Navigate replace to="/login" />;
  if (currentUser && currentUser?.user.Student.isCompletedProfile)
    return <Navigate replace to="/student/list-teams" />;

  return children;
}

export default IsCompletedRoute;
