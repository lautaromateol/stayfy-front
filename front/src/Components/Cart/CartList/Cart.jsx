import React from "react";
import CartItem from "./CartItem";

const Cart = ({ products, cart, removeFromCart, incrementQuantity, decrementQuantity }) => {
    return (
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-5 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-1">
            {products.map((product) => (
                <CartItem
                    key={product.id}
                    product={product}
                    quantity={cart.filter((item) => item === product.id).length}
                    onRemove={() => removeFromCart(product.id)}
                    onIncrement={() => incrementQuantity(product.id)}
                    onDecrement={() => decrementQuantity(product.id)}
                />
            ))}
        </div>
    );
};

export default Cart;
