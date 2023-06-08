/* eslint-disable consistent-return */
import React, { useEffect, useState } from "react";

interface ToastProps {
  show: boolean;
  message: string;
}

export function Toast({ show, message }: ToastProps) {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setIsVisible(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return isVisible ? (
    <div className="fixed bottom-4 right-4 rounded bg-green-500 py-2 px-4 text-white">
      {message}
    </div>
  ) : null;
}
