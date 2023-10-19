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
      className: "bg-[#dbd1c3] dark:bg-[#40495C] dark:text-white",
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => <Link to={`/admin/users/${record.userId}`}>{text}</Link>,
      className: "bg-[#ccc1b3] dark:bg-[#2D364B] dark:text-white",
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <p>{text}</p>,
      className: "bg-[#dbd1c3] dark:bg-[#40495C] dark:text-white",
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text) => <p>{text}</p>,
      className: "bg-[#ccc1b3] dark:bg-[#2D364B] dark:text-white",
    },
    {
      title: 'Date registered',
      dataIndex: 'dateRegistered',
      key: 'dateRegistered',
      render: (text) => <p>{text}</p>,
      className: "bg-[#dbd1c3] dark:bg-[#40495C] dark:text-white",
    },
  ];

  return (
    <div className="h-screen pt-2 bg-[#B2D1C5] dark:bg-[#101726]">
      <div>
        <h1 className="text-center text-3xl mt-2 text-[#816d64] dark:text-white">Users Admin-Dashboard</h1>
        <Table 
        className="bg-white"
        dataSource={users} columns={columns} pagination={{ pageSize: 10 }} style={{ marginTop: 20 }} />
      </div>
    </div>
  );
};

export default Users;
