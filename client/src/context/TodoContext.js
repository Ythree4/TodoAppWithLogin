import { createContext } from "react";
import { useReducer } from "react";

export const TodoContext = createContext()

export const todolistReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TASKS':
            return {
                tasks: action.payload
            }
        case 'ADD_TASK':
            return {
                tasks: [action.payload, ...state.tasks]
            }
        case 'DELETE_TASK':
            return {
                tasks: state.tasks.filter((t) => t._id !== action.payload._id)
            }
        case 'EDIT_TASK':
            return {
                tasks: state.tasks.map((t) => {
                    if (t._id === action.payload._id) {
                        return action.payload
                    } else {
                        return t
                    }
                }
                )
            }
        default:
            return state
    }
}

export const TodoContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(todolistReducer, {
        tasks: null
    })


    return (
        <TodoContext.Provider value={{ ...state, dispatch }}>
            {children}
        </TodoContext.Provider>

    )
}