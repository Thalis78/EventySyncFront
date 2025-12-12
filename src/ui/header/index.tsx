import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const hideProfileMenu = ["/", "/login", "/registro"];

  const goHome = () => {
    const papel = localStorage.getItem("papelUsuario");
    
    if (papel === "ORGANIZADOR") {
      navigate("/organizador/eventos");
    } else {
      navigate("/eventos");
    }
  };

  const logout = () => {
    localStorage.removeItem("idUsuario");
    localStorage.removeItem("papelUsuario");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center bg-black text-white p-4">
      <h1 className="text-2xl font-bold cursor-pointer" onClick={goHome}>
        Eventy Sync
      </h1>

      {!hideProfileMenu.includes(location.pathname) && (
        <div className="flex items-center gap-4">
          <button
            onClick={goHome}
            className="px-3 py-1 border rounded hover:bg-white hover:text-black transition"
          >
            Home
          </button>

          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="px-3 py-1 border rounded hover:bg-white hover:text-black transition"
            >
              Perfil
            </button>

            {open && (
              <div className="absolute right-0 mt-2 bg-white text-black shadow rounded w-32">
                <button
                  onClick={() => navigate("/perfil")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Visualizar
                </button>

                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export { Header };
