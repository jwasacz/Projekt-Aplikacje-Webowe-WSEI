import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const [email, setEmail] = useState("jakub@example.com");
  const [password, setPassword] = useState("1234");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        login(data.token, data.refreshToken);
        navigate("/");
      } else {
        const errorMessage = await res.text();
        setError(errorMessage || "Invalid credentials");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-lg bg-gray-900 text-gray-100 border border-[#30363d] border-l-4 border-l-[#58a6ff] rounded-lg p-8 shadow-2xl flex flex-col gap-4"
      >
        <h2 className="text-xl text-blue-400 font-semibold text-center mb-2">
          Log in
        </h2>

        {error && (
          <div className="bg-gray-900 border border-red-600 text-red-500 text-sm p-3 rounded-md text-center">
            {error}
          </div>
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          disabled={isLoading}
          className="w-full bg-[#21262d] border border-[#3d444d] rounded-md py-2 px-4 text-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          disabled={isLoading}
          className="w-full bg-[#21262d] border border-[#3d444d] rounded-md py-2 px-4 text-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full rounded-md py-2 px-4 text-sm font-semibold transition ${
            isLoading
              ? "bg-[#30363d] text-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          {isLoading ? "Logging in..." : "Log in"}
        </button>
      </form>
    </div>
  );
}

export default Login;
