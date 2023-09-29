import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Success = ()=>{

const [params] = useSearchParams()

const payment_id = params.get('payment_id')

const merchant_order_id = params.get('merchant_order_id')

const title = params.get('title')

const unit_price = params.get('unit_price')

const quantity = params.get('quantity')

const image = params.get('image')

    return(
        <div className="grid place-items-center">
            <h1 className="text-3xl text-center">Your order was confirmed successfully!</h1>
            <p className="my-5 mx-auto">Order id: {merchant_order_id}</p>
            <div className="bg-gray-200 rounded-md h-[500px] w-[300px] border border-solid border-black">
            <img className="w-[150px] h-[200px] my-10 mx-auto" src={image}/>
            <p className="mb-10 text-center">Product name: {title}</p>
            <p className="mb-10 text-center">Quantity delivered: {quantity}</p>
            <p className="mb-10 text-center">Spent: ${unit_price * quantity}</p>
            </div>
        </div>
    )
}

export default Success;