import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Todolist from '../components/Todolist'
import { useTodoListContext } from '../hooks/useTodoListContext'
import { useAuthContext } from '../hooks/useAuthContext'

const TodoPage = () => {
    const { tasks, dispatch } = useTodoListContext()

    const [searchText, setSearchText] = useState('');

    const { user } = useAuthContext();

    useEffect(() => {
        const fetchAllTasks = async () => {
            let url = 'https://todoappwithlogin.onrender.com/api/todolist';
            // if searchText is not empty, update the URL to use the search route
            if (searchText !== '') {
                url = `https://todoappwithlogin.onrender.com/api/todolist/search/${searchText}`;
            }

            try {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                dispatch({ type: 'SET_TASKS', payload: response.data });
            } catch (err) {
                console.log('Error fetching tasks');
            }
        };

        if (user) {
            fetchAllTasks();
        }

    }, [dispatch, searchText, user])

    return (
        <Todolist tasks={tasks} searchText={searchText} setSearchText={setSearchText} />
    )
}

export default TodoPage;
