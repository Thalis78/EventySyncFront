import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/autenticacao/login";
import { Registro } from "./pages/autenticacao/registro";
import { VisualizarPerfil } from "./pages/perfil/visualizarPerfil";
import { ListagemEventosOrganizador } from "./pages/organizador/listagemEventos";
import { CadastrarEvento } from "./pages/organizador/cadastrarEvento";
import { EditarEvento } from "./pages/organizador/editarEvento";
import { ListagemDeTodosEventos } from "./pages/partipante/listagemDeTodosEventos";
import { ListagemDeEventosInscritos } from "./pages/partipante/listagemEventosDoParticipante";
import { CertificadoPage } from "./pages/certificado/certificadoParticipante";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/perfil" element={<VisualizarPerfil />} />
      <Route
        path="/organizador/eventos"
        element={<ListagemEventosOrganizador />}
      />
      <Route
        path="/organizador/eventos/cadastrar"
        element={<CadastrarEvento />}
      />
      <Route path="/eventos" element={<ListagemDeTodosEventos />} />
      <Route
        path="/eventos/participantes"
        element={<ListagemDeEventosInscritos />}
      />
      <Route path="/certificado/:id" element={<CertificadoPage />} />
      <Route
        path="/organizador/eventos/editar/:id"
        element={<EditarEvento />}
      />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
