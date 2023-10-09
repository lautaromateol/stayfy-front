import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const QuantityControl = ({ quantity, onIncrement, onDecrement, onRemove }) => {
    return (
        <div className="flex ml-5">
            <button
                type="button"
                className="font-medium text-red-700 hover:text-red-500"
                onClick={onRemove}
            >
                <span className="px-3 bg-red-300 text-red-900 text-xs font-medium mr-2 py-0.5 rounded dark:bg-red-900 dark:text-red-100">
                    <FontAwesomeIcon icon={faTrash} />{" "}
                </span>
            </button>

            <button
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-gray-200 font-medium   px-3 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                onClick={onDecrement}
            >
                -
            </button>
            <span className="px-3 mb-2 bg-gray-200 dark:text-black">{quantity}</span>
            <button
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-gray-200 font-medium   px-3 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                onClick={onIncrement}
            >
                +
            </button>
        </div>
    );
};

export default QuantityControl;