import type {
  Evento,
  LoginData,
  LoginResponse,
  RegisterData,
  Usuario,
} from "../types/types";

const BASE_URL = "http://localhost:8080";

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Erro ao fazer login.");
  }

  return res.json();
};

export const registrar = async (data: RegisterData) => {
  const res = await fetch(`${BASE_URL}/auth/registrar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Erro ao registrar usuário.");
  }

  return res.json();
};

export const getPerfil = async (): Promise<Usuario> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token não encontrado. Faça login novamente.");

  const res = await fetch(`${BASE_URL}/usuarios/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Erro ao buscar dados do usuário.");

  return res.json();
};

export const updatePerfil = async (usuario: Usuario): Promise<Usuario> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token não encontrado. Faça login novamente.");

  const res = await fetch(`${BASE_URL}/usuarios/me`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  });

  if (!res.ok) throw new Error("Erro ao atualizar perfil.");

  return res.json();
};

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
