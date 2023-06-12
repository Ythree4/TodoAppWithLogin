import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useTodoListContext } from '../hooks/useTodoListContext';
import { useAuthContext } from '../hooks/useAuthContext';

const EditTaskModal = ({ task, handleShowModal }) => {
    const { dispatch } = useTodoListContext();
    const { user } = useAuthContext();

    const [title, setTitle] = useState(task.title);
    const [date, setDate] = useState(task.date);
    const [status, setStatus] = useState(task.status);

    useEffect(() => {
      if (task) {
          setTitle(task.title)
          setDate(new Date(task.date).toISOString().slice(0, 10))
          setStatus(task.status)
      }
  }, [task])

    const handleEditTask = async (e) => {
        e.preventDefault();

        if (!user) {
            return;
        }

        const updatedTask = { title, date, status };

        try {
            const response = await axios.patch(`https://todoappwithlogin.onrender.com/api/todolist/${task._id}`, updatedTask, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });

            dispatch({ type: 'EDIT_TASK', payload: response.data });
            handleShowModal();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="todo__edit__modal fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="todo__edit__modal__content bg-white py-6 px-5">
                <div className="todo__edit__modal__header flex justify-between items-center">
                    <h1 className="todo__edit__modal__title text-2xl font-bold uppercase text-rose-500 my-1">Edit task</h1>
                    <button className="todo__edit__modal__close text-xl hover:text-rose-600 text-gray-500 duration-300 py-1.5 px-3.5 flex justify-center items-center" onClick={handleShowModal}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <hr className="todo__edit__modal__hr border border-rose-500 my-2" />
                <div className="todo__edit__modal__body">
                    <form action="" className="todo__edit__modal__form">
                        <div className="todo__edit__modal__form__group mb-2 flex flex-col justify-center items-start gap-1">
                            <label htmlFor="title" className="todo__edit__modal__form__label text-lg">Title</label>
                            <input type="text" className="todo__edit__modal__form__input border border-rose-500 py-1.5 px-3.5 focus:outline-none w-full" placeholder="Title" autoComplete='off' onChange={(e) => setTitle(e.target.value)} value={title} />
                        </div>
                        <div className="todo__edit__modal__form__group mb-2 flex flex-col justify-center items-start gap-1">
                            <label htmlFor="date" className="todo__edit__modal__form__label text-lg">Date</label>
                            <input type="date" className="todo__edit__modal__form__input border border-rose-500 py-1.5 px-3.5 focus:outline-none w-full" placeholder="Date" autoComplete='off' onChange={(e) => setDate(e.target.value)} value={date} />
                        </div>
                        <div className="todo__edit__modal__form__group mb-2 flex flex-col justify-center items-start gap-1">
                            <label htmlFor="status" className="todo__edit__modal__form__label text-lg">Status</label>
                            <select className="todo__edit__modal__form__input border border-rose-500 py-1.5 px-3.5 focus:outline-none w-full" onChange={(e) => setStatus(e.target.value === 'true')} value={status}>
                                <option value="true">Done</option>
                                <option value="false">Not Done</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div className="todo__edit__modal__footer flex justify-end items-center">
                    <button className="todo__edit__modal__edit bg-rose-500 hover:bg-rose-600 duration-300 text-white py-1.5 px-3.5" onClick={handleEditTask}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default EditTaskModal;
