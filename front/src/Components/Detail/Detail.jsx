import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../Cart/CartContext/CartContext";
import { useUser } from "../../Context/UserContext"
import EstrellasRating from '../StartRating/StartRating';
import QuantityControl from '../Cart/CartList/QuantityControl';
import axios from 'axios';
import { BACKEND_URL } from '../../../utils';
import { Avatar, List } from 'antd';

const Detail = () => {

  const { id } = useParams()

  const { user } = useUser()

  const { cart, addToCart, removeAllByProduct, removeFromCart } = useCart()

  const [book, setBook] = useState({})

  const [rating, setRating] = useState(4.5)

  const [isInCart, setIsInCart] = useState(false);

  const [quantityBooks, setQuantityBooks] = useState(1);
  const [reviews, setReviews] = useState([]);

  const handleAddToCart = () => {
    addToCart(id);
  };

  const lastTab = localStorage.getItem('lastTab')

  const preferenceId = localStorage.getItem('preferenceId')

  useEffect(() => {

    if (lastTab && preferenceId) {
      localStorage.removeItem('lastTab')
      localStorage.removeItem('preferenceId')
    }

    try {
      axios(`${BACKEND_URL}/books/${id}`).then(({ data }) => {
        if (data.title) {
          setBook(data)
          setRating(data.rating)

          axios
            .post(`${BACKEND_URL}/checkout/mercado-pago/create_preference`, {
              items: [
                {
                  title: data.title,
                  unit_price: data.price,
                  quantity: 1,
                  currency_id: 'ARS'
                }
              ],
            })
            .then(({ data }) => {
              localStorage.setItem('preferenceId', data.id)
            })
            .catch(error => {
              console.error(error);
            });
          // Nueva solicitud para obtener reseñas
          axios(`${BACKEND_URL}/review/reviews/${id}`)
          // axios(`http://localhost:3001/review/reviews/${id}`)
            .then(response => {
              setReviews(response.data.reviews);
              console.log(response.data.reviews);
            })
            .catch(error => {
              console.error(error);
            });
          // Fin solicitud para obtener reseñas
        }
      });
    } catch (error) {
      console.error(error);
    }

    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || []

    const productExistsInCart = storedCart.includes(parseInt(id, 10))

    const savedCartCount = storedCart.length

    setIsInCart(productExistsInCart)

    const quantityBook = cart.filter((item) => item === parseInt(id, 10)).length

    setQuantityBooks(quantityBook)

    localStorage.setItem('lastTab', window.location.href)

    return setBook({})

  }, [cart, id, user]);

  return (
    <div>
      <section class="text-gray-700 body-font overflow-hidden bg-white dark:bg-[#111827] ">
        <div class="px-5 py-24 mx-auto">
          <div class="lg:w-4/5 mx-auto flex flex-wrap">
            <img class="w-[350px] h-[500px] object-center rounded border border-gray-200 " src={book.image} alt={book.title} />
            <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 class="text-sm title-font text-gray-500 tracking-widest">Book Store</h2>
              <h1 class="text-gray-900 dark:text-[#D1D5DB] text-3xl title-font font-medium mb-1">{book.title && book.title.toUpperCase()}</h1>
              {book.authors && book.authors.length === 1 ? <p className='mb-5 dark:text-[#D1D5DB]'>By <a className='underline'>{book.authors && book.authors[0]}</a></p> : <p className='mb-5 dark:text-[#D1D5DB]'>By <a>{book.authors && book.authors[0]}</a> and <a>{book.authors && book.authors[1]}</a></p>}
              <div class="flex">
                <span class="flex items-center">
                  <EstrellasRating average={rating} />
                  {/* <span class="text-gray-600 ml-3">4 Reviews</span> */}
                </span>
                <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                  <a class="text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a class="ml-2 text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a class="ml-2 text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p class="leading-relaxed dark:text-[#D1D5DB]">{book.description}</p>
              <hr class="border-b-2 border-gray-200 mt-5 mb-5" />
              <div class="flex">
                <span class="title-font font-medium text-2xl text-gray-900">{
                  (book.price * 1.0).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })

                }
                </span>

                {user ?
                  <button className='bg-green-500 ml-5 w-20 h-15 rounded-md text-white hover:cursor-pointer'><a href='/address' target="_blank" rel="noopener noreferrer">Buy now</a></button>
                  :
                  <button className='bg-green-500 ml-5 w-20 h-15 rounded-md text-white hover:cursor-pointer'><Link to='/login'>Buy now</Link></button>
                }


                {isInCart ? (
                  // <button  className='bg-green-500 m-2.5 py-0.5 px-1 w-60 h-7.3 rounded-md text-white hover:cursor-pointer'>
                  //   <FontAwesomeIcon icon={faCheck} /> added to cart
                  // </button>

                  <QuantityControl
                    quantity={cart.filter((item) => item === parseInt(id, 10)).length}
                    onIncrement={() => addToCart(id)}
                    onDecrement={() => removeFromCart(id)}
                    onRemove={() => removeAllByProduct(id)}
                  />
                ) : (
                  <button onClick={handleAddToCart} className='bg-green-500 ml-5 w-25 p-2 rounded-md text-white hover:cursor-pointer'>
                    <FontAwesomeIcon icon={faCartShopping} /> Add to cart
                  </button>
                )}
              </div>
              <div className="flex flex-col">
              </div>
            </div>
          </div>
        </div>
      </section>



      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-[#111827]">
        <div className="col-span-1">
          {/* Contenido de la primera columna (PRODUCT DETAILS) */}
          {/* ... */}
          <section  >
            <hr className="border-b-2 border-gray-200 dark:border-blue-950 mx-auto " />
            <h2 className="underline text-center text-2xl mt-5 dark:text-[#D1D5DB]">PRODUCT DETAILS</h2>
            <div className="mt-5 mb-10 h-100 mx-auto w-80 border-2 border-solid border-black dark:bg-[#E7E5E4] rounded-md">
              <div className="grid grid-cols-[70%_30%] my-10">
                <p className="ml-5">Publisher:</p>
                <p>{book.publisher}</p>
              </div>
              <div className="grid grid-cols-[70%_30%] my-10">
                <p className="ml-5">Publication year:</p>
                <p>{book.publishedDate}</p>
              </div>
              <div className="grid grid-cols-[70%_30%] my-10">
                <p className="ml-5">Genre:</p>
                <p>{book.genre}</p>
              </div>
              <div className="grid grid-cols-[70%_30%] my-10">
                <p className="ml-5">Total of pages:</p>
                <p>{book.pageCount}</p>
              </div>
            </div>
          </section>
        </div>
        <div className="col-span-1 bg-white dark:bg-[#111827] " >
          <section >
            <hr className="border-b-2 border-blue-950 mx-auto " />
            <h2 className='underline text-2xl text-center mt-5'>COMMENT SECTION</h2>
            {/* <button className='bg-green-500 m-2.5 py-0.5 px-1 w-30 h-7.3 rounded-md text-white  hover:cursor-pointer'>Add review</button> */}
          </section>

          <List
            itemLayout="horizontal"
            dataSource={reviews}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.User.profilePicture || "https://xsgames.co/randomusers/assets/avatars/pixel/2.jpg"} />}
                  title={<a href="https://ant.design"><div className="text-gray-900 dark:text-[#D1D5DB]">{item.title}</div><EstrellasRating average={item.rating} />
                  </a>}
                  description={<div className="text-gray-900 dark:text-[#D1D5DB]">{item.message}</div>}
                />
              </List.Item>
            )}
          />

        </div>
      </div>



    </div>
  )
}

export default Detail;
