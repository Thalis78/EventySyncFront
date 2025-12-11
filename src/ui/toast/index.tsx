import React, { useState, useEffect } from "react";
import "./styes.css";

type ToastProps = {
  mensagem: string;
  tipo?: "success" | "error";
};

const Toast = ({ mensagem, tipo = "success" }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`toast ${tipo} flex items-center justify-between p-4 mb-4 rounded-md shadow-lg text-white`}
    >
      <p>{mensagem}</p>
    </div>
  );
};

export { Toast };
