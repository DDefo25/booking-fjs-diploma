import { ToastContainer } from "react-bootstrap"
import { selectToastList } from "../../../features/slices/toastSlice"
import { useTypedSelector } from "../../../store/store"
import { Toast } from "./Toast"

export const ToastList = () => {
    const toastList = useTypedSelector( selectToastList )

    return (
        <ToastContainer className="position-fixed m-4" position="bottom-end">
            { toastList.map( toast => <Toast toast={toast} /> ) }
        </ToastContainer>
    )
}