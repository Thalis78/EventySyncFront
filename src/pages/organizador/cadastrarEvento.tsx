import React, { useState } from "react";
import { Toast } from "../../ui/toast";
import { criarEvento } from "../../api/evento";

const CadastrarEvento = () => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [localEndereco, setLocalEndereco] = useState("");
  const [dataHoraInicio, setDataHoraInicio] = useState("");
  const [dataHoraFinal, setDataHoraFinal] = useState("");
  const [preco, setPreco] = useState(0);
  const [tipoEvento, setTipoEvento] = useState<"GRATUITO" | "PAGO">("GRATUITO");
  const [statusEvento, setStatusEvento] = useState<"RASCUNHO" | "ABERTO">(
    "RASCUNHO"
  );
  const [maxInscricao, setMaxInscricao] = useState(0);
  const [cargaHoraria, setCargaHoraria] = useState(0);
  const [inscricaoAbre, setInscricaoAbre] = useState("");
  const [inscricaoFecha, setInscricaoFecha] = useState("");
  const [inscricaoAberta, setInscricaoAberta] = useState(true);

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await criarEvento(
        {
          titulo,
          descricao,
          localEndereco,
          dataHoraInicio,
          dataHoraFinal,
          preco: tipoEvento === "GRATUITO" ? 0 : preco,
          tipoEvento,
          statusEvento,
          maxInscricao,
          cargaHoraria,
          inscricaoAbre,
          inscricaoFecha,
          inscricaoAberta,
          organizadorId: Number(localStorage.getItem("idUsuario")),
        },
        token
      );

      setToastMessage("Evento criado com sucesso!");
      setToastType("success");

      setTitulo("");
      setDescricao("");
      setLocalEndereco("");
      setDataHoraInicio("");
      setDataHoraFinal("");
      setPreco(0);
      setTipoEvento("GRATUITO");
      setStatusEvento("RASCUNHO");
      setMaxInscricao(0);
      setCargaHoraria(0);
      setInscricaoAbre("");
      setInscricaoFecha("");
      setInscricaoAberta(true);
    } catch (err: any) {
      setToastMessage(err.message);
      setToastType("error");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">
        Cadastrar Evento
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título do evento"
            className="w-full px-4 py-2 border rounded-md text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Descrição</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição do evento"
            className="w-full px-4 py-2 border rounded-md text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Local</label>
          <input
            type="text"
            value={localEndereco}
            onChange={(e) => setLocalEndereco(e.target.value)}
            placeholder="Endereço do evento"
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
            value={dataHoraInicio}
            onChange={(e) => setDataHoraInicio(e.target.value)}
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
            value={dataHoraFinal}
            onChange={(e) => setDataHoraFinal(e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Preço</label>
          <input
            type="number"
            value={tipoEvento === "GRATUITO" ? 0 : preco}
            onChange={(e) => setPreco(Number(e.target.value))}
            placeholder="Preço do evento"
            className="w-full px-4 py-2 border rounded-md text-sm"
            required
            disabled={tipoEvento === "GRATUITO"}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Tipo do Evento
          </label>
          <select
            value={tipoEvento}
            onChange={(e) =>
              setTipoEvento(e.target.value as "GRATUITO" | "PAGO")
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
            value={statusEvento}
            onChange={(e) =>
              setStatusEvento(e.target.value as "RASCUNHO" | "ABERTO")
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
            value={maxInscricao}
            onChange={(e) => setMaxInscricao(Number(e.target.value))}
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
            value={cargaHoraria}
            onChange={(e) => setCargaHoraria(Number(e.target.value))}
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
            value={inscricaoAbre}
            onChange={(e) => setInscricaoAbre(e.target.value)}
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
            value={inscricaoFecha}
            onChange={(e) => setInscricaoFecha(e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md text-sm"
        >
          Criar Evento
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

export { CadastrarEvento };
