// App.jsx
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginForm from "./assets/Components/LoginForm/LoginForm";
import SignUpForm from "./assets/Components/SignUpForm/SignUpForm";
import UserDashboard from "./assets/Components/UserDashboard/UserDashboard";
import DashboardSettings from "./assets/Components/UserDashboard/DashboardSettings";
import {
  AuthProvider,
  useAuthDispatch,
} from "./assets/AuthContext/AuthContext";
import ProtectedRoute from "./assets/Routes/ProtectedRoute";
import PublicRoute from "./assets/Routes/PublicRoute";

function AuthInitializer() {
  const dispatch = useAuthDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:3000/me", {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          dispatch({ type: "LOGIN", payload: data });
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      }
    };

    checkAuth();
  }, [dispatch]);

  return null;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthInitializer />
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <LoginForm />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUpForm />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/settings"
            element={
              <ProtectedRoute>
                <DashboardSettings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
