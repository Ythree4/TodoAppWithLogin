import axios from 'axios'; // import axios
import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        // If there's a user in localStorage, use that
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            dispatch({ type: 'LOGIN', payload: user })
        } else {
            // If not, get the user data from the API
            axios.get('/api/user') // replace '/api/user' with your API endpoint
                .then(res => {
                    // if the request is successful, use the returned data
                    dispatch({ type: 'LOGIN', payload: res.data })
                })
                .catch(err => {
                    console.error(err)
                })
        }
    }, [])

    console.log('AuthContext state:', state)

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}
