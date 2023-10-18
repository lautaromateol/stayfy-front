import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import { getUsers } from '../../../redux/actions';

const Users = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const columns = [
    {
      title: 'User Id',
      dataIndex: 'userId',
      key: 'userId',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => <Link to={`/admin/users/${record.userId}`}>{text}</Link>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Date registered',
      dataIndex: 'dateRegistered',
      key: 'dateRegistered',
      render: (text) => <p>{text}</p>,
    },
  ];

  return (
    <div className="h-screen">
      <div>
        <h1 className="text-center text-3xl mt-5">Users admin-dashboard</h1>
        <Table dataSource={users} columns={columns} pagination={false} style={{ marginTop: 20 }} />
      </div>
    </div>
  );
};

export default Users;
