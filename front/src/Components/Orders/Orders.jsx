import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../redux/actions';
import { Table } from 'antd';

const Orders = () => {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const columns = [
    {
      title: 'Buyer',
      dataIndex: 'buyer',
      key: 'buyer',
    },
    {
      title: 'Product',
      dataIndex: 'products',
      key: 'products',
    },
    {
      title: 'Spent',
      dataIndex: 'spent',
      key: 'spent',
    },
  ];

  const data = orders.map((order, index) => ({
    key: index,
    buyer: order.buyer,
    products: order.products,
    spent: order.spent,
  }));

  return (
    <div>
      <h1 className="text-center text-3xl mt-5">Orders admin-dashboard</h1>
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

export default Orders;
