import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../../redux/actions';
import { Table } from 'antd';

const Orders = () => {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const columns = [
    {
      title: 'Buyer ID',
      dataIndex: 'buyer',
      key: 'buyer',
      className: "bg-[#dbd1c3] dark:bg-[#40495C] dark:text-white",
    },
    {
      title: 'Products',
      dataIndex: 'products',
      key: 'products',
      render: (products) =>
        products.map((product) => (
            products.length > 1 && products.indexOf(product) !== products.length - 1 ?
            <span key={product}>{product}, </span> :
            <span key={product}>{product}</span>        
            )),
      className: "bg-[#ccc1b3] dark:bg-[#2D364B] dark:text-white",
    },
    {
      title: 'Ammount',
      dataIndex: 'ammount',
      key: 'ammount',
      className: "bg-[#dbd1c3] dark:bg-[#40495C] dark:text-white",
    },
    {
      title: 'Created at',
      dataIndex: 'created',
      key: 'created',
      className: "bg-[#ccc1b3] dark:bg-[#2D364B] dark:text-white",
    }
  ];

  const data = orders.map((order, index) => ({
    key: index,
    buyer: order.buyer,
    products: order.products,
    ammount: order.spent,
    created: order.createdAt
  }));

  return (
    <div className='h-screen pt-2 bg-[#B2D1C5] dark:bg-[#101726]'>
      <h1 className="text-center text-3xl mt-2 text-[#816d64] dark:text-white">Orders Admin-Dashboard</h1>
      <Table
       className='bg-white'
        dataSource={data}
        columns={columns}
        pagination={{pageSize: 10}}
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

export default Orders;
