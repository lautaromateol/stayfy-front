import React, { useState } from 'react';
import validation from './validation/validation';
import { useDispatch} from 'react-redux';
import axios from 'axios';
import { postBook } from '../../redux/actions';


const Create = () => {

    const dispatch = useDispatch();

    const [input, setInput] = useState({
        title: '',
        authors: '',
        publisher: '',
        image: '',
        publishedDate: '',
        pageCount: '',
        genre: '',
        price: '',
        description: '',
    })

    const [error, setError] = useState({})


    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
        setError(validation({
            ...input,
            [event.target.name]: event.target.value
        }))
    }

    const handleImageChange = async (event) => {
        const files = event.target.files;
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
                const response = await axios.post("http://localhost:3001/books/uploads", formData, {
                    headers: {
                    'Content-Type': 'multipart/form-data',
                    },
                });
    
                if (response.status === 200) {
                    setInput((prevInput) => ({
                        ...prevInput,
                        image: response.data.secure_url,
                    }));
                } else {
                    console.error("Error al cargar la imagen_1");
                }
            } catch (error) {
                console.error("Error al cargar la imagen_2", error);
            }
        }
    };


    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(input);
        dispatch(postBook(input))
        alert('Your book has been added succesfully')
        setInput({
            title: '',
            authors: '',
            publisher: '',
            image: '',
            publishedDate: '',
            pageCount: '',
            genre: '',
            price: '',
            description: '',
        })
    }


    return (
        <div>
            <div className="flex justify-center w-full">
                 <div className="flex flex-col justify-center items-center max-w-7xl w-[90%]">
                     <div className="flex flex-col justify-center text-center space-y-3 my-9">
                        <h1 className="text-xl md:text-2xl font-semibold">Add a new book</h1> 
                        <p className="text-gray-600">Add your favorite book in just a few steps.</p> 
                    </div> 
                    <div className="flex flex-col justify-center lg:flex-row items-center lg:space-x-10 xl:space-x-24 "> 
                        <form className=" shadow-lg flex flex-col justify-center space-y-3 md:w-full mb-7 md:mx-16 lg:mx-0 px-8 py-4 lg:px-4"> 
                            <div className="flex flex-col justify-between lg:flex-row space-y-1 lg:space-y-0 "> 
                                <h1>Title</h1> 
                                <input className="bg-slate-100 rounded-lg px-2 py-1 placeholder:text-gray-600 w-[80%] lg:w-[60%] focus:border focus:outline-none focus:border-blue-500" name='title' type="text" value={input.title} onChange={handleChange}/>
                                {error.title && <span>{error.title}</span>}
                            </div> 
                            <div className="flex flex-col justify-between lg:flex-row space-y-1 lg:space-y-0"> 
                                <h1>Authors</h1> 
                                <input className="bg-slate-100 rounded-lg px-2 py-1 placeholder:text-gray-600 w-[80%] lg:w-[60%] focus:border focus:outline-none focus:border-blue-500" name='authors' type="text" value={input.authors} onChange={handleChange}/> 
                                {error.authors && <span>{error.authors}</span>}
                            </div> 
                            <div className="flex flex-col justify-between lg:flex-row space-y-1 lg:space-y-0"> 
                                <h1>Publisher</h1> <input className="bg-slate-100 rounded-lg px-2 py-1 placeholder:text-gray-600 w-[80%] lg:w-[60%] focus:border focus:outline-none focus:border-blue-500" name='publisher' type="text" value={input.publisher} onChange={handleChange}/> 
                                {error.publisher && <span>{error.publisher}</span>}
                            </div> 
                            <div className="flex flex-col justify-between lg:flex-row space-y-1 lg:space-y-0"> 
                                <h1>Image</h1> 
                                <input className="bg-slate-100 rounded-lg px-2 py-1 placeholder:text-gray-600 w-[80%] lg:w-[60%] focus:border focus:outline-none focus:border-blue-500" name='image' type="file"  accept='image/*' onChange={handleImageChange}/>
                                {/* value={input.image}onChange={handleChange} */}
                                {error.image && <span>{error.image}</span>} 
                            </div> 
                            <div className="flex flex-col justify-between lg:flex-row space-y-1 lg:space-y-0"> 
                                <h1>Year of publication</h1> 
                                <input className="bg-slate-100 rounded-lg px-2 py-1 placeholder:text-gray-600 w-[80%] lg:w-[60%] focus:border focus:outline-none focus:border-blue-500" name='publishedDate' type="text" value={input.publishedDate} onChange={handleChange}/> 
                                {error.publishedDate && <span>{error.publishedDate}</span>}
                            </div> 
                            <div className="flex flex-col justify-between lg:flex-row space-y-1 lg:space-y-0"> 
                                <h1>Number of pages</h1> 
                                <input name='pageCount' type="text" value={input.pageCount} onChange={handleChange} className="bg-slate-100 rounded-lg px-2 py-1 w-[80%] lg:w-[60%] placeholder:text-gray-300 focus:border focus:outline-none focus:border-blue-500"/> 
                                {error.pageCount && <span>{error.pageCount}</span>}
                            </div> 
                            <div className="flex flex-col justify-between lg:flex-row space-y-1 lg:space-y-0"> 
                                <h1>Genre</h1> 
                                <input name='genre' type="text" value={input.genre} onChange={handleChange} className="bg-slate-100 rounded-lg px-2 py-1 placeholder:text-gray-300 w-[80%] lg:w-[60%] focus:border focus:outline-none focus:border-blue-500"/> 
                                {error.genre && <span>{error.genre}</span>}
                            </div> 
                            <div className="flex flex-col justify-between lg:flex-row space-y-1 lg:space-y-0"> 
                                <h1>Price</h1> 
                                <input name='price' type="text" value={input.price} onChange={handleChange} className="bg-slate-100 rounded-lg px-2 py-1 placeholder:text-gray-300 w-[80%] lg:w-[60%] focus:border focus:outline-none focus:border-blue-500"/>
                                {error.price && <span>{error.price}</span>} 
                            </div> 
                            <div className="flex flex-col justify-between lg:flex-row space-y-1 lg:space-y-0"> 
                                <h1>Description</h1> 
                                <input name='description' type="text" value={input.description} onChange={handleChange} className="bg-slate-100 rounded-lg px-2 py-1 placeholder:text-gray-300 w-[80%] lg:w-[60%] focus:border focus:outline-none focus:border-blue-500"/> 
                                {error.description && <span>{error.description}</span>}
                            </div> 
                            <div className="text-center md:text-left lg:text-right"> 
                                <button type='submit' onClick={handleSubmit} className="bg-blue-500 my-2 px-3 py-1 text-white rounded-md hover:bg-blue-600">Add Book</button> 
                            </div> 
                        </form> 
                    </div> 
                </div> 
            </div> 
        </div>   
    );
};

export default Create;