import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const typeUser = localStorage.getItem("papelUsuario");

  const verificarUsoDoToken = useCallback(() => {
    return token !== null;
  }, [token]);

  const redirecionarParaTelaDeLogin = useCallback(() => {
    if (!verificarUsoDoToken()) {
      navigate("/login");
    }
  }, [navigate, verificarUsoDoToken]);

  const redirecionarParaTelaDeHome = useCallback(() => {
    if (verificarUsoDoToken()) {
      if (typeUser === "ORGANIZADOR") {
        navigate("/organizador/eventos");
      } else {
        navigate("/eventos");
      }
    }
  }, [navigate, verificarUsoDoToken, typeUser]);

  return {
    verificarUsoDoToken,
    redirecionarParaTelaDeLogin,
    redirecionarParaTelaDeHome,
  };
};
