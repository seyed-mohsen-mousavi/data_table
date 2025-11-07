import { Routes, Route, Navigate } from "react-router-dom";
import ProductPage from "../components/ProductPage";
import LoginPage from "../pages/LoginPage";
import { useAuth } from "../stores/AuthContext";

const AppRoutes = () => {
  const { isLoggedIn, role } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isLoggedIn ? (
            <Navigate to={role === "admin" ? "/adminTableRoute" : "/userTableRoute"} replace />
          ) : (
            <LoginPage />
          )
        }
      />
      <Route
        path="/adminTableRoute"
        element={
          isLoggedIn && role === "admin" ? (
            <ProductPage />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/userTableRoute"
        element={
          isLoggedIn && role === "user" ? (
            <ProductPage />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="*"
        element={
          isLoggedIn ? (
            <Navigate to={role === "admin" ? "/adminTableRoute" : "/userTableRoute"} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;
