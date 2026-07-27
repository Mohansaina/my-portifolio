"use client";

import React, { useEffect } from "react";

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: "success" | "info" | "warning";
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div className="pointer-events-auto bg-[#161820]/95 border border-white/10 text-primary p-4 rounded-xl shadow-2xl backdrop-blur-xl flex items-start gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg shrink-0">
        <span className="material-symbols-outlined text-lg">check_circle</span>
      </div>
      <div className="flex-1">
        <h4 className="font-label-caps text-sm font-bold text-white tracking-wide">{toast.title}</h4>
        {toast.description && (
          <p className="font-body-md text-xs text-on-surface-variant/80 mt-0.5">{toast.description}</p>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-on-surface-variant/50 hover:text-white transition-colors p-1"
        aria-label="Dismiss toast"
      >
        <span className="material-symbols-outlined text-sm">close</span>
      </button>
    </div>
  );
};
