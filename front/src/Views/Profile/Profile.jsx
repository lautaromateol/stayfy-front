import React, { useState, useEffect } from 'react';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { useUser } from "../../Context/UserContext";
import { Table, Modal } from 'antd';
import { BACKEND_URL } from '../../../utils';
import ReviewForm from '../../Components/ReviewForm/ReviewForm';
import axios from 'axios';



const UserProfile = () => {

    const { userData } = useUser();

    const [axiosData, setaxiosData] = useState(null);

    const [books, setBooks] = useState(null)

    const [orders, setOrders] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [idReview, setIdReview] = useState(null)

    const [found, setFound] = useState(false)
    const [rating, setRating] = useState(false)
    // const id_user = useUser(userData.userId);

    // const showModal = (bookTitle) => {
    //     const filteredBooks = books.filter((book)=> book.title === bookTitle)[0].id
    //     setIdReview(filteredBooks)
    //     console.log(filteredBooks);
    //     setIsModalOpen(true);
    // };

    const showModal = (bookTitle) => {
        const filteredBook = books.find((book) => book.title === bookTitle);
        console.log(filteredBook.id);
    
        if (filteredBook) {
            const idBook = filteredBook.id;
            setFound(false);
            // const url = `http://localhost:3001/review/user/2/book/${idBook}`;
            const url = `${BACKEND_URL}/review/user/${userData.userId}/book/${idBook}`;
    
            // console.log("book:", idBook);
            axios.get(url)
                .then((response) => {
                    if (response.data === null) {
                        console.log("La respuesta de la solicitud es nula.");
                        setFound(false);
                    } else {
                        setFound(true);
                        setRating(response.data.review.rating);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    console.log("Error al realizar la solicitud Axios.");
                });
    
            setIdReview(idBook, found);
            setIsModalOpen(true);
        } else {
            console.log("No se encontró el libro con el título proporcionado.");
        }
    };
        
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


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
                    <div>
                    {products.length > 1 && products.indexOf(product) !== products.length - 1 ?
                        <span className='mt-5' key={product}>{product} <a className="bg-green-500 mt-5 text-white p-0.5 rounded-md" onClick={()=> showModal(product)}>⭐</a></span> :
                        <span className='mt-5' key={product}>{product} <a className="bg-green-500 mt-5 text-white p-0.5 rounded-md" onClick={()=> showModal(product)}>⭐</a></span>}
                    </div>
                ))
        },
        {
            title: 'Amount',
            dataIndex: 'spent',
            key: 'spent',
            render: (spent) => <span>${spent}</span>,
        },
    ];

    useEffect(() => {
        try {
            axios.get(`${BACKEND_URL}/books`).then(({data}) => setBooks(data))
        } catch (error) {
            
        }
        if (userData.userId) {
            axios.get(`${BACKEND_URL}/users/${userData.userId}`)
                .then((response) => {
                    setaxiosData(response.data);
                    setOrders(response.data.Orders)
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
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 py-16">
            <Modal title="" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <ReviewForm idBook={idReview} found={found} rating={rating} />
            </Modal>

            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                    <div className="text-center dark:text-white">
                        <img
                            src={axiosData?.profilePicture || "https://as1.ftcdn.net/v2/jpg/03/39/45/96/1000_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg"}
                            alt="User Profile"
                            className="w-24 h-24 rounded-full mx-auto mb-4 dark:text-white"
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
                        <Table
                            dataSource={orders}
                            columns={columns}
                            rowKey={(record) => record.paymentId}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
