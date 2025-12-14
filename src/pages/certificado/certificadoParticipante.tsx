import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { visualizarCertificado } from "../../api/evento";
import { Toast } from "../../ui/toast";

const CertificadoPage = () => {
  const { id } = useParams();
  const [certificado, setCertificado] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  useEffect(() => {
    const fetchCertificado = async () => {
      if (!id) {
        setToastMessage("ID do evento não encontrado.");
        setToastType("error");
        return;
      }

      try {
        const result = await visualizarCertificado(
          Number(id),
          Number(localStorage.getItem("idUsuario")!),
          localStorage.getItem("token")!
        );
        if (result) {
          setCertificado(result);
        } else {
          setToastMessage("Certificado não encontrado.");
          setToastType("error");
        }
      } catch (error) {
        setToastMessage("Erro ao carregar o certificado.");
        setToastType("error");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificado();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Carregando...
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 md:p-10">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        Visualizar Certificado
      </h2>

      {toastMessage && (
        <Toast
          message={toastMessage}
          variant={toastType}
          onClose={() => setToastMessage("")}
        />
      )}

      {certificado ? (
        <div className="bg-white p-6 md:p-12 rounded-xl shadow-2xl border-4 border-amber-500/50">
          <div className="border-4 border-amber-500 p-6 md:p-12">
            <div className="text-center mb-10 border-b-2 border-amber-300 pb-4">
              <p className="text-sm font-sans uppercase tracking-widest text-gray-600 mb-1">
                EVENTY SYNC CERTIFICATION
              </p>
              <h3 className="text-6xl font-serif text-amber-700 font-extrabold">
                CERTIFICADO
              </h3>
            </div>

            <div className="text-center mb-12">
              <h3 className="text-3xl font-serif italic text-gray-900 mb-6">
                Certificamos que
              </h3>

              <p className="text-5xl font-serif font-bold tracking-wide text-gray-900 border-b border-gray-300 pb-2 inline-block px-8">
                {certificado.participante.nome}
              </p>

              <p className="text-xl font-light text-gray-600 mt-6">
                Participou com sucesso do evento
              </p>

              <h3 className="text-4xl font-serif text-indigo-800 font-semibold mt-4">
                "{certificado.evento.titulo}"
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row justify-around mt-12 text-lg font-serif text-gray-700 border-t border-gray-300 pt-6">
              <p className="mb-2 sm:mb-0">
                <strong className="text-gray-900">Carga Horária:</strong>{" "}
                <span className="font-bold text-indigo-600">
                  {certificado.evento.cargaHoraria}
                </span>{" "}
                horas
              </p>
              <p>
                <strong className="text-gray-900">Emissão:</strong>{" "}
                {new Date(certificado.dataHoraEmissao).toLocaleDateString(
                  "pt-BR"
                )}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-lg shadow-inner">
          <p className="text-xl font-medium">
            Certificado não encontrado ou não emitido.
          </p>
        </div>
      )}
    </div>
  );
};

export { CertificadoPage };
