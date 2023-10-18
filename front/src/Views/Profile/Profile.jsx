import React, { useState, useEffect } from 'react';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { useUser } from "../../Context/UserContext";
import Axios from 'axios';
import { Space, Table, Tag, Button, Modal } from 'antd';
import { BACKEND_URL } from '../../../utils';



const UserProfile = () => {
    const { userData } = useUser();
    const [axiosData, setaxiosData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const columns = [
        {
            title: 'Order',
            dataIndex: 'order',
            key: 'order',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {/* <a>Invite {record.name}</a> */}
                    {/* <a>View</a> */}
                    <Button  onClick={showModal}>
                    View
                    </Button>
    
                </Space>
            ),
        },
    ];
    const data = [
        {
            key: '1',
            order: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            order: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            order: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];


    useEffect(() => {
        if (userData.userId) {
            Axios.get(`${BACKEND_URL}/users/${userData.userId}`)
                .then((response) => {
                    setaxiosData(response.data);
                })
                .catch((error) => {
                    console.error('Error al obtener los datos del usuario:', error);
                });
        }
    }, [userData.userId]);

    if (!axiosData) {
        return <div>Cargando...</div>;
    }
    return (
        <div className="bg-gray-100 dark:bg-gray-800 py-16">
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>

            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                    <div className="text-center">
                        <img
                            src={axiosData?.profilePicture || "https://as1.ftcdn.net/v2/jpg/03/39/45/96/1000_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg"}
                            alt="User Profile"
                            className="w-24 h-24 rounded-full mx-auto mb-4"
                        />
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                            {axiosData.fullName}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{axiosData.username}</p>
                    </div>

                    <Breadcrumb
                        items={[
                            {
                                href: '',
                                title: <HomeOutlined />,
                            },
                            // {
                            //     href: '',
                            //     title: (
                            //         <>
                            //             <UserOutlined />
                            //             <span>Application List</span>
                            //         </>
                            //     ),
                            // },
                            {
                                title: 'User Profile',
                            },
                        ]}
                    />


                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            Contact Information
                        </h3>
                        <ul className="mt-2 text-gray-600 dark:text-gray-300">
                            <li className="flex items-center mb-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-400 dark:text-gray-500 mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M3 9a3 3 0 016 0 3 3 0 016 0 3 3 0 016 0 3 3 0 016 0 3 3 0 016 0 3 3 0 016 0M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"
                                    />
                                </svg>
                                {axiosData.email}
                            </li>
                        </ul>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            Shopping History
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                            eget justo nec urna cursus blandit. */}
                        </p>
                        <Table columns={columns} dataSource={data} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
