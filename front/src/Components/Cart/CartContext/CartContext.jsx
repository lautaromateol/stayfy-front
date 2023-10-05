import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cartCount, setCartCount] = useState(0);
<<<<<<< HEAD
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
        const savedCartCount = savedCart.length;

        setCart(savedCart);
        setCartCount(savedCartCount);
    }, []);

    const addToCart = (productId) => {
        const productIdInt = parseInt(productId, 10);
    
        if (!isNaN(productIdInt)) {
            // Obtener el carrito actual del localStorage
            const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    
            // Agregar el nuevo producto al carrito en orden ascendente
            const updatedCart = [...storedCart, productIdInt].sort((a, b) => a - b);
    
            const newCartCount = updatedCart.length;
    
            setCartCount(newCartCount);
            setCart(updatedCart);
    
            // Guardar el carrito actualizado en localStorage
            localStorage.setItem("cartItems", JSON.stringify(updatedCart));
            localStorage.setItem("cartCount", newCartCount.toString());
        } else {
            console.error(`El productId "${productId}" no es un número válido.`);
        }
    };


    // const addToCart = (productId) => {
    //     const productIdInt = parseInt(productId, 10);

    //     if (!isNaN(productIdInt)) {
    //         const updatedCart = [...cart, productIdInt];
    //         const newCartCount = updatedCart.length;

    //         setCartCount(newCartCount);
    //         setCart(updatedCart);

    //         localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    //         localStorage.setItem("cartCount", newCartCount.toString());
    //     } else {
    //         console.error(`El productId "${productId}" no es un número válido.`);
    //     }
    // };


    const removeFromCart = (productId) => {
        const productIdInt = parseInt(productId, 10);

        if (!isNaN(productIdInt)) {
            const indexOfProduct = cart.indexOf(productIdInt);
            if (indexOfProduct !== -1) {
                const updatedCart = [...cart];
                updatedCart.splice(indexOfProduct, 1);
                const newCartCount = updatedCart.length;

                setCartCount(newCartCount);
                setCart(updatedCart);

                localStorage.setItem("cartItems", JSON.stringify(updatedCart));
                localStorage.setItem("cartCount", newCartCount.toString());
            } else {
                console.error(`El productId "${productIdInt}" no se encontró en el carrito.`);
            }
        } else {
            console.error(`El productId "${productId}" no es un número válido.`);
        }
    };


    const removeAllByProduct = (productId) => {
        const productIdInt = parseInt(productId, 10);
        const updatedCart = cart.filter((item) => item !== productIdInt);
        const newCartCount = updatedCart.length;
    
        setCartCount(newCartCount);
        setCart(updatedCart);
    
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        localStorage.setItem("cartCount", newCartCount.toString());
    };
    
    const removeAll = () => {
        setCartCount(0);
        setCart([]);
    
        localStorage.removeItem("cartItems");
        localStorage.removeItem("cartCount");
    };
    

    const value = {
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        removeAllByProduct,
        removeAll,    
=======

    useEffect(() => {
        // Recuperar el estado del carrito almacenado en localStorage al cargar la aplicación
        const savedCartCount = localStorage.getItem("cartCount");
        if (savedCartCount) {
            setCartCount(parseInt(savedCartCount));
        }
    }, []);

    const addToCart = () => {
        const newCartCount = cartCount + 1;
        setCartCount(newCartCount);

        localStorage.setItem("cartCount", newCartCount.toString());
    };

    const value = {
        cartCount,
        addToCart,
>>>>>>> a73b6d6226b861e55f4e2bd5e2fdc6841e5039e8
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
