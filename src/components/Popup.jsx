import React, { useEffect } from "react";

export default function Popup({
  type = "success",
  message,
  onClose,
  autoDismiss = true,
  dismissTime = 1000,
}) {
  const baseStyles =
    "fixed inset-0 flex items-center justify-center z-50 px-4 text-center";
  const containerStyles =
    "bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300";
  const typeStyles = {
    success: "border-l-4 border-green-600 text-green-700",
    error: "border-l-4 border-red-600 text-red-700",
  };

  useEffect(() => {
    let timer;
    if (autoDismiss) {
      timer = setTimeout(() => {
        onClose?.();
      }, dismissTime);
    }
    return () => clearTimeout(timer);
  }, [autoDismiss, dismissTime, onClose]);

  return (
    <div className={baseStyles}>
      <div className={`${containerStyles} ${typeStyles[type]}`}>
        <h2 className="text-2xl font-bold mb-4">
          {type === "success" ? "Succès 🌱" : "Erreur ⚠️"}
        </h2>
        <p className="text-base mb-4">{message}</p>
      </div>
    </div>
  );
}