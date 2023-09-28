import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './Detail.module.css'
import axios from 'axios';
import EstrellasRating from '../StartRating/StartRating';

const Detail = ()=>{

    const [preferenceId, setPreferenceId] = useState(null);

    const [book, setBook] = useState({})

    const [render, setRender] = useState(false)

    const {id} = useParams()

    const promedioCalificaciones = 3.5;

  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:3001/checkout/mercado-pago/create_preference', {
        items: [{
          title: book.title,
          quantity: 1,
          currency_id: 'ARS', // Moneda (pesos argentinos)
          unit_price: book.price, // Precio del producto en centavos
        }]});
      const { id } = response.data;
      setPreferenceId(id);
    } catch (error) {
      console.error('Error al crear preferencia:', error);
    }
  };

    useEffect(() => {
      axios(`http://localhost:3001/books/${id}`).then(({ data }) => {
           if (data.title) {
              setBook(data);
           } else {
              window.alert('Product not found');
            }
          })
          setRender(true)
        }, []);
        
        return(
          <div class={style.container}>
          <div class={style.info_container}>
          <div class={style.image_container}>
            <img id={style.product_image} src={book.image}/>
          </div>
          <div class={style.description}>
          <EstrellasRating promedioCalificaciones={promedioCalificaciones} />
            <h2>{book.title && book.title}</h2>
            {book.authors && book.authors.length === 1 ? <p>By <a>{book.authors && book.authors[0]}</a></p> : <p>By <a>{book.authors && book.authors[0]}</a> and <a>{book.authors && book.authors[1]}</a></p> }           
            <p>{book.description && book.description}</p>
            <hr/>
            <p id={style.price}>{book.price && book.price}$</p>
            <fieldset>
            <button class={style.button} onClick={handleCheckout}>Realizar compra</button>
            <button class={style.button}>Agregar al carrito</button>
            {preferenceId && (
            <button id={style.mp}>
            <img id={style.img} src='https://vectorseek.com/wp-content/uploads/2023/08/Mercado-Pago-Icon-Logo-Vector.svg-.png'/>
            <a id={style.a} href={`https://www.mercadopago.com.ar/checkout/v1/redirect?preference-id=${preferenceId}`} target="_blank" rel="noopener noreferrer">
            Pagar con Mercado Pago</a></button>)}
            </fieldset>
          </div>

          </div>
        <div class={style.secondary_info}>
          <div id={style.card}>
          <h2>Product details</h2>
          <p>Publisher: {book.publisher}</p>
          <p>Publication year: {book.publishedDate}</p>
          <p>Genre: {book.genre}</p>
          <p>Pages: {book.pageCount}</p>
          </div>
          </div>
        </div>
    )
}

export default Detail;
