import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";

type NavButton = {
  to: string;
  children: React.ReactNode;
  isPrimary?: boolean;
};

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const papel = localStorage.getItem("papelUsuario");
  const hideProfileMenu = ["/", "/login", "/registro"];
  const isLoggedIn = !hideProfileMenu.includes(location.pathname);
  const isOrganizador = papel === "ORGANIZADOR";

  const goHome = () => {
    if (isOrganizador) {
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

  const navButtons = isOrganizador
    ? [{ name: "Meus Eventos", path: "/organizador/eventos" }]
    : [
        { name: "Procurar Eventos", path: "/eventos" },
        { name: "Minhas Inscrições", path: "/eventos/participantes" },
      ];

  const NavButton: React.FC<NavButton> = ({
    to,
    children,
    isPrimary = false,
  }) => (
    <button
      onClick={() => navigate(to)}
      className={`
        px-4 py-2 text-sm font-medium rounded-lg transition duration-300 shadow-md
        ${
          isPrimary
            ? "bg-indigo-600 text-white hover:bg-indigo-700"
            : "bg-transparent text-gray-300 border border-gray-700 hover:bg-gray-700 hover:text-white"
        }
      `}
    >
      {children}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center bg-gray-900 text-white shadow-xl px-6 py-3 md:px-10">
      <h1
        className="text-2xl font-extrabold cursor-pointer tracking-wider text-indigo-400 hover:text-indigo-300 transition duration-200"
        onClick={goHome}
      >
        Eventy Sync
      </h1>

      {isLoggedIn ? (
        <div className="flex items-center space-x-4 md:space-x-6">
          <nav className="hidden sm:flex items-center space-x-3">
            {navButtons.map((btn) => (
              <NavButton key={btn.path} to={btn.path}>
                {btn.name}
              </NavButton>
            ))}
          </nav>

          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center px-4 py-2 text-sm font-medium border border-gray-600 rounded-lg text-white bg-gray-800 hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Perfil
            </button>

            {open && (
              <div
                className="absolute right-0 mt-2 py-1 bg-white text-gray-800 border border-gray-200 rounded-lg shadow-xl w-40 origin-top-right"
                onBlur={() => setOpen(false)}
                tabIndex={-1}
              >
                <button
                  onClick={() => {
                    navigate("/perfil");
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-indigo-50 hover:text-indigo-600 transition duration-150"
                >
                  Visualizar
                </button>

                <div className="border-t border-gray-100 my-1"></div>

                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 text-red-600 transition duration-150"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 text-sm font-medium rounded-lg text-white border border-transparent bg-indigo-600 hover:bg-indigo-700 transition duration-300"
          >
            Entrar
          </button>
          <button
            onClick={() => navigate("/registro")}
            className="hidden sm:inline-block px-4 py-2 text-sm font-medium rounded-lg text-indigo-400 border border-indigo-400 hover:bg-indigo-400 hover:text-gray-900 transition duration-300"
          >
            Registrar
          </button>
        </div>
      )}
    </header>
  );
};

export { Header };
