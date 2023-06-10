import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSignup } from '../hooks/useSignup'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LoadingSpinner from '../components/LoadingSpinner'

const SignupPage = () => {
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')

    const { signup, isLoading, error } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(firstname, lastname, email, password)

    }

    return (
        <section className="signup__section h-screen bg-slate-200">
            <div className="signup__container container mx-auto flex justify-center items-center h-full">
                <div className="signup__content border border-violet-500 bg-white py-6 px-5">
                    <h1 className="signup__title text-3xl font-bold mb-2 text-rose-500 text-center">TODOLIST</h1>
                    <p className="signup__subtitle text-sm mb-3 text-center">Already have an account? <Link to="/login" className="text-rose-500 hover:text-rose-700 duration-150">Login</Link></p>
                    <form className="signup__form flex flex-col" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                            <div className='flex flex-col'>
                                <label htmlFor='firstName'>First Name</label>
                                <input className="signup__input py-3 px-2 focus:outline-none border border-black" id='firstName' type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} value={firstname} />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor='lastName'>Last Name</label>
                                <input className="signup__input py-3 px-2 focus:outline-none border border-black" id='lastName' type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} value={lastname} />
                            </div>
                        </div>
                        <label htmlFor='email'>Email Address</label>

                        <input className="signup__input mb-1 py-3 px-2 focus:outline-none border border-black" id='email' type="email" placeholder="Email" onChange={(e) => setEmailAddress(e.target.value)} value={email} />

                        <label htmlFor='password'>Password</label>
                        <input className="signup__input py-3 px-2 mb-3 focus:outline-none border border-black" id='password' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />

                        <button className="signup__button bg-green-600 hover:bg-green-700 duration-150 text-white py-2 px-4 mb-3 rounded-md" disabled={isLoading}>
                            {isLoading ? <LoadingSpinner text={'Signing up'} /> : 'Sign up'}
                        </button>
                        {error && <div className="signup__error text-red-500 border border-red-500 text-center py-3 bg-red-50"><FontAwesomeIcon icon={faExclamationCircle} className="mr-2 text-red-500" />{error}</div>}

                    </form>
                </div>
            </div>
        </section>
    )
}

export default SignupPage