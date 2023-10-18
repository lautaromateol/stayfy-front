import React, { useState } from 'react';
import Stars from './Stars';
import { useEffect } from "react";
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useDispatch } from "react-redux";
import { postReview } from "../../redux/actions";
import { notification } from 'antd';

const ReviewForm = () => {
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, description) => {
        api[type]({
            message: description,
            // description: "Stayfy",
        });
    };

    const [review, setReview] = useState({
        rating: 0,
        title: '',
        message: '',
        userId: 1,
        bookId: 1,
    });
    const dispatch = useDispatch();

    useEffect(() => {
        Aos.init({ duration: 1500 });
    }, []);

    const handleRatingChange = (newRating) => {
        setReview({ ...review, rating: newRating });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReview({ ...review, [name]: value });
    };
    const [message, setMessage] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('review.rating:', review.rating);
        if (review.rating === 0) {
            openNotificationWithIcon('warning', 'Selecciona una calificación.');
            return;
        }
            try {
            
            const response = await dispatch(postReview(review));

            if (response && response.status === 201) {
                openNotificationWithIcon('success','Review inserted successfully.');
                setMessage('Reseña insertada correctamente.');
            } else {
                setMessage('Error al insertar la reseña. Inténtalo de nuevo.');
                openNotificationWithIcon('warning','Error inserting the review. Please try again.')
            }
        } catch (error) {
            console.error('Error al enviar la reseña:', error);
            openNotificationWithIcon('warning','Error inserting the review. Please try again.')
            setMessage('Error al insertar la reseña. Inténtalo de nuevo.');
        }

        setReview({
            rating: 0,
            title: '',
            message: '',
            userId: 1,
            bookId: 1,
        });
    };

    return (
        <div>
            {contextHolder}
            {/* <Space>
                <Button onClick={() => openNotificationWithIcon('success')}>Success</Button>
                <Button onClick={() => openNotificationWithIcon('info')}>Info</Button>
                <Button onClick={() => openNotificationWithIcon('warning')}>Warning</Button>
                <Button onClick={() => openNotificationWithIcon('error')}>Error</Button>
            </Space> */}

            <div className="min-h-screen bg-[#A4BCB3] dark:bg-gray-900">
                <div className="bg-[#A4BCB3] dark:bg-gray-900 text-black py-20" data-aos='fade-up'>
                    <div className="container mx-auto flex flex-col md:flex-row my-6 md:my-4">
                        <div className="flex flex-col w-full lg:w-1/2 p-8">
                            <p className=" text-yellow-300 text-6xl uppercase tracking-loose">REVIEW</p>
                            <p className="text-3xl md:text-5xl text-gray-800 dark:text-gray-300 my-4 leading-relaxed md:leading-snug">Leave us a feedback!</p>
                            <p className="text-sm md:text-base text-gray-800 dark:text-gray-300 leading-snug text-gray-70 text-opacity-100">
                                Please provide your valuable feedback.
                            </p>
                        </div>
                        <div className="flex flex-col w-full lg:w-2/3 justify-center">
                            <div className="container w-full px-4">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white">
                                            <div className="flex-auto p-5 lg:p-10">
                                                <h4 className="text-2xl mb-4 text-black font-semibold">Have a suggestion?</h4>
                                                <form id="feedbackForm" onSubmit={handleSubmit}>
                                                    <div className="relative w-full mb-3">
                                                        <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="rating">
                                                            Calificación seleccionada: {review.rating} estrellas
                                                        </label>
                                                        <Stars handleRatingChange={handleRatingChange} />
                                                    </div>
                                                    <div className="relative w-full mb-3">
                                                        <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="title">
                                                            Title
                                                        </label>
                                                        <input
                                                            type="title"
                                                            name="title"
                                                            id="title"
                                                            className="border-0 px-3 py-3 rounded text-sm shadow w-full bg-gray-300 placeholder-black text-gray-800 outline-none focus:bg-gray-400"
                                                            placeholder=""
                                                            style={{ transition: 'all 0.15s ease 0s' }}
                                                            required
                                                            value={review.title}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="relative w-full mb-3">
                                                        <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="feedback">
                                                            Message
                                                        </label>
                                                        <textarea
                                                            maxLength="300"
                                                            name="message"
                                                            id="message"
                                                            rows="4"
                                                            cols="80"
                                                            className="border-0 px-3 py-3 bg-gray-300 placeholder-black text-gray-800 rounded text-sm shadow focus:outline-none w-full"
                                                            placeholder=""
                                                            required
                                                            value={review.message}
                                                            onChange={handleInputChange}
                                                        ></textarea>
                                                    </div>
                                                    <div className="text-center mt-6">
                                                        <button
                                                            id="feedbackBtn"
                                                            className="bg-yellow-300 text-black text-center mx-auto active:bg-yellow-400 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                                            type="submit"
                                                            style={{ transition: 'all 0.15s ease 0s' }}
                                                        >
                                                            Submit
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewForm;
