import { ButtonColor } from "../Button/Button.types";
export type ModalProps = {
    isOpen?: boolean;
    title?: string;
    children?: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
    confirmButtonColor?: ButtonColor;
    onConfirm?: () => void;
    onCancel?: () => void;
};
