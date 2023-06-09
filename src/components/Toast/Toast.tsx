/* eslint-disable consistent-return */
import React, { useEffect, useState } from "react";

interface ToastProps {
  show: boolean;
  message: string;
  afterShow: () => void;
}

export function Toast({ show, message, afterShow }: ToastProps) {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        afterShow();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, afterShow]);

  return isVisible ? (
    <div className="fixed top-4 rounded bg-green-500 py-2 px-4 text-white">
      {message}
    </div>
  ) : null;
}
