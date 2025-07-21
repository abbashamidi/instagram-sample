// src/assets/Routes/PublicRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";

export default function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}
