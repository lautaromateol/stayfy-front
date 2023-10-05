import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../CartContext/CartContext";
import Cart from "./Cart";

const CartList = () => {
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const { cart, addToCart, removeAllByProduct, removeFromCart } = useCart();

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

            for (const productId of uniqueProductIds) {
                try {
                    const response = await axios.get(`http://localhost:3001/books/${productId}`);
                    if (response.data.title) {
                        productDetails.push(response.data);
                    }
                } catch (error) {
                    console.error(`Error al obtener detalles del producto ${productId}:`, error);
                }
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
                <div>
                    <h3 className="mt-2 text-lg leading-8">MERCADO PAGO ...</h3>
                    <p>Total de productos: {totalItems}</p>
              <p>Suma de costos: {(totalCost * 1.0).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
              })}</p>


                </div>
            </div>
        </div>
    </div>
</div>
    );
};

export default CartList;
