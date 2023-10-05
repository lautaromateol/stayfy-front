// CartItem.jsx
import React from "react";
import QuantityControl from "./QuantityControl";

const CartItem = ({ product, quantity, onRemove, onIncrement, onDecrement }) => {
    return (
        <div className="flex flex-col items-center border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                src={product.image}
                alt=""
            />

            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {product.title}
                </h5>
                <p className="text-lg mb-4 font-bold text-gray-800 dark:text-gray-300">
                    {((product.price * quantity) * 1.0).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })}
                </p>

                <div className="flex">
                    <QuantityControl
                        quantity={quantity}
                        onIncrement={onIncrement}
                        onDecrement={onDecrement}
                        onRemove={onRemove}
                    />
                </div>
            </div>
        </div>
    );
};

export default CartItem;