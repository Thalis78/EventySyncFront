import type { Evento } from "../../types/types";

const BASE_URL = "http://localhost:8080";

export const criarEvento = async (evento: Evento, token: string) => {
  const response = await fetch(`${BASE_URL}/eventos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(evento),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao criar evento.");
  }

  return response.json();
};

export const buscarEventoPorId = async (
  id: number,
  token: string
): Promise<Evento> => {
  const res = await fetch(`${BASE_URL}/eventos/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Erro ao buscar evento.");
  }

  return res.json();
};

export const editarEvento = async (
  id: number,
  evento: Evento,
  token: string
): Promise<Evento> => {
  const res = await fetch(`${BASE_URL}/eventos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(evento),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Erro ao atualizar evento.");
  }

  return res.json();
};

export const buscarEventosDoOrganizador = async (
  organizadorId: number,
  token: string
) => {
  const res = await fetch(`${BASE_URL}/eventos/organizador/${organizadorId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.message || "Erro ao buscar eventos do organizador."
    );
  }

  return res.json();
};

export const listarEventosPagos = async (token: string) => {
  const res = await fetch(`${BASE_URL}/eventos/pagos`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Erro ao listar eventos pagos.");
  }

  return res.json();
};

export const listarEventosGratuitos = async (token: string) => {
  const res = await fetch(`${BASE_URL}/eventos/gratuitos`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.log(errorData);
    throw new Error(errorData.message || "Erro ao listar eventos gratuitos.");
  }

  return res.json();
};

export const visualizarCertificado = async (
  eventoId: number,
  usuarioId: number,
  token: string
) => {
  const res = await fetch(
    `${BASE_URL}/eventos/${eventoId}/usuario/${usuarioId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Erro ao visualizar certificado.");
  }

  return res.json();
};

export const gerarCertificado = async (
  eventoId: number,
  usuarioId: number,
  token: string
) => {
  const res = await fetch(
    `${BASE_URL}/eventos/${eventoId}/certificados/${usuarioId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Erro ao gerar certificado.");
  }

  return res.json();
};
