import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../CartContext/CartContext";
import Cart from "./Cart";

const CartList = () => {
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const { cart, addToCart, removeAllByProduct, removeFromCart } = useCart();
    const [preferenceId, setPreferenceId] = useState('')

    useEffect(() => {
        const storedItems = localStorage.getItem("cartItems");
        if (storedItems) {
            const cartItemIDs = JSON.parse(storedItems);
            setCartItems(cartItemIDs);
        }
    }, []);

    useEffect(() => {
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
                items,
                image: productDetails.length === 1 ? productDetails[0].image : null
            }; 
        
            try {
                const preferenceResponse = await axios.post('http://localhost:3001/checkout/mercado-pago/create_preference', preferenceRequest);
                setPreferenceId(preferenceResponse.data.id);
            } catch (error) {
                console.error('Error al crear la preferencia de pago:', error);
            }

            setProducts(productDetails);
        };

        fetchUniqueProducts();
    }, [cart]);

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
        <div className="min-h-screen bg-stone-400 dark:bg-gray-900 text-gray-800 dark:text-gray-300">
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
                        <div className="w-80 max-h-[430px] ml-10 border border-solid border-black-500 bg-white rounded-md">
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
                                <button className="bg-green-500 text-white p-2"><a href={`https://www.mercadopago.com.ar/checkout/v1/redirect?preference-id=${preferenceId}`} target="_blank" rel="noopener noreferrer">CHECKOUT</a></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartList;
