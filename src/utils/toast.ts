import { toast } from "react-toastify";


/**
 * Toast(success)メッセージを表示します
 *
 * @param message - toastに表示するメッセージ
 */
export const ToastSuccess = (message: string) => {
    toast.success(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}

/**
 * Toast(success)メッセージを表示します
 *
 * @param message - toastに表示するメッセージ
 */
export const ToastError = (message: string) => {
    toast.error(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}