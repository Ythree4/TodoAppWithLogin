import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:5000/api/user/login', {
                email,
                password,
            });

            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(response.data));

            // update the auth context
            dispatch({ type: 'LOGIN', payload: response.data });

            // update loading state
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setError("Invalid email or password");
        }
    }

    return { login, isLoading, error };
}
