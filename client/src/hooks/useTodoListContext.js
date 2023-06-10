import { TodoContext } from "../context/TodoContext";
import { useContext } from "react";

export const useTodoListContext = () => {
    const context = useContext(TodoContext)

    if (!context) {
        throw Error('useTodoListContext must be used within a TodoContextProvider')
    }

    return context
}
