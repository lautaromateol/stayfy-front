import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../redux/actions';

const Orders = ()=>{
    const orders = useSelector(state => state.orders);
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getOrders())
    }, [])

    return (
        <div className='w-full'>
            <h1 className="text-center text-3xl mt-5">Orders admin-dashboard</h1>
      <table className='w-full'>
        <thead>
          <tr className="grid grid-cols-[33%_33%_33%] place-items-center mt-5">
            <th>Buyer</th>
            <th>Product</th>
            <th>Spent</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr className="grid grid-cols-[33%_33%_33%] place-items-center mt-5" key={index}>
              <td className="mt-2">{order.buyer}</td>
              <td className="mt-2">{order.products}</td>
              <td className="mt-2">{order.spent}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
        
    );
  }
export default Orders