import React, { useState } from 'react';
import validation from './validation/validation';
import { useDispatch} from 'react-redux';
import axios from 'axios';


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
                        image: response.data.imageUrl,
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
        setInput({...input, authors: [...input.authors]})
        await axios.post('http://localhost:3001/books/create',  input)
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
            <h1>Add a new book</h1>
            <form action="">
                <div>
                    <label>Title</label>
                    <input name='title' type="text" value={input.title} onChange={handleChange}/>
                    {error.title && <span>{error.title}</span>}
                </div>
                <div>
                    <label>Authors</label>
                    <input name='authors' type="text" value={input.authors} onChange={handleChange}/>
                    {error.authors && <span>{error.authors}</span>}
                </div>
                <div>
                    <label>Publisher</label>
                    <input name='publisher' type="text" value={input.publisher} onChange={handleChange}/>
                    {error.publisher && <span>{error.publisher}</span>}

                </div>
                <div>
                    <label>Image</label>
                    <input
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {/* <input name='image' type="text" value={input.image} onChange={handleChange}/> */}
                    {error.image && <span>{error.image}</span>}

                </div>
                <div>
                    <label>Year of publication</label>
                    <input name='publishedDate' type="text" value={input.publishedDate} onChange={handleChange}/>
                    {error.publishedDate && <span>{error.publishedDate}</span>}
                </div>
                <div>
                    <label>Number of pages</label>
                    <input name='pageCount' type="text" value={input.pageCount} onChange={handleChange}/>
                    {error.pageCount && <span>{error.pageCount}</span>}
                </div>
                <div>
                    <label>Genre</label>
                    <input name='genre' type="text" value={input.genre} onChange={handleChange}/>
                    {error.genre && <span>{error.genre}</span>}
                </div>
                <div>
                    <label>Price</label>
                    <input name='price' type="text" value={input.price} onChange={handleChange}/>
                    {error.price && <span>{error.price}</span>}
                </div>
                <div>
                    <label>Description</label>
                    <input name='description' type="text" value={input.description} onChange={handleChange}/>
                    {error.description && <span>{error.description}</span>}
                </div>

                <button type='submit' onClick={handleSubmit} disabled={error.title || error.authors || error.publisher || error.image || error.publishedDate || error.pageCount || error.genre || error.price || error.description}>Añadir libro</button>
            </form>
        </div>
    );
};

export default Create;