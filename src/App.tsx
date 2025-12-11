import React, { useState } from "react";
import { Toast } from "./ui/toast";

const App = () => {
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);

    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={handleShowToast}
        className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600"
      >
        Mostrar Toast
      </button>

      {showToast && (
        <Toast mensagem="Operação concluída com sucesso!" tipo="error" />
      )}
    </div>
  );
};

export default App;
