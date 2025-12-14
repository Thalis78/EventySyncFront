import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { buscarEventosDoOrganizador } from "../../api/evento";
import { Toast } from "../../ui/toast";
import {
  aprovarInscricao,
  recusarInscricao,
  confirmarPagamento,
  listarInscricoes,
  abrirInscricoes,
  fecharInscricoes,
} from "../../api/inscricao";
import type { Evento } from "../../types/types";

const ListagemEventosOrganizador = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [participantes, setParticipantes] = useState<any[]>([]);
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  const token = localStorage.getItem("token");
  const organizadorId = localStorage.getItem("idUsuario");

  useEffect(() => {
    const fetchEventos = async () => {
      if (organizadorId) {
        try {
          const eventosList = await buscarEventosDoOrganizador(
            Number(organizadorId),
            token!
          );
          setEventos(eventosList);
        } catch (error) {
          setToastMessage("Erro ao carregar eventos.");
          setToastType("error");
        }
      }
    };

    fetchEventos();
  }, [organizadorId, token]);

  const handleAbrirInscricoes = async (id: number) => {
    try {
      await abrirInscricoes(id, token!);
      setToastMessage("Inscrições abertas com sucesso.");
      setToastType("success");

      setEventos((prevEventos) =>
        prevEventos.map((evento) =>
          evento.id === id
            ? {
                ...evento,
                inscricaoAberta: true,
              }
            : evento
        )
      );
    } catch (error) {
      setToastMessage("Erro ao abrir inscrições.");
      setToastType("error");
    }
  };

  const handleFecharInscricoes = async (id: number) => {
    try {
      await fecharInscricoes(id, token!);
      setToastMessage("Inscrições fechadas com sucesso.");
      setToastType("success");

      setEventos((prevEventos) =>
        prevEventos.map((evento) =>
          evento.id === id
            ? {
                ...evento,
                inscricaoAberta: false,
              }
            : evento
        )
      );
    } catch (error) {
      setToastMessage("Erro ao fechar inscrições.");
      setToastType("error");
    }
  };

  const handleVerParticipantes = async (eventoId: number) => {
    try {
      const participantesList = await listarInscricoes(eventoId, token!);
      setParticipantes(participantesList);
      setExpandedEvent(expandedEvent === eventoId ? null : eventoId);
    } catch (error) {
      setToastMessage("Erro ao carregar participantes.");
      setToastType("error");
    }
  };

  const handleAprovarInscricao = async (inscricaoId: number) => {
    try {
      await aprovarInscricao(inscricaoId, token!);
      setToastMessage("Inscrição aprovada com sucesso.");
      setToastType("success");
    } catch (error) {
      setToastMessage("Erro ao aprovar inscrição.");
      setToastType("error");
    }
  };

  const handleRecusarInscricao = async (inscricaoId: number) => {
    try {
      await recusarInscricao(inscricaoId, token!);
      setToastMessage("Inscrição recusada com sucesso.");
      setToastType("success");
    } catch (error) {
      setToastMessage("Erro ao recusar inscrição.");
      setToastType("error");
    }
  };

  const handleConfirmarPagamento = async (inscricaoId: number) => {
    try {
      await confirmarPagamento(inscricaoId, token!);
      setToastMessage("Pagamento confirmado com sucesso.");
      setToastType("success");
    } catch (error) {
      setToastMessage("Erro ao confirmar pagamento.");
      setToastType("error");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b pb-4">
        <h2 className="text-3xl font-semibold text-gray-800">
          Eventos do Organizador
        </h2>
        <Link
          to="/organizador/eventos/cadastrar"
          className="bg-black text-white px-6 py-3 rounded-lg shadow-lg transition duration-200 hover:bg-gray-800"
        >
          Adicionar Novo Evento
        </Link>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto text-sm text-left text-gray-500">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-lg font-medium text-gray-700">
                Título
              </th>
              <th className="px-6 py-3 text-lg font-medium text-gray-700">
                Tipo
              </th>
              <th className="px-6 py-3 text-lg font-medium text-gray-700">
                Status do Evento
              </th>
              <th className="px-6 py-3 text-lg font-medium text-gray-700">
                Status da Inscrição
              </th>
              <th className="px-6 py-3 text-lg font-medium text-gray-700">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {eventos.map((evento) => (
              <tr
                key={evento.id}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {evento.titulo}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold text-white ${
                      evento.tipoEvento === "GRATUITO"
                        ? "bg-blue-600"
                        : "bg-green-600"
                    }`}
                  >
                    {evento.tipoEvento}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold text-white ${
                      evento.statusEvento === "ABERTO"
                        ? "bg-green-600"
                        : "bg-gray-700"
                    }`}
                  >
                    {evento.statusEvento}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold text-white ${
                      evento.inscricaoAberta ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {evento.inscricaoAberta
                      ? "Inscrições Abertas"
                      : "Inscrições Fechadas"}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <Link
                    to={`/organizador/eventos/editar/${evento.id}`}
                    className="bg-black text-white px-4 py-2 rounded-lg transition duration-200 hover:bg-gray-800 text-sm"
                  >
                    Editar
                  </Link>

                  <button
                    onClick={() => handleVerParticipantes(evento.id!)}
                    className={`px-4 py-2 rounded-lg transition duration-200 text-sm ${
                      expandedEvent === evento.id
                        ? "bg-indigo-700 text-white hover:bg-indigo-600"
                        : "bg-indigo-500 text-white hover:bg-indigo-600"
                    }`}
                  >
                    {expandedEvent === evento.id
                      ? "Esconder Participantes"
                      : "Ver Participantes"}
                  </button>

                  {!evento.inscricaoAberta ? (
                    <button
                      onClick={() =>
                        evento.id !== undefined &&
                        handleAbrirInscricoes(evento.id)
                      }
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200 text-sm"
                    >
                      Abrir Inscrições
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        evento.id !== undefined &&
                        handleFecharInscricoes(evento.id)
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 text-sm"
                    >
                      Fechar Inscrições
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {expandedEvent !== null && (
        <div className="mt-6 p-6 bg-white shadow-xl rounded-xl border border-gray-200">
          <h3 className="font-extrabold text-2xl text-gray-800 mb-4 border-b pb-2">
            Participantes
          </h3>
          {participantes.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <p className="text-lg text-gray-500 font-semibold mb-2">
                Nenhuma Inscrição Encontrada
              </p>
              <p className="text-sm text-gray-400">
                Aguardando os primeiros participantes para este evento.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {participantes.map((inscricao) => {
                let statusClasses = "";
                switch (inscricao.statusInscricao) {
                  case "APROVADA":
                    statusClasses =
                      "bg-green-100 text-green-800 border-green-400";
                    break;
                  case "AGUARDANDO_PAGAMENTO":
                    statusClasses =
                      "bg-yellow-100 text-yellow-800 border-yellow-400";
                    break;
                  case "PENDENTE":
                    statusClasses = "bg-blue-100 text-blue-800 border-blue-400";
                    break;
                  case "CANCELADA":
                    statusClasses = "bg-red-100 text-red-800 border-red-400";
                    break;
                  default:
                    statusClasses = "bg-gray-100 text-gray-800 border-gray-400";
                }

                return (
                  <li
                    key={inscricao.id}
                    className="flex flex-col md:flex-row md:items-center justify-between py-4 transition duration-150 ease-in-out hover:bg-gray-50"
                  >
                    <div className="mb-2 md:mb-0 md:w-1/3">
                      <span className="text-gray-900 font-medium">
                        {inscricao.nomeUsuario}
                      </span>
                    </div>

                    <div className="mb-2 md:mb-0 md:w-1/4">
                      <span
                        className={`px-3 py-1 text-sm font-semibold rounded-full border ${statusClasses}`}
                      >
                        {inscricao.statusInscricao.replace(/_/g, " ")}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 md:w-auto">
                      {inscricao.statusInscricao === "AGUARDANDO_PAGAMENTO" && (
                        <button
                          onClick={async () => {
                            await handleConfirmarPagamento(inscricao.id);
                            setParticipantes((prev) =>
                              prev.map((p) =>
                                p.id === inscricao.id
                                  ? { ...p, statusInscricao: "APROVADA" }
                                  : p
                              )
                            );
                          }}
                          className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition"
                        >
                          Confirmar Pagamento
                        </button>
                      )}
                      {inscricao.statusInscricao === "PENDENTE" && (
                        <button
                          onClick={async () => {
                            await handleAprovarInscricao(inscricao.id);
                            setParticipantes((prev) =>
                              prev.map((p) =>
                                p.id === inscricao.id
                                  ? { ...p, statusInscricao: "APROVADA" }
                                  : p
                              )
                            );
                          }}
                          className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition"
                        >
                          Aprovar
                        </button>
                      )}
                      {inscricao.statusInscricao !== "CANCELADA" && (
                        <button
                          onClick={async () => {
                            await handleRecusarInscricao(inscricao.id);
                            setParticipantes((prev) =>
                              prev.map((p) =>
                                p.id === inscricao.id
                                  ? { ...p, statusInscricao: "CANCELADA" }
                                  : p
                              )
                            );
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition"
                        >
                          Recusar
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
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

export { ListagemEventosOrganizador };
