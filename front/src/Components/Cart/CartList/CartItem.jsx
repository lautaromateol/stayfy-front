// CartItem.jsx
import React from "react";
import QuantityControl from "./QuantityControl";

const CartItem = ({ product, quantity, onRemove, onIncrement, onDecrement }) => {
    return (
        <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <img src={product.image} alt="product-image" class="h-[260px] md:h-[140px] md:object-center w-full rounded-lg sm:w-40" />
            <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div class="mt-5 sm:mt-0">
                    <h2 class="text-lg font-bold text-gray-900">{product.title}</h2>
                    {product.authors.map((aut) => {

                        return product.authors.length > 1 && product.authors.indexOf(aut) !== product.authors.length - 1 ?
                            <span className="text-sm mb-2 text-gray-500 dark:text-gray-400">{aut}, </span> :
                            <span className="text-sm mb-2 text-gray-500 dark:text-gray-400">{aut}</span>

                    })}
                </div>
                <div class="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <QuantityControl
                        quantity={quantity}
                        onIncrement={onIncrement}
                        onDecrement={onDecrement}
                        onRemove={onRemove}
                    />
                    <div class="flex items-center space-x-4">
                        <p class="text-sm">{((product.price * quantity) * 1.0).toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                        })}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;