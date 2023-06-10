import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'
import LoadingSpinner from '../components/LoadingSpinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

const LoginPage = () => {
    const [email, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')

    const { login, isLoading, error } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
    }

    return (
        <section className="login__section h-screen bg-slate-200">
            <div className="login__container container mx-auto flex justify-center items-center h-full">
                <div className="login__content border border-violet-500 bg-white py-6 px-5">
                    <h1 className="login__title text-3xl font-bold mb-2 text-rose-500 text-center">TODOLIST</h1>
                    <p className="login__subtitle text-sm mb-4 text-center">Doesn't have an account? <Link to="/signup" className="text-rose-500 hover:text-rose-700 duration-150">Register</Link></p>
                    <form className="login__form flex flex-col" onSubmit={handleSubmit}>
                        <label htmlFor='email'>Email Address</label>
                        <input className="login__input mb-4 py-3 px-2 focus:outline-none border border-black" id='email' type="email" placeholder="Email" onChange={(e) => setEmailAddress(e.target.value)} value={email} />
                        <label htmlFor='password'>Password</label>
                        <input className="login__input mb-1 py-3 px-2 focus:outline-none border border-black" id='password' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        <div className='flex justify-end'>
                            <p className='login__forgot__password text-end mb-4 text-sm text-blue-500 hover:underline cursor-pointer'>Forgot password?</p>
                        </div>
                        <button className="login__button bg-green-600 hover:bg-green-700 duration-150 text-white py-2 px-4 mb-4 rounded-md" disabled={isLoading}>
                            {isLoading ? <LoadingSpinner text={"Logging in"} /> : 'Login'}
                        </button>
                        {error && <div className="login__error text-red-500 border border-red-500 text-center py-3 bg-red-50"><FontAwesomeIcon icon={faExclamationCircle} className="mr-2 text-red-500" />{error}</div>}
                    </form>
                </div>
            </div>
        </section>
    )
}

export default LoginPage