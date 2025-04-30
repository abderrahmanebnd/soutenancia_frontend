import { getCurrentUser } from "@/api/apiAuth";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

const AuthContext = createContext();
function AuthProvider({ children }) {
  const { data: currentUser, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(),
  });
  return (
    <AuthContext.Provider value={{ currentUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
export { AuthProvider, useAuth };
