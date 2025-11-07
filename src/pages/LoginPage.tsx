import { useState } from "react";
import { useLogin } from "./useLogin";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useLogin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) return;

    await login(username, password);
  };

  return (
    <div
      data-testid="login-page"
      className="min-h-screen flex items-center justify-center bg-blue-50"
    >
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-xl px-8 py-10 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          ورود به حساب
        </h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <input
          type="text"
          placeholder="نام کاربری"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          ورود
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
