import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EstrellasRating from '../StartRating/StartRating';

const Detail = () => {

  const [preferenceId, setPreferenceId] = useState(null);

  const [book, setBook] = useState({})

  const { id } = useParams()


<<<<<<< HEAD
    const promedioCalificaciones = 4.5;
=======
    const promedioCalificaciones = 3.5;
>>>>>>> 9ecc45f (Componente StartRating)

  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:3001/checkout/mercado-pago/create_preference', {
        items: [{
          title: book.title,
          quantity: 1,
          currency_id: 'ARS', 
          unit_price: book.price, 
        }]
      });
      const { id } = response.data;
      setPreferenceId(id);
    } catch (error) {
      console.error('Error al crear preferencia:', error);
    }
  };

<<<<<<< HEAD
  useEffect(() => {
    axios(`http://localhost:3001/books/${id}`).then(({ data }) => {
      if (data.title) {
        setBook(data);
      } else {
        window.alert('Product not found');
      }
    })
  }, []);

  return (
    <div>
      <div className='grid grid-cols-[50%_50%] mt-11'>
        <div className='grid place-content-center'>
          <img className='w-[350px] h-[500px]' src={book.image} />
        </div>
        <div className='mr-2.5'>
        <EstrellasRating promedioCalificaciones={promedioCalificaciones} />
          <h1 className='text-4xl mb-2'>{book.title && book.title}</h1>
          {book.authors && book.authors.length === 1 ? <p className='mb-5'>By <a className='underline'>{book.authors && book.authors[0]}</a></p> : <p className='mb-5'>By <a>{book.authors && book.authors[0]}</a> and <a>{book.authors && book.authors[1]}</a></p>}
          <p className='mb-2.5'>{book.description && book.description}</p>
          <hr className="border-bottom border-solid border-gray-400 p-1" />
          <p className='text-3xl mb-2.5'>${book.price && book.price}</p>
          <fieldset className="border border-solid border-gray-400 p-3">
            <button className='bg-green-500 m-2.5 py-0.5 px-1 w-60 h-7.3 rounded-md text-white hover:cursor-pointer' onClick={handleCheckout}>Realizar compra</button>
            <button className='bg-green-500 m-2.5 py-0.5 px-1 w-60 h-7.3 rounded-md text-white hover:cursor-pointer'>Agregar al carrito</button>
=======
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
>>>>>>> 9ecc45f (Componente StartRating)
            {preferenceId && (
              <button className='block w-60 h-7.1 bg-[rgba(0,188,255,255)] rounded-md border-none hover:cursor-pointer m-2.5 py-0.5 px-1'>
                <img className='relative top-3 w-7.5 h-5' src='https://vectorseek.com/wp-content/uploads/2023/08/Mercado-Pago-Icon-Logo-Vector.svg-.png' />
                <a className='relative bottom-3 ml-2.5 mr-0 text-base font-roboto no-underline text-white' href={`https://www.mercadopago.com.ar/checkout/v1/redirect?preference-id=${preferenceId}`} target="_blank" rel="noopener noreferrer">
                  Pagar con Mercado Pago</a></button>)}
          </fieldset>
        </div>
      </div>
      <hr className="border-bottom border-solid border-gray-400 p-1 mt-10" />
      <div class=" grid place-content-center mx-auto w-[80%] p-5">
        <div className='w-[350px]'>
          <h2 className='text-2xl  text-center border border-solid border-gray-400'>Product Details</h2>
          <div className='grid grid-cols-[50%_50%] border border-solid border-gray-400'>
            <span>Publisher:</span>
            <span>{book.publisher}</span>
          </div>
<<<<<<< HEAD
          <div className='grid grid-cols-[50%_50%] border border-solid border-gray-400'>
            <span>Publication year:</span>
            <span>{book.publishedDate}</span>
=======

>>>>>>> 9ecc45f (Componente StartRating)
          </div>
          <div className='grid grid-cols-[50%_50%] border border-solid border-gray-400'>
            <span>Genre:</span>
            <span>{book.genre}</span>
          </div>
          <div className='grid grid-cols-[50%_50%] border border-solid border-gray-400'>
            <span>Pages:</span>
            <span>{book.pageCount}</span>
          </div>
        </div>
        </div>
        <hr className="border-bottom border-solid border-gray-400 p-1 mt-10"/>
        <div>
          <h2 className='text-2xl text-center'>Comment Section</h2>
          <button className='bg-green-500 m-2.5 py-0.5 px-1 w-30 h-7.3 rounded-md text-white hover:cursor-pointer'>Add review</button>
        </div>
        </div>
  )
}

export default Detail;
