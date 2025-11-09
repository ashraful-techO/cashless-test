import { toast } from 'react-toastify';

interface IToastType {
    message: string;
    autoClose?: number;
    theme?: 'colored' | 'dark' | 'light';
    position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
}

export const toastError = ({ message, position, theme, autoClose }: IToastType): void => {
    toast.error(message, {
        draggable: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        hideProgressBar: false,
        theme: theme || 'light',
        autoClose: autoClose || 3000,
        position: position || 'bottom-right',
    });
};

export const toastSuccess = ({ message, position, theme, autoClose }: IToastType): void => {
    toast.success(message, {
        draggable: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        hideProgressBar: false,
        theme: theme || 'light',
        autoClose: autoClose || 3000,
        position: position || 'bottom-right',
    });
};
