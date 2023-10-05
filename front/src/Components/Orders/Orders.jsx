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
      <table>
        <thead>
          <tr>
            <th>Buyer</th>
            <th>Product</th>
            <th>Spent</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.buyer}</td>
              <td>{order.products}</td>
              <td>{order.spent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
export default Orders