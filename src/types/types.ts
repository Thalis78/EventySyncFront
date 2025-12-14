export type TipoEvento = "GRATUITO" | "PAGO";
export type StatusEvento = "RASCUNHO" | "ABERTO" | "FINALIZADO";
export type StatusInscricao =
  | "PENDENTE"
  | "CANCELADA"
  | "APROVADA"
  | "AGUARDANDO_PAGAMENTO";

export type Usuario = {
  id: number;
  nome: string;
  email: string;
  hashSenha: string;
  cidade: string;
  visibilidadeParticipacao: boolean;
  papelUsuario: "ORGANIZADOR" | "PARTICIPANTE";
};

export type LoginData = {
  email: string;
  senha: string;
};

export type LoginResponse = {
  idUsuario: string;
  papelUsuario: string;
  token: string;
};

export type RegisterData = {
  nome: string;
  email: string;
  senha: string;
  cidade: string;
  papelUsuario: "PARTICIPANTE" | "ORGANIZADOR";
};

export type Evento = {
  id?: number;
  titulo: string;
  descricao: string;
  localEndereco: string;
  dataHoraInicio: string;
  dataHoraFinal: string;
  preco: number;
  tipoEvento: TipoEvento;
  inscricaoAbre: string;
  inscricaoFecha: string;
  maxInscricao: number;
  statusEvento: StatusEvento;
  cargaHoraria: number;
  inscricaoAberta: boolean;
  organizadorId: number;
};

export type InscricaoEventoResponseDTO = {
  id: number;
  idInscrito: number;
  tituloEvento: string;
  statusInscricao: StatusInscricao;
  dataHoraInscricao: Date | null;
  cargaHoraria: number;
  tipoEvento: TipoEvento;
};
