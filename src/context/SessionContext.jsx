import { getSessionSidebarData } from "@/utils/getSessionSidebarData";
import { useAuth } from "./AuthContext";
import { createContext, useContext } from "react";

const SessionContext = createContext();

function SessionProvider({ children }) {
  const { currentUser } = useAuth();
  const currentUserRole = currentUser?.user.role;
  const sessionSidebarLinks = getSessionSidebarData(currentUserRole);
  return (
    <SessionContext.Provider value={{ sessionSidebarLinks, currentUserRole }}>
      {children}
    </SessionContext.Provider>
  );
}
function useSession() {
  const context = useContext(SessionContext);
  if (context === "undefined") {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
export { SessionProvider, useSession };
