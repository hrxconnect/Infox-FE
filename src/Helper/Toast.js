import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export const Success = (value) => {
    toast.success(value, { position: toast.POSITION.BOTTOM_RIGHT }, { autoClose: 1000 })
}
export const Warning = (value) => {
    toast.warning(value, { position: toast.POSITION.BOTTOM_RIGHT }, { autoClose: 1000 })
}
export const Error = (value) => {
    toast.error(value, { position: toast.POSITION.BOTTOM_RIGHT }, { autoClose: 1000 })
}