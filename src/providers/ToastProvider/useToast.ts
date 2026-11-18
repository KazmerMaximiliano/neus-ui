import { useContext } from "react";
import { ToastContext } from "./ToastContext";

export const useToast = () => {
  const api = useContext(ToastContext);
  if (!api) throw new Error("useToast needs a ToastProvider above the component that calls it.");
  return api;
};
