import { useState } from "react";
import { createToken } from "../api/createToken";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../stores/AuthContext";

export const useLogin = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const login = async (username: string, password: string) => {
    setError("");

    try {
      const response = await createToken(username, password, {
        username,
        password,
      });

      const { accessToken, refreshToken, role } = response;

      authLogin(accessToken, refreshToken, role);

      if (role === "admin") {
        navigate("/adminTableRoute");
      } else if (role === "user") {
        navigate("/userTableRoute");
      }
    } catch (err: any) {
      setError("نام کاربری یا رمز عبور اشتباه است.");
      console.error("Login error:", err);
    }
  };

  return { login, error };
};
