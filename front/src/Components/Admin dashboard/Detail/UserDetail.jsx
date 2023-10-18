import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Table } from 'antd';
import axios from 'axios';
import {
  desactivateUser,
  reactivateUser,
  makeAdmin,
  deactivateAdmin
} from '../../../redux/actions';
import { BACKEND_URL } from '../../../../utils';

const UserDetail = () => {
  
  const { id } = useParams();

  const [user, setUser] = useState({});

  const [orders, setOrders] = useState([]);

  const dispatch = useDispatch();

  const handleDesactivate = () => {
    dispatch(desactivateUser(user.userId));
  };

  const handleReactivate = () => {
    dispatch(reactivateUser(user.userId));
  };

  const handleAdmin = () => {
    !user.isAdmin ? dispatch(makeAdmin(user.userId)) : dispatch(deactivateAdmin(user.userId))
  }

  useEffect(() => {
    axios(`${BACKEND_URL}/users/${id}`).then(({ data }) => {
      if (data.username) {
        setUser(data);
        setOrders(data.Orders);
      } else {
        window.alert('No hay usuario con ese ID');
      }
    });
    return () => {
      setUser({});
    };
  }, [id]);

  const columns = [
    {
      title: 'Merchant Order',
      dataIndex: 'merchantOrder',
      key: 'merchantOrder',
    },
    {
      title: 'Payment ID',
      dataIndex: 'paymentId',
      key: 'paymentId',
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
      title: 'Amount',
      dataIndex: 'spent',
      key: 'spent',
      render: (spent) => <span>${spent}</span>,
    },
  ];

  return (
    <div className="h-screen">
      <div className="grid place-items-center">
        <h1 className="text-3xl mt-5">{user.fullName}</h1>
        <p className="mt-2">
          username: {user.username} - id: {user.userId} - active:{' '}
          {user.active ? 'true' : 'false'} - admin: {' '} {user.isAdmin ? 'true' : 'false'}
        </p>

        <div className='flex space-around'>
        {user.active && !user.isSuperAdmin ? (
          <Button
            className="inline m-2"
            type="primary"
            onClick={handleDesactivate}
            href={`/admin/users/${id}`}
            >
            Deactivate
          </Button>
        ) : '' } 
        {!user.active && !user.isSuperAdmin ? (
          <Button
          className="m-2"
          type="primary"
          onClick={handleReactivate}
          href={`/admin/users/${id}`}
          >
            Reactivate
          </Button>
        ) : '' }
        
        {!user.isAdmin ? (
        <Button
        className="flex space-around m-2 bg-green-500 text-white" 
        href={`/admin/users/${id}`}
        onClick={handleAdmin}>
          Make admin
        </Button>) : ''
        }

       {user.isAdmin && !user.isSuperAdmin ? (
        <Button
        className="flex space-around m-2 bg-green-500 text-white" 
        href={`/admin/users/${id}`}
        onClick={handleAdmin}>
          Deactivate admin
        </Button>) : ''
        }
        
        
        </div>
      </div>
      <h2 className="text-2xl mt-10 ml-5 text-center underline">Orders</h2>
      <Table
        dataSource={orders}
        columns={columns}
        rowKey={(record) => record.paymentId}
      />
    </div>
  );
};

export default UserDetail;
