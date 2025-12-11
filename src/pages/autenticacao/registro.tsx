import React, { useState } from "react";
import { Toast } from "../../ui/toast";
import { Link, useNavigate } from "react-router-dom";

const Registro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cidade, setCidade] = useState("");
  const [urlFoto, setUrlFoto] = useState("");
  const [papelUsuario, setPapelUsuario] = useState("PARTICIPANTE"); // Default to "PARTICIPANTE"
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const registerData = { nome, email, senha, cidade, urlFoto, papelUsuario };

    try {
      const response = await fetch("http://localhost:8080/auth/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });

      if (response.ok) {
        navigate("/login", {
          state: { message: "Cadastro realizado com sucesso!" },
        });
      } else {
        const errorData = await response.json();
        const errorMessage = errorData?.message || "Erro ao registrar usuário.";
        setToastMessage(errorMessage);
        setToastType("error");
      }
    } catch {
      setToastMessage("Erro de rede, tente novamente.");
      setToastType("error");
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">Cadastro</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md text-sm"
          />
        </div>
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
        <div>
          <label className="block text-sm">Cidade</label>
          <input
            type="text"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md text-sm"
          />
        </div>
        <div>
          <label className="block text-sm">URL da Foto</label>
          <input
            type="url"
            value={urlFoto}
            onChange={(e) => setUrlFoto(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md text-sm"
          />
        </div>
        <div>
          <label className="block text-sm">Papel do Usuário</label>
          <select
            value={papelUsuario}
            onChange={(e) => setPapelUsuario(e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-sm"
          >
            <option value="PARTICIPANTE">Participante</option>
            <option value="ORGANIZADOR">Organizador</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md text-sm"
        >
          Criar Conta
        </button>
      </form>

      <div className="mt-4 text-center">
        <Link
          to="/login"
          className="text-sm text-blue-600 hover:text-blue-800 transition"
        >
          Já tem uma conta? Faça login
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

export { Registro };
