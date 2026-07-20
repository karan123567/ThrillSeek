"use client";

import { ToastType } from "@/lib/types";
import { AlertCircle, CheckCheck, CheckCircle, Info, X } from "lucide-react";
import { createContext, useCallback, useContext, useState } from "react";


interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });
export const useToast = () => useContext(ToastContext);

let toastid = 0;

export function ToastProvider({ children }: { children: React.ReactNode}) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback(
        (message: string, type: ToastType = "info") => {
            const id = ++toastid;
            setToasts((prev) => [...prev, { id, message, type }]);
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) =>t.id !== id));
            }, 3000)
        },
        []
    );

    const removeToast = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

    const icons = {
        success: <CheckCircle className="w-4 h-4 shrink-0" />,
        error: <AlertCircle className="w-4 h-4 shrink-0" />,
        info: <Info className="w-4 h-4 shrink-0" />,
    };


    const bgColors = {
        success: "bg-green-600/90 border-green-500/30",
        error: "bg-red-600/90 border-red-400/30",
        info: "bg-[rgba(23,23,23,0.95)] border-white/10 backdrop-blur-xl",
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed top-24 right-6 z-[9999] flex flex-col gap-2">
                {toasts.map((toast) => (
                    <div
                    key={toast.id}
                    className={`flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm font-medium text-white min-w-[300px] shadow-2xl border animate-slide-down ${bgColors[toast.type]}`}
                    >
                        {icons[toast.type]}
                        <span className="flex-1">{toast.message}</span>
                        <button
                        onClick={() => removeToast(toast.id)}
                        className= "text-white/50 hover:text-white transition-colors"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}