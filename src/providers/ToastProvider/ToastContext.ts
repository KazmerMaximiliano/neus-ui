import { createContext } from "react";
import type { ToastApi } from "./ToastProvider.types";

export const ToastContext = createContext<ToastApi | null>(null);
