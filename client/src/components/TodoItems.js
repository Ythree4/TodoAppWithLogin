import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import { useTodoListContext } from '../hooks/useTodoListContext';
import { useAuthContext } from '../hooks/useAuthContext';
import EditTaskModal from './UpdateTaskModal';


const TodoItems = ({ task }) => {

    const [showModal, setShowModal] = useState(false);

    const { dispatch } = useTodoListContext()

    const { user } = useAuthContext()

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleDeleteTask = async () => {

        if (!user) {
            return
        }

        try {
            const response = await axios.delete(`http://localhost:5000/api/todolist/${task._id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            dispatch({ type: 'DELETE_TASK', payload: response.data });
        } catch (err) {
            console.log(err);
        }
    }

    const handleEditTask = async () => {
        const updatedTask = {
            ...task,
            status: !task.status // Toggle the status immediately
        };

        dispatch({ type: 'EDIT_TASK', payload: updatedTask }); // Update the task status in the state immediately

        try {
            await axios.patch(`http://localhost:5000/api/todolist/${task._id}`, updatedTask, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    const handleEditTaskButton = () => {
        setShowModal(true);
    }

    return (
        <>
        {showModal && <EditTaskModal task={task} handleShowModal={() => setShowModal(false)} />}
        <div className="todo__item flex justify-between items-center py-1.5 px-3.5 bg-slate-100 hover:bg-slate-200" key={task._id}>
            <div className="todo__item-content flex justify-between items-center">
                <input type="checkbox" className="todo__checkbox mr-2 h-5 w-5" checked={task.status} onChange={handleEditTask} />
                <div className="todo__item-text-group flex flex-col justify-center items-start">
                    <span className={`todo__item-text ${task.status ? 'line-through' : ''}`}>
                        {task.title}
                    </span>
                    <span className="todo__item-date text-xs text-gray-500">{formatDate(task.date)}</span>
                </div>
            </div>
            <div className="todo__item-control flex justify-center items-center">
                <button className="todo__delete bg-red-500 hover:bg-red-600 duration-300 text-white py-1 px-2 mr-1" onClick={handleDeleteTask}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
                <button className="todo__edit bg-green-600 hover:bg-green-700 duration-300 text-white py-1 px-2" onClick={handleEditTaskButton}>
                    <FontAwesomeIcon icon={faPen} />
                </button>
            </div>
        </div>
        </>
    )
}

export default TodoItems