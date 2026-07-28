"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Icon } from "./ui/Icon";

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
}

type ToastFn = (title: string, description?: string) => void;

const ToastContext = createContext<ToastFn>(() => {});

/** Call from any client component: `const toast = useToast()`. */
export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback<ToastFn>((title, description) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    // Keep at most three on screen; older ones drop off the top.
    setToasts((prev) => [...prev.slice(-2), { id, title, description }]);
  }, []);

  const value = useMemo(() => toast, [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        // Announced without stealing focus: confirmations are informative,
        // not interruptions.
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed bottom-8 left-1/2 z-[65] flex w-[calc(100%-48px)]
          max-w-sm -translate-x-1/2 flex-col gap-2"
      >
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem: React.FC<{
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 3600);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div
      className="surface pointer-events-auto flex items-start gap-3 rounded-md px-4 py-3
        shadow-[var(--shadow-2),var(--lit-top)]"
      style={{ animation: "toast-in var(--dur-4) var(--ease) both" }}
    >
      <span className="mt-0.5 text-lume">
        <Icon name="check" size={15} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-medium text-text-hi">{toast.title}</p>
        {toast.description && (
          <p className="mt-0.5 text-[12px] text-text-lo">{toast.description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss"
        className="-mr-1 -mt-1 rounded-xs p-1 text-text-lo transition-colors
          duration-[var(--dur-2)] hover:text-text-hi"
      >
        <Icon name="close" size={13} />
      </button>
    </div>
  );
};
