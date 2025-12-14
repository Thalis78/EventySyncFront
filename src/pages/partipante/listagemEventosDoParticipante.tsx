import React, { useState, useEffect } from "react";
import { visualizarCertificado, gerarCertificado } from "../../api/evento";
import { Toast } from "../../ui/toast";
import { listarEventosPorUsuario } from "../../api/inscricao";
import { useNavigate } from "react-router-dom";
import type { InscricaoEventoResponseDTO } from "../../types/types";

const ListagemDeEventosInscritos = () => {
  const [eventos, setEventos] = useState<InscricaoEventoResponseDTO[]>([]);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const token = localStorage.getItem("token");
  const usuarioId = Number(localStorage.getItem("idUsuario"));
  const navigate = useNavigate();

  const fetchEventosInscritos = async () => {
    if (!token || !usuarioId) return;

    try {
      const eventosUsuario = await listarEventosPorUsuario(usuarioId, token);

      const eventosMapeados = eventosUsuario.map(
        (inscricao: InscricaoEventoResponseDTO) => ({
          id: inscricao.id,
          idInscrito: inscricao.idInscrito,
          tituloEvento: inscricao.tituloEvento,
          statusInscricao: inscricao.statusInscricao,
          dataHoraInscricao: inscricao.dataHoraInscricao,
          cargaHoraria: inscricao.cargaHoraria,
          tipoEvento: inscricao.tipoEvento,
        })
      );

      setEventos(eventosMapeados);
    } catch (error) {
      setToastMessage("Erro ao carregar eventos inscritos.");
      setToastType("error");
    }
  };

  const handleVisualizarOuGerarCertificado = async (eventoId: number) => {
    try {
      await visualizarCertificado(eventoId, usuarioId, token!);

      navigate(`/certificado/${eventoId}`);
    } catch (error) {
      await gerarCertificado(eventoId, usuarioId, token!);
      setToastMessage("Certificado gerado com sucesso!");
      setToastType("success");
      fetchEventosInscritos();
      navigate(`/certificado/${eventoId}`);
    }
  };

  useEffect(() => {
    fetchEventosInscritos();
  }, [token, usuarioId]);

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b pb-4">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-4 md:mb-0">
          Eventos Inscritos
        </h2>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto text-sm text-left text-gray-500">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-4 px-6 text-left text-lg font-bold">Evento</th>
              <th className="py-4 px-6 text-left text-lg font-bold">
                Status Inscrição
              </th>
              <th className="py-4 px-6 text-left text-lg font-bold">
                Data da Inscrição
              </th>
              <th className="py-4 px-6 text-left text-lg font-bold">
                Carga Horária
              </th>
              <th className="py-4 px-6 text-left text-lg font-bold">
                Tipo de Evento
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
                    {evento.tituloEvento}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        evento.statusInscricao === "APROVADA"
                          ? "bg-green-100 text-green-700 border border-green-400"
                          : "bg-red-100 text-red-700 border border-red-400"
                      }`}
                    >
                      {evento.statusInscricao}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {evento.dataHoraInscricao
                      ? evento.dataHoraInscricao.toLocaleString()
                      : "Não disponível"}
                  </td>
                  <td className="py-4 px-6">{evento.cargaHoraria} horas</td>
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
                  <td className="py-4 px-6 text-center">
                    {evento.statusInscricao === "APROVADA" ? (
                      <button
                        onClick={() =>
                          handleVisualizarOuGerarCertificado(evento.id!)
                        }
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition duration-200"
                      >
                        Visualizar Certificado
                      </button>
                    ) : (
                      <button
                        disabled
                        className="bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
                      >
                        Visualizar Certificado
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
                    Você não está inscrito em nenhum evento no momento.
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

export { ListagemDeEventosInscritos };
