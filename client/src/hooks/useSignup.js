import axios from 'axios';
import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (firstname, lastname, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/user/register', {
        firstname,
        lastname,
        email,
        password
      });

      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(response.data));

      // update the auth context
      dispatch({ type: 'LOGIN', payload: response.data });

      // update loading state
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return { signup, isLoading, error };
};
