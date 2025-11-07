import { Routes, Route, Navigate } from "react-router-dom";
import ProductPage from "../components/ProductPage";
import LoginPage from "../pages/LoginPage";
import { useAuth } from "../stores/AuthContext";

const AppRoutes = () => {
  const { isLoggedIn, role } = useAuth();

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  if (role === "admin") {
    return (
      <Routes>
        <Route path="/adminTableRoute" element={<ProductPage />} />
        <Route path="*" element={<Navigate to="/adminTableRoute" replace />} />
      </Routes>
    );
  }

  if (role === "user") {
    return (
      <Routes>
        <Route path="/userTableRoute" element={<ProductPage />} />
        <Route path="*" element={<Navigate to="/userTableRoute" replace />} />
      </Routes>
    );
  }

  return null;
};

export default AppRoutes;
