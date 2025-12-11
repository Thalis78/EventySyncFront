import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Toast } from "../../ui/toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      const timeout = setTimeout(() => {
        setToastMessage(location.state.message);
        setToastType("success");
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [location.state?.message]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginData = { email, senha };

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("idUsuario", data.idUsuario);
        localStorage.setItem("papelUsuario", data.papelUsuario);
        localStorage.setItem("token", data.token);

        if (data.papelUsuario === "ORGANIZADOR") {
          navigate("/organizador/eventos");
        } else {
          navigate("/eventos");
        }
      } else {
        const { message } = await response.json();
        setToastMessage(message || "Erro ao fazer login.");
        setToastType("error");
      }
    } catch (error) {
      console.log(error);
      setToastMessage("Erro de rede, tente novamente.");
      setToastType("error");
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md text-sm"
          />
        </div>
        <div>
          <label className="block text-sm">Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md text-sm"
        >
          Entrar
        </button>
      </form>
      <div className="mt-4 text-center">
        <Link
          to="/registro"
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Criar nova conta
        </Link>
      </div>

      {toastMessage && (
        <Toast
          message={toastMessage}
          variant={toastType}
          onClose={() => setToastMessage("")}
        />
      )}
    </div>
  );
};

export { Login };
