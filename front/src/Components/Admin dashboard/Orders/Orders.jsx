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
    },
    {
      title: 'Ammount',
      dataIndex: 'ammount',
      key: 'ammount',
    },
    {
      title: 'Created at',
      dataIndex: 'created',
      key: 'created'
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
    <div className='h-screen'>
      <h1 className="text-center text-3xl mt-5">Orders admin-dashboard</h1>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{pageSize: 10}}
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

export default Orders;
