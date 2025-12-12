import React, { useState, useEffect } from "react";
import type { Usuario } from "../../types/types";
import { Toast } from "../../ui/toast";
import { getPerfil, updatePerfil } from "../../api/usuario";

const VisualizarPerfil = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ nome: "", cidade: "" });
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  useEffect(() => {
    getPerfil()
      .then((data) => {
        setUsuario(data);
        setFormData({ nome: data.nome, cidade: data.cidade || "" });
      })
      .catch((err) => {
        setToastMessage(err.message);
        setToastType("error");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSalvar = async () => {
    if (!usuario) return;

    try {
      const updated = await updatePerfil({ ...usuario, ...formData });
      setUsuario(updated);
      setFormData({ nome: updated.nome, cidade: updated.cidade || "" });
      setEditMode(false);
      setToastMessage("Perfil atualizado com sucesso!");
      setToastType("success");
    } catch (err: any) {
      setToastMessage(err.message);
      setToastType("error");
    }
  };

  if (loading) return <p className="text-center mt-6">Carregando...</p>;
  if (!usuario)
    return <p className="text-center mt-6">Nenhum dado encontrado.</p>;

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-xs mx-auto mt-10">
      <h1 className="text-xl font-bold text-center mb-6">Meu Perfil</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1 uppercase">
            Nome
          </label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            disabled={!editMode}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg text-gray-800 text-sm focus:outline-none transition ${
              editMode
                ? "bg-white border-gray-300"
                : "bg-gray-50 border-gray-200"
            }`}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1 uppercase">
            Cidade
          </label>
          <input
            type="text"
            name="cidade"
            value={formData.cidade}
            disabled={!editMode}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg text-gray-800 text-sm focus:outline-none transition ${
              editMode
                ? "bg-white border-gray-300"
                : "bg-gray-50 border-gray-200"
            }`}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1 uppercase">
            Papel
          </label>
          <input
            type="text"
            value={usuario.papelUsuario}
            disabled
            className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-gray-800 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1 uppercase">
            Email
          </label>
          <input
            type="email"
            value={usuario.email}
            disabled
            className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-gray-800 text-sm"
          />
        </div>
      </div>

      <div className="mt-6">
        {editMode ? (
          <div className="flex space-x-2">
            <button
              onClick={handleSalvar}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
            >
              Salvar
            </button>
            <button
              onClick={() => {
                setEditMode(false);
                setFormData({
                  nome: usuario.nome,
                  cidade: usuario.cidade || "",
                });
              }}
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-lg transition"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg transition"
          >
            Editar Perfil
          </button>
        )}
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

export { VisualizarPerfil };
