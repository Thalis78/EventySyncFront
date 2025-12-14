const BASE_URL = "http://localhost:8080";

export const abrirInscricoes = async (id: number, token: string) => {
  const response = await fetch(`${BASE_URL}/eventos/${id}/abrir-inscricoes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao abrir inscrições.");
  }

  return response.json();
};

export const fecharInscricoes = async (id: number, token: string) => {
  const response = await fetch(`${BASE_URL}/eventos/${id}/fechar-inscricoes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao fechar inscrições.");
  }

  return response.json();
};

export const listarEventosPorUsuario = async (
  usuarioId: number,
  token: string
) => {
  const response = await fetch(`${BASE_URL}/eventos/usuario/${usuarioId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao listar eventos do usuário.");
  }

  return response.json();
};

export const listarInscricoes = async (eventoId: number, token: string) => {
  const res = await fetch(`${BASE_URL}/eventos/${eventoId}/inscricoes`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Erro ao listar inscrições.");
  }

  return res.json();
};

export const solicitarInscricao = async (
  eventoId: number,
  usuarioId: number,
  token: string
) => {
  const response = await fetch(`${BASE_URL}/eventos/${eventoId}/registrar`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuarioId),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao solicitar inscrição.");
  }

  return response.json();
};

export const aprovarInscricao = async (id: number, token: string) => {
  const response = await fetch(`${BASE_URL}/inscricoes/${id}/aprovar`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao aprovar inscrição.");
  }

  return response.json();
};

export const recusarInscricao = async (id: number, token: string) => {
  const response = await fetch(`${BASE_URL}/inscricoes/${id}/recusar`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao recusar inscrição.");
  }

  return response.json();
};

export const confirmarPagamento = async (id: number, token: string) => {
  const response = await fetch(
    `${BASE_URL}/inscricoes/${id}/confirmar-pagamento`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao confirmar pagamento.");
  }

  return response.json();
};
