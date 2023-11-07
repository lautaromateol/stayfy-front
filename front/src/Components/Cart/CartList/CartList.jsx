import React, { useEffect, useState } from "react";
import axios from "axios";
import Cart from "./Cart";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext/CartContext";
import { useUser } from "../../../Context/UserContext"
import { BACKEND_URL } from "../../../../utils";

const CartList = () => {

    const { user } = useUser()

    const [cartItems, setCartItems] = useState([]);

    const [products, setProducts] = useState([]);

    const { cart, addToCart, removeAllByProduct, removeFromCart } = useCart();

    const lastTab = localStorage.getItem('lastTab')

    const preferenceId = localStorage.getItem('preferenceId')

    useEffect(() => {

        if (lastTab && preferenceId) {
            localStorage.removeItem('lastTab')
            localStorage.removeItem('preferenceId')
            localStorage.setItem('lastTab', window.location.href)
        }

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
                    const response = await axios.get(`${BACKEND_URL}/books/${productId}`);
                    if (response.data.title) {
                        productDetails.push(response.data);
                        const product = response.data;
                        const item = {
                            title: product.title,
                            unit_price: product.price,
                            quantity: cart.filter((item) => item === product.id).length,
                            stock: product.stock
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
                const preferenceResponse = await axios.post(`${BACKEND_URL}/checkout/mercado-pago/create_preference`, preferenceRequest);
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

    const incrementQuantity = (productId, stock) => {
        addToCart(productId, stock);
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
        <>
            {totalItems ?
                <div class="min-h-screen bg-gray-100 pt-20">
                    <h1 class="mb-10 text-center text-2xl font-bold">Cart Items</h1>
                    <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                        <div class="rounded-lg md:w-2/3">
                            <Cart
                                products={products}
                                cart={cart}
                                removeFromCart={removeAllByProduct}
                                incrementQuantity={incrementQuantity}
                                decrementQuantity={decrementQuantity}
                            />
                        </div>
                        <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                            <div class="mb-2 flex justify-between">
                                <p class="text-gray-700">Total Items:</p>
                                <p class="text-gray-700">{totalItems}</p>
                            </div>
                            <div class="mb-2 flex justify-between">
                                <p class="text-gray-700">Subtotal</p>
                                <p class="text-gray-700">{(totalCost * 1.0).toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                })}</p>
                            </div>
                            <div class="flex justify-between">
                                <p class="text-gray-700">Shipping</p>
                                <p class="text-gray-700">$0.00</p>
                            </div>
                            <hr class="my-4" />
                            <div class="flex justify-between">
                                <p class="text-lg font-bold">Total</p>
                                <div class="">
                                    <p class="mb-1 text-lg font-bold">{(totalCost * 1.0).toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                    })}</p>
                                </div>
                            </div>
                            {user ?
                                <a href="/address"><button class="mt-6 w-full rounded-md bg-green-500 py-1.5 font-medium text-blue-50 hover:bg-green-600">Check out</button></a>
                                :
                                <a href="/login"><button href="/login" class="mt-6 w-full rounded-md bg-green-500 py-1.5 font-medium text-blue-50 hover:bg-green-600">Check out</button></a>

                            }
                        </div>
                    </div>
                </div>
                :
                <div class="flex items-center justify-center text-center py-7 h-screen">
                    <div class='max-w-md'>
                        <div class='text-5xl font-bold'>Your cart is empty</div>
                        <div class='my-4'>
                            <p class='text-base leading-normal md:text-xl'>Add items to your cart</p>
                        </div>
                        <a href="/store" class='bg-green-500 hover:bg-green-600 px-6 py-2 text-white rounded-md'>Continue shopping</a>
                    </div>
                </div>
            }
        </>
    );
};

export default CartList;


