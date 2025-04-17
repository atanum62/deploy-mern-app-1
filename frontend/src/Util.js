import { toast } from "react-toastify";

export const handleScuess = (msg) => {
    toast.success(msg, {
        position:"top-left"
    })
}


export const handleError = (msg) => {
    toast.error(msg, {
        position:"top-right"
    })
}

