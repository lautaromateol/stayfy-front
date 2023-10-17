import React, { useEffect, useState } from "react";
import axios from "axios";
import Cart from "./Cart";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext/CartContext";
import { useUser } from "../../../Context/UserContext"

const CartList = () => {

    const { user } = useUser()

    const [cartItems, setCartItems] = useState([]);

    const [products, setProducts] = useState([]);

    const { cart, addToCart, removeAllByProduct, removeFromCart } = useCart();

    const lastTab = localStorage.getItem('lastTab')

    const preferenceId = localStorage.getItem('preferenceId')

    useEffect(() => {

        if(lastTab && preferenceId){
            localStorage.removeItem('lastTab')
            localStorage.removeItem('preferenceId')
          }

          localStorage.setItem('lastTab', window.location.href)

        const storedItems = localStorage.getItem("cartItems");
        if (storedItems) {
            const cartItemIDs = JSON.parse(storedItems);
            setCartItems(cartItemIDs);
        }

        const fetchUniqueProducts = async () => {
            const uniqueProductIds = [...new Set(cart)];
            const productDetails = [];
            const items = [];

            for (const productId of uniqueProductIds) {
                try {
                    const response = await axios.get(`http://localhost:3001/books/${productId}`);
                    if (response.data.title) {
                        productDetails.push(response.data);
                        const product = response.data;
                        const item = {
                            title: product.title,
                            unit_price: product.price,
                            quantity: cart.filter((item) => item === product.id).length,
                        };
                        items.push(item);
                    }
                } catch (error) {
                    console.error(`Error al obtener detalles del producto ${productId}:`, error);
                }
            }

            const preferenceRequest = {
                items
            };

            try {
                const preferenceResponse = await axios.post('http://localhost:3001/checkout/mercado-pago/create_preference', preferenceRequest);
                localStorage.setItem('preferenceId', preferenceResponse.data.id);
            } catch (error) {
                console.error('Error al crear la preferencia de pago:', error);
            }

            setProducts(productDetails);
        };

        fetchUniqueProducts();
        
    }, [cart, user]);

    const getProductQuantity = (productId) => {
        return cart.filter((item) => item === productId).length;
    };

    const incrementQuantity = (productId) => {
        addToCart(productId);
    };

    const decrementQuantity = (productId) => {
        removeFromCart(productId);
    };

    const totalItems = cart.length;
    const totalCost = products.reduce((acc, product) => {
        const quantity = cart.filter((item) => item === product.id).length;
        return acc + product.price * quantity;
    }, 0);

    return (
        <div className="min-h-screen bg-[#A4BCB3] dark:bg-gray-900 text-gray-800 dark:text-gray-300">
            <div className="py-24 sm:py-12">
                <div className="mx-auto max-w-7xl px-6 lg:px-20">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <p className="text-3xl md:text-5xl text-gray-800 dark:text-gray-300  leading-relaxed md:leading-snug">
                            Cart
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="mt-2 text-lg leading-8 ">
                                Review Your Purchases and Prepare Your Order in the Shopping Cart.
                            </p>
                            <Cart
                                products={products}
                                cart={cart}
                                removeFromCart={removeAllByProduct}
                                incrementQuantity={incrementQuantity}
                                decrementQuantity={decrementQuantity}
                            />
                        </div>
                        <div className="w-80 max-h-[430px] ml-10 border border-solid border-black-500 bg-white rounded-md dark:bg-stone-200 dark:text-blue-950">
                            <h1 className="text-2xl ml-5 mt-5">Order Summary</h1>
                            <div className="grid grid-cols-[70%_30%]">
                                <p className="ml-5 mt-5">Total Items:</p>
                                <p className="mt-5">{totalItems}</p>
                            </div>
                            <div className="grid grid-cols-[70%_30%]">
                                <p className="ml-5 mt-5">Subtotal:</p>
                                <p className="mt-5">{(totalCost * 1.0).toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                })}</p>
                            </div>
                            <div className="grid grid-cols-[70%_30%]">
                                <p className="ml-5 mt-5">Estimated Shipping:</p>
                                <p className="mt-5">$0.00</p>
                            </div>
                            <div className="grid grid-cols-[70%_30%]">
                                <p className="ml-5 mt-5">Estimated Tax:</p>
                                <p className="mt-5">$0.00</p>
                            </div>
                            <hr className="mt-5" />
                            <div className="grid grid-cols-[70%_30%]">
                                <strong className="ml-5 mt-5">Order Total:</strong>
                                <strong className="mt-5">{(totalCost * 1.0).toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                })}</strong>
                            </div>
                            <div className="grid place-content-center mt-10">
                                {user ?
                                    <button className="bg-green-500 text-white p-2"><a href='/address' target="_blank" rel="noopener noreferrer">CHECKOUT</a></button>
                                    :
                                    <button className="bg-green-500 text-white p-2"><Link to='/login'>CHECKOUT</Link></button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartList;
