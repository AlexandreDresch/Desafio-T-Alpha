import { ReactNode, useContext } from "react";

import { Navigate } from "react-router-dom";

import UserContext from "@/context/user-context";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const userContext = useContext(UserContext);
  const userData = userContext ? userContext.userData : null;

  if (!userData) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
}
