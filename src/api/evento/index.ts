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
