import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import registerValidation from './validations/registerValidations';

const Register = () => {

    const [input, setInput] = useState({
        fullname: '',
        email: '',
        username: '',
        password: '',
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(
            registerValidation({
                ...input,
                [e.target.name]: e.target.value
            })
        )
    }


    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch("http://localhost:3001/user/", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(input),
            });
            if(response.ok){
                alert("usuario creado")
                console.log(input)
            } else {
                alert("Erorr al crear usuario")
            }
        } catch (error) {
            console.error('Error al crear el usuario', error);
        }
        setInput({
            fullname: '',
            email: '',
            username: '',
            password: '',
        })
    }


    return (
        <div className='flex flex-col items-center h-screen w-full bg-stone-400'>
            <form className='py-10 px-20 bg-white mt-20 rounded-md' action="">
                <h1 className="font-semibold text-xl md:text-3xl text-gray-600 m-2 text-center mb-7">Register</h1>
                <div className='flex sm:flex-col lg:flex-row'>
                    <div className='flex flex-col lg:mr-3 space-y-6'>
                        <div className='flex flex-col'>
                            <h2 className="text-lg text-gray-500 text-semibold">Full Name</h2>                        
                            <input type="text"
                                name='fullname'
                                placeholder='e.g.: Stephen King'
                                value={input.fullname}
                                onChange={handleChange}
                                className="border-b border-gray-500 focus:outline-none  text-gray-500 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] bg-transparent"    
                            />       
                            {errors.fullname && <span className="text-red-500">{errors.fullname}</span>}   
                        </div>
                        <div className='flex flex-col'>
                            <h2 className="text-lg text-gray-500 text-semibold">Email</h2>
                            <input type="text"
                                name='email'
                                placeholder='stephen@example.com'
                                value={input.email}
                                onChange={handleChange}
                                className="border-b border-gray-500 focus:outline-none  text-gray-500 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] bg-transparent"
                            />
                            {errors.email && <span className="text-red-500">{errors.email}</span>} 
                        </div>
                    </div>
                    <div className='flex flex-col lg:ml-3 space-y-6'>
                        <div className='flex flex-col'>
                            <h2 className="text-lg text-gray-500 text-semibold">Username</h2>
                            <input type="text"
                                name='username'
                                placeholder='e.g.: user245'
                                value={input.username}
                                onChange={handleChange}
                                className="border-b border-gray-500 focus:outline-none  text-gray-500 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] bg-transparent"
                            />
                            {errors.username && <span className="text-red-500">{errors.username}</span>} 
                        </div>
                        <div className='flex flex-col'>
                            <h2 className="text-lg text-gray-500 text-semibold">Password</h2>
                            <input type="password"
                                name='password'
                                placeholder='e.g.: stephenK5'
                                value={input.password}
                                onChange={handleChange}
                                className="border-b border-gray-500 focus:outline-none  text-gray-500 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] bg-transparent"
                            />
                            {errors.password && <span className="text-red-500">{errors.password}</span>} 
                        </div>
                    </div>
                </div>
                    <div className='md:w-full md:flex flex-col items-center'>
                        <button 
                        className="lg:w-[260px] py-2 rounded-md text-white bg-stone-600 hover:bg-stone-500 font-medium mb-3 mt-7"
                        onClick={handleSubmit}
                        disabled={errors.fullname || errors.email || errors.username || errors.password || !input.fullname}
                        >Register</button>
                        <span>Already have an account? <Link to='/login'><span className='text-yellow-500'>Sign in!</span></Link></span>
                    </div>
            </form>
        </div>
    );
};

export default Register;