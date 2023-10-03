import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cartCount, setCartCount] = useState(0);

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
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
