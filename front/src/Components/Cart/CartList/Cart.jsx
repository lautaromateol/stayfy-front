import React from "react";
import CartItem from "./CartItem";

const Cart = ({ products, cart, removeFromCart, incrementQuantity, decrementQuantity }) => {
    return (
        <div>
            {products.map((product) => (
                <CartItem
                    key={product.id}
                    product={product}
                    quantity={cart.filter((item) => item === product.id).length}
                    onRemove={() => removeFromCart(product.id)}
                    onIncrement={() => incrementQuantity(product.id,product.stock)}
                    onDecrement={() => decrementQuantity(product.id)}
                />
            ))}
        </div>
    );
};

export default Cart;
