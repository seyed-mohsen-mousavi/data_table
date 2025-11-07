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

    if (!username || !password) {
      setError("لطفا نام کاربری و رمز عبور را وارد کنید.");
      return;
    }

    try {
      const response = await createToken(username, password, { username, password });

      const { accessToken, refreshToken, role } = response;

      authLogin(accessToken, refreshToken, role);

      navigate(role === "admin" ? "/adminTableRoute" : "/userTableRoute");
    } catch (err: any) {
      console.error("Login error:", err);
      setError("نام کاربری یا رمز عبور اشتباه است.");
    }
  };

  return { login, error };
};
