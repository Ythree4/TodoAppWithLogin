import { useAuthContext } from "./useAuthContext";
import { useTodoListContext } from "./useTodoListContext";


export const useLogout = () => {

    const { dispatch } = useAuthContext()
    const { dispatch: dispatchTodo } = useTodoListContext()

    const logout = () => {
        localStorage.removeItem('user')

        dispatch({ type: "LOGOUT" })
        dispatchTodo({ type: "SET_TASKS", payload: null })

    }

    return { logout }
}