import {v4 as uuidv4} from 'uuid';
import { addToast as add, removeToast as remove } from "../store/toastSlice";
import { useDispatch } from "react-redux";

const useToast= () => {
    const dispastch = useDispatch();

    const addToast = (toast) =>{
        const id = uuidv4();
        const toastWithid = {
            ...toast,
            id,
        }
        
        dispastch(add(toastWithid));

        
        setTimeout(() => {
            deleteToast(id);
        },3000);
        
    }

    const deleteToast = (id) => {
        dispastch(remove(id));
    }

    return {
        addToast,
        deleteToast
    }
    
}
export default useToast