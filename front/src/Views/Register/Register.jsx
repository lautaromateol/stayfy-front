import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom'
import registerValidation from './validations/registerValidations';
import axios from 'axios';
import Aos from "aos"
import 'aos/dist/aos.css'
import { useEffect } from 'react';
import { BACKEND_URL, FRONT_URL } from '../../../utils';

const Register = () => {
    const fileInputRef = useRef(null);
    useEffect(() => {
        Aos.init({ duration: 1500 })
    }, [])

    const [input, setInput] = useState({
        fullname: '',
        email: '',
        username: '',
        password: '',
        profilePicture: '',
    })

    const [errors, setErrors] = useState({})

    const [warning, setWarning] = useState('')

    const handleChange = (e) => {
        setWarning('')
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
        // const files = event.target.files;
        const files = fileInputRef.current.files;
        if (files.length > 0) {
            const file = files[0];
            const formData = new FormData();
            const allowedExtensions = ["jpg", "jpeg", "png"];
            const fileExtension = file.name.split(".").pop().toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
                console.error("Tipo de archivo no válido");
                return;
            }

            // formData.append("file", file);
            formData.append("image", file);

            try {
                const response = await axios.post(
                    "http://localhost:3001/books/uploads",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                if (response.status === 200) {
                    console.log(input);
                    setInput((prevInput) => ({
                        ...prevInput,
                        profilePicture: response.data.secure_url,
                    }));
                } else {
                    console.error("Error al cargar la imagen_1");
                }
            } catch (error) {
                console.error("Error al cargar la imagen_2", error);
            }
        }

        try {
            await axios.post(`${BACKEND_URL}/users`, input)

            setInput({
                fullname: '',
                email: '',
                username: '',
                password: '',
                profilePicture: '',
            })

            window.location.href =`${FRONT_URL}/login`
            
            fileInputRef.current.value = '';
        } catch (error) {
            setWarning(error.response.data)
        }
    }


    return (
        <div className='flex flex-col items-center h-screen w-full bg-[#A4BCB3] dark:bg-gray-900'>
            <form className='py-10 px-20 bg-white dark:bg-stone-200 mt-20 rounded-3xl' action="" data-aos = 'fade-up'>
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
                <div className='md:w-full md:flex flex-col '>
                    <h2 className="text-lg text-gray-500 text-semibold">Image</h2>
                    <input
                        ref={fileInputRef} 
                        className="bg-slate-100 rounded-lg px-2 py-1 placeholder:text-gray-600 w-[80%] lg:w-[60%] focus:border focus:outline-none focus:border-blue-500"
                        name="image"
                        type="file"
                        accept=".jpg,.jpeg,.png"
                    //   onChange={handleImageChange}
                    />
                </div>

                <div className='md:w-full md:flex flex-col items-center'>
                    {warning ? <p className='mt-2'>{warning}</p> : ''}
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