import React from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import { BACKEND_URL } from '../../../utils';
import { useState, useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BookCarousel = () => {

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
  };

  const mobileSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  const [mostRated, setMostRated] = useState([])

  useEffect(() => {
      try {
      axios.get(`${BACKEND_URL}/books/filters?page=&sort=&genre=&title=&publisher=&author=&rating=5&publishedDate=`).then(({ data }) => setMostRated(data.foundBooks))
      } catch (error) {
        console.error(error.message)
      }
  }, [])

  return (
    <div className="mt-[10rem] mx-auto max-w-6xl bg-gray-200">
      <div className="text-center text-4xl font-bold text-stone-600 bg-gray-200 w-full py-3 mb-5 shadow-2xl shadow-gray-400 dark:bg-gray-900 px-12 dark:text-gray-100 dark:shadow-transparent dark:border-b-2 dark:border-gray-600">
        Best Rated
      </div>
      <div className="block sm:block hidden">
        <Slider {...settings}>
          {mostRated.map((book) => (
            <div class="bg-gray-200 border border-gray-300 rounded-md shadow-lg w-full h-full overflow-hidden">
              <div className="h-80 w-full">
                <img src={book.image} alt={book.title} class="w-full h-full p-4 object-center" />
              </div>
              <div className="my-4 text-left">
                <span className="text-sm text-gray-500 ml-5">{book.authors}</span>
                <a href={`/product-page/${book.id}`}><p className="text-lg text-gray-900 font-bold ml-5">{book.title.length > 25 ? book.title.substring(0, 25) + '...' : book.title}
                </p></a>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="md:hidden w-[300px] mx-auto">
        <Slider {...mobileSettings}>
          {mostRated.map((book) => (
            <div data-aos='fade-up' class="bg-gray-200 border border-gray-300 rounded-md shadow-lg w-full h-full overflow-hidden">
              <div className="h-80 w-full">
                <img src={book.image} alt={book.title} class="w-full h-full p-4 object-center" />
              </div>
              <div className="my-4 text-left">
                <span className="text-sm text-gray-500 ml-5">{book.authors}</span>
                <a href={`/product-page/${book.id}`}><p className="text-lg text-gray-900 font-bold ml-5">{book.title.length > 25 ? book.title.substring(0, 25) + '...' : book.title}
                </p></a>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BookCarousel;
