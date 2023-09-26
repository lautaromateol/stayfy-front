import React, { useState } from 'react';
import validation from './validation/validation';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../../redux/actions' 


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


    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getBooks(input))
        console.log(input);
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
                    <input name='image' type="text" value={input.image} onChange={handleChange}/>
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