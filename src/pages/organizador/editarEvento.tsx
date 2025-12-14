import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Toast } from "../../ui/toast";
import { editarEvento, buscarEventoPorId } from "../../api/evento";
import type { Evento } from "../../types/types";

const EditarEvento: React.FC = () => {
  const { id } = useParams();
  const idEvento = Number(id);

  const [evento, setEvento] = useState<Evento | null>(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toISOString().split(".")[0];
  };

  useEffect(() => {
    const carregarEvento = async () => {
      if (!token || !idEvento) return;
      try {
        const dados = await buscarEventoPorId(idEvento, token);
        setEvento(dados);
      } catch (err: any) {
        setToastMessage("Erro ao carregar evento: " + err.message);
        setToastType("error");
      } finally {
        setLoading(false);
      }
    };

    carregarEvento();
  }, [idEvento, token]);

  const handleChange = (field: keyof Evento, value: any) => {
    if (!evento) return;

    const atualizado = { ...evento, [field]: value };

    if (field === "tipoEvento" && value === "GRATUITO") {
      atualizado.preco = 0;
    }

    if (field === "statusEvento") {
      atualizado.inscricaoAberta = value === "ABERTO";
    }

    setEvento(atualizado);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !evento || !idEvento) return;

    try {
      const eventoComOrganizador = {
        ...evento,
        organizadorId: Number(localStorage.getItem("idUsuario")),
      };
      await editarEvento(idEvento, eventoComOrganizador, token);
      setToastMessage("Evento atualizado com sucesso!");
      setToastType("success");
    } catch (err: any) {
      setToastMessage("Erro ao atualizar evento: " + err.message);
      setToastType("error");
    }
  };

  if (loading) return <p>Carregando evento...</p>;
  if (!evento) return <p>Evento não encontrado.</p>;

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">Editar Evento</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Título</label>
          <input
            type="text"
            value={evento.titulo}
            onChange={(e) => handleChange("titulo", e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Descrição</label>
          <input
            type="text"
            value={evento.descricao}
            onChange={(e) => handleChange("descricao", e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Local</label>
          <input
            type="text"
            value={evento.localEndereco}
            onChange={(e) => handleChange("localEndereco", e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Data e Hora Início
          </label>
          <input
            type="datetime-local"
            value={formatDate(evento.dataHoraInicio)}
            onChange={(e) => handleChange("dataHoraInicio", e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Data e Hora Final
          </label>
          <input
            type="datetime-local"
            value={formatDate(evento.dataHoraFinal)}
            onChange={(e) => handleChange("dataHoraFinal", e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Preço</label>
          <input
            type="number"
            value={evento.tipoEvento === "GRATUITO" ? 0 : evento.preco}
            onChange={(e) => handleChange("preco", Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-md text-sm"
            disabled={evento.tipoEvento === "GRATUITO"}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Tipo do Evento
          </label>
          <select
            value={evento.tipoEvento}
            onChange={(e) =>
              handleChange("tipoEvento", e.target.value as "GRATUITO" | "PAGO")
            }
            className="w-full px-4 py-2 border rounded-md text-sm"
          >
            <option value="GRATUITO">Gratuito</option>
            <option value="PAGO">Pago</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Status do Evento
          </label>
          <select
            value={evento.statusEvento}
            onChange={(e) =>
              handleChange(
                "statusEvento",
                e.target.value as "RASCUNHO" | "ABERTO"
              )
            }
            className="w-full px-4 py-2 border rounded-md text-sm"
          >
            <option value="RASCUNHO">Rascunho</option>
            <option value="ABERTO">Aberto</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Máximo de Inscritos
          </label>
          <input
            type="number"
            value={evento.maxInscricao}
            onChange={(e) =>
              handleChange("maxInscricao", Number(e.target.value))
            }
            className="w-full px-4 py-2 border rounded-md text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Carga Horária (horas)
          </label>
          <input
            type="number"
            value={evento.cargaHoraria}
            onChange={(e) =>
              handleChange("cargaHoraria", Number(e.target.value))
            }
            className="w-full px-4 py-2 border rounded-md text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Início das Inscrições
          </label>
          <input
            type="datetime-local"
            value={formatDate(evento.inscricaoAbre)}
            onChange={(e) => handleChange("inscricaoAbre", e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Fim das Inscrições
          </label>
          <input
            type="datetime-local"
            value={formatDate(evento.inscricaoFecha)}
            onChange={(e) => handleChange("inscricaoFecha", e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md text-sm"
        >
          Atualizar Evento
        </button>
      </form>

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

export { EditarEvento };
