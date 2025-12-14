import React, { useState, useEffect } from "react";
import { listarEventosGratuitos, listarEventosPagos } from "../../api/evento";
import { solicitarInscricao } from "../../api/inscricao";
import { listarEventosPorUsuario } from "../../api/inscricao";
import { Toast } from "../../ui/toast";
import type { Evento } from "../../types/types";

const ListagemDeTodosEventos = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [tipoEvento, setTipoEvento] = useState<"GRATUITO" | "PAGO" | "TODOS">(
    "TODOS"
  );
  const token = localStorage.getItem("token");
  const usuarioId = Number(localStorage.getItem("idUsuario"));

  const fetchEventos = async () => {
    if (!token || !usuarioId) return;

    try {
      let eventosList: Evento[] = [];

      if (tipoEvento === "GRATUITO") {
        eventosList = await listarEventosGratuitos(token);
      } else if (tipoEvento === "PAGO") {
        eventosList = await listarEventosPagos(token);
      } else {
        const eventosGratuitos = await listarEventosGratuitos(token);
        const eventosPagos = await listarEventosPagos(token);
        eventosList = [...eventosGratuitos, ...eventosPagos];
      }

      const eventosUsuario = await listarEventosPorUsuario(usuarioId, token);

      const eventosNaoInscritos = eventosList.filter(
        (evento) =>
          !eventosUsuario.some((eventoInscrito: Evento) => {
            return eventoInscrito.id === evento.id;
          })
      );

      setEventos(eventosNaoInscritos);
    } catch (error) {
      setToastMessage("Erro ao carregar eventos.");
      setToastType("error");
    }
  };

  useEffect(() => {
    fetchEventos();
  }, [tipoEvento, token, usuarioId]);

  const renderStatusInscricao = (status: boolean) => {
    return (
      <span
        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
          status
            ? "bg-green-100 text-green-700 border border-green-400"
            : "bg-red-100 text-red-700 border border-red-400"
        }`}
      >
        {status ? "Inscrições Abertas" : "Inscrições Fechadas"}
      </span>
    );
  };

  const handleInscricao = async (eventoId: number) => {
    if (!usuarioId || !token) {
      setToastMessage("Usuário não autenticado.");
      setToastType("error");
      return;
    }

    try {
      await solicitarInscricao(eventoId, usuarioId, token);
      setToastMessage("Inscrição solicitada com sucesso.");
      setToastType("success");

      fetchEventos();
    } catch (error: any) {
      setToastMessage(error.message || "Erro ao realizar inscrição.");
      setToastType("error");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b pb-4">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-4 md:mb-0">
          Eventos Disponíveis
        </h2>
        <div className="flex items-center space-x-4">
          <label className="text-gray-600 font-medium">Filtrar por Tipo:</label>
          <select
            value={tipoEvento}
            onChange={(e) =>
              setTipoEvento(e.target.value as "GRATUITO" | "PAGO" | "TODOS")
            }
            className="px-4 py-2 rounded-lg text-base font-medium border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
          >
            <option value="TODOS">Todos</option>
            <option value="GRATUITO">Gratuitos</option>
            <option value="PAGO">Pagos</option>
          </select>
        </div>
      </div>

      <div className="mb-6 text-center text-gray-500 text-sm p-4 bg-indigo-50 rounded-lg border border-indigo-200">
        <p className="font-semibold text-indigo-700">
          Atenção: Apenas eventos nos quais você não está inscrito atualmente
          são exibidos nesta lista.
        </p>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto text-sm text-left text-gray-500">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-4 px-6 text-left text-lg font-bold">Evento</th>
              <th className="py-4 px-6 text-left text-lg font-bold">Tipo</th>
              <th className="py-4 px-6 text-left text-lg font-bold">Valor</th>
              <th className="py-4 px-6 text-left text-lg font-bold">Status</th>
              <th className="py-4 px-6 text-left text-lg font-bold">Local</th>
              <th className="py-4 px-6 text-left text-lg font-bold">
                Inscrição
              </th>
              <th className="py-4 px-6 text-center text-lg font-bold">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {eventos.length > 0 ? (
              eventos.map((evento) => (
                <tr
                  key={evento.id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="py-4 px-6 font-semibold text-gray-900">
                    {evento.titulo}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        evento.tipoEvento === "GRATUITO"
                          ? "bg-green-100 text-green-700 border border-green-400"
                          : "bg-blue-100 text-blue-700 border border-blue-400"
                      }`}
                    >
                      {evento.tipoEvento === "GRATUITO" ? "Gratuito" : "Pago"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-bold text-gray-800">
                      R$ {evento.preco.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        evento.statusEvento === "ABERTO"
                          ? "bg-green-100 text-green-700 border border-green-400"
                          : "bg-red-100 text-red-700 border border-red-400"
                      }`}
                    >
                      {evento.statusEvento}
                    </span>
                  </td>
                  <td className="py-4 px-6">{evento.localEndereco}</td>
                  <td className="py-4 px-6">
                    {renderStatusInscricao(evento.inscricaoAberta)}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {evento.inscricaoAberta && evento.id !== undefined && (
                      <button
                        onClick={() => handleInscricao(evento.id!)}
                        className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition duration-200 shadow-md disabled:opacity-50"
                        disabled={evento.statusEvento !== "ABERTO"}
                      >
                        Inscrever-se
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-10 text-gray-500 bg-gray-50"
                >
                  <p className="text-lg font-medium">
                    Nenhum evento encontrado que você ainda não esteja inscrito!
                  </p>
                  <p className="text-sm mt-1">
                    Verifique o filtro ou aguarde novos eventos.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
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

export { ListagemDeTodosEventos };
