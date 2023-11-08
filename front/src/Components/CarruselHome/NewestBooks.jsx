import { useState } from "react";
import { useEffect } from "react";
import { BACKEND_URL } from "../../../utils";
import Slider from "react-slick";
import axios from "axios";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NewestBooks = ()=> {

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1
    }

    const mobileSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1
    }

    const [newest, setNewest] = useState([])

    useEffect(()=> {
        try {
            axios.get(`${BACKEND_URL}/books/filters?page=&sort=&genre=&title=&publisher=&author=&rating=5&publishedDate=ASC`)
            .then(({data}) => setNewest(data.foundBooks))
        } catch (error) {
            
        }
    }, [])

    return(
        <div className="py-[8rem] mx-auto max-w-6xl bg-gray-200">
      <div className="text-center text-4xl font-bold text-stone-600 bg-gray-200 w-full py-3 mb-5 shadow-2xl shadow-gray-400 dark:bg-gray-900 px-12 dark:text-gray-100 dark:shadow-transparent dark:border-b-2 dark:border-gray-600">
        Our latest acquistions
      </div>
      <div className="block sm:block hidden">
        <Slider {...settings}>
          {newest.map(({id, image}) => {
            return(
                <a href={`/product-page/${id}`}><img className="w-30 h-60 object-center" src={image} /></a>
            )
          })}
        </Slider>
      </div>
      <div className="block md:hidden">
      <Slider {...mobileSettings}>
          {newest.map(({id, image}) => {
            return(
                <a className="mx-auto" href={`/product-page/${id}`}><img className="mx-auto w-30 h-60 object-center" src={image} /></a>
            )
          })}
        </Slider>
      </div>
    </div>
    )

}

export default NewestBooks;