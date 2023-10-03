import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EstrellasRating from '../StartRating/StartRating';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../Cart/CartContext/CartContext";
import QuantityControl from '../Cart/CartList/QuantityControl';

const Detail = () => {
  const { cart, addToCart, removeAllByProduct, removeFromCart } = useCart();

  const [preferenceId, setPreferenceId] = useState(null);

  const [book, setBook] = useState({})

  const { id } = useParams()

  const rating = 4.5
  const [isInCart, setIsInCart] = useState(false);
  const [quantityBooks, setQuantityBooks] = useState(1); 
  useEffect(() => {
      const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
      const productExistsInCart = storedCart.includes(parseInt(id, 10));
      const savedCartCount = storedCart.length;

      setIsInCart(productExistsInCart);
      const quantityBook =cart.filter((item) => item === parseInt(id, 10)).length;
      setQuantityBooks(quantityBook);

  }, [id, cart]);

  const handleAddToCart = () => {
    addToCart(id);
  };

  const handleAddToCart = () => {
    addToCart();
    setAddedToCart(true);
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:3001/checkout/mercado-pago/create_preference', {
        items: [{
          title: book.title,
          quantity: 1,
          currency_id: 'ARS', 
          unit_price: book.price, 
        }],
        image: book.image
      });
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
  }, []);

  return (
    <div className='bg-stone-400 dark:bg-gray-900 text-gray-800 dark:text-gray-300'>
      <div className='grid grid-cols-[50%_50%] mt-11'>
        <div className='grid place-content-center'>
          <img className='w-[350px] h-[500px]' src={book.image} />
        </div>
        <div className='mr-2.5'>
          <h1 className='text-4xl mb-2'>{book.title && book.title}</h1>
          <EstrellasRating promedioCalificaciones={rating} />
          {book.authors && book.authors.length === 1 ? <p className='mb-5'>By <a className='underline'>{book.authors && book.authors[0]}</a></p> : <p className='mb-5'>By <a>{book.authors && book.authors[0]}</a> and <a>{book.authors && book.authors[1]}</a></p>}
          <p className='mb-2.5'>{book.description && book.description}</p>
          <hr className="border-bottom border-solid border-gray-400 p-1" />
          {/* <p className='text-3xl mb-2.5'>${book.price && book.price}</p> */}
          <p className="text-3xl mb-2.5">
          {quantityBooks === 0
            ? (book.price * 1.0).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })
            : ((book.price * quantityBooks) * 1.0).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
        </p>

          <div className="flex flex-col">
  <button className='bg-green-500 m-2.5 py-0.5 px-1 w-60 h-7.3 rounded-md text-white hover:cursor-pointer' onClick={handleCheckout}>Buy now</button>
  
  {isInCart ? (
      // <button  className='bg-green-500 m-2.5 py-0.5 px-1 w-60 h-7.3 rounded-md text-white hover:cursor-pointer'>
      //   <FontAwesomeIcon icon={faCheck} /> added to cart
      // </button>
  
    <QuantityControl
      quantity={cart.filter((item) => item === parseInt(id, 10)).length}
      onIncrement={()=> addToCart(id)}
      onDecrement={() => removeFromCart(id)}
      onRemove={() => removeAllByProduct(id)}
    />
  ) : (
    <button onClick={handleAddToCart} className='bg-green-500 m-2.5 py-0.5 px-1 w-60 h-7.3 rounded-md text-white hover:cursor-pointer'>
      <FontAwesomeIcon icon={faCartShopping} /> Add to cart
    </button>
  )}

  {preferenceId && (
    <button className='block w-60 h-7.1 bg-[rgba(0,188,255,255)] rounded-md border-none hover:cursor-pointer m-2.5 py-0.5 px-1'>
      <img className='relative top-3 w-7.5 h-5' src='https://vectorseek.com/wp-content/uploads/2023/08/Mercado-Pago-Icon-Logo-Vector.svg-.png' />
      <a className='relative bottom-3 ml-2.5 mr-0 text-base font-roboto no-underline text-white' href={`https://www.mercadopago.com.ar/checkout/v1/redirect?preference-id=${preferenceId}`} target="_blank" rel="noopener noreferrer">
        Pagar con Mercado Pago
      </a>
    </button>
  )}
</div>
        </div>
      </div>
      <hr className="border-bottom border-solid border-gray-400 p-1 mt-10" />
      <div className=" grid place-content-center mx-auto w-[80%] p-5">
        <div className='w-[350px]'>
          <h2 className='text-2xl  text-center border border-solid border-gray-400'>Product Details</h2>
          <div className='grid grid-cols-[50%_50%] border border-solid border-gray-400'>
            <span>Publisher:</span>
            <span>{book.publisher}</span>
          </div>
          <div className='grid grid-cols-[50%_50%] border border-solid border-gray-400'>
            <span>Publication year:</span>
            <span>{book.publishedDate}</span>
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
