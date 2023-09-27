import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Detail = ()=>{

    const [book, setBook] = useState({})

    const {id} = useParams()

    useEffect(() => {
        axios(`http://localhost:3001/books/${id}`).then(({ data }) => {
           if (data.title) {
              setBook(data);
           } else {
              window.alert('Product not found');
           }
        });
     }, [id]);

    const createPreference = async()=>{
        try {
            await axios.post('http://localhost:3001/checkout/create_preference', {
                title: book.title,
                url: book.image,
                price: book.price,
                quantity: 1
            }).then(({data}) => window.location.href = data.response.body.init_point)
        } catch (error) {
            console.log(error)
        }
    }

    const handleBuy = async()=>{
        
    }

    return(
        <div>
            <img src={book.image}/>
            <h2>{book.title && book.title}</h2>
            <p>{book.description && book.description}</p>
            <p>{book.price && book.price}</p>
            <button onClick={createPreference}>Buy now</button>
        </div>
    )
}

export default Detail;