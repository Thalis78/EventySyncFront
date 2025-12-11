import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/autenticacao/login";
import { Registro } from "./pages/autenticacao/registro";
import { VisualizarPerfil } from "./pages/perfil/visualizarPerfil";
import { EditarPerfil } from "./pages/perfil/editarPerfil";
import { EventosOrganizador } from "./pages/organizador/eventosOrganizador";
import { CadastrarEvento } from "./pages/organizador/cadastrarEvento";
import { EditarEvento } from "./pages/organizador/editarEvento";
import { EventosParticipantes } from "./pages/partipante/eventosParticipantes";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      <Route path="/perfil" element={<VisualizarPerfil />} />
      <Route path="/perfil/editar" element={<EditarPerfil />} />

      <Route path="/organizador/eventos" element={<EventosOrganizador />} />
      <Route
        path="/organizador/eventos/cadastrar"
        element={<CadastrarEvento />}
      />
      <Route
        path="/organizador/eventos/editar/:id"
        element={<EditarEvento />}
      />

      <Route path="/eventos" element={<EventosParticipantes />} />

      <Route path="*" element={<Login />} />
    </Routes>
  );
}
