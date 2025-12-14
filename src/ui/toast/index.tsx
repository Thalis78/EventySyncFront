import { useEffect, useState } from "react";

interface ToastProps {
  message: string | null;
  variant?: "success" | "error";
  duration?: number;
  onClose: () => void;
}

const variants = {
  success: "bg-green-500",
  error: "bg-red-500",
};

export const Toast = ({
  message,
  variant = "success",
  duration = 3000,
  onClose,
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500);
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message || !isVisible) return null;

  return (
    <div
      className={`fixed top-24 right-4 p-4 rounded-md shadow-lg text-white transition-opacity duration-500 ${
        variants[variant]
      } ${!isVisible ? "opacity-0" : "opacity-100"}`}
    >
      {message}
    </div>
  );
};
