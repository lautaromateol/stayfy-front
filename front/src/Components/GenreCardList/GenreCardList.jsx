import CardV2 from "../Cards/CardV2";
import Slider from 'react-slick';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import Aos from 'aos';
import 'aos/dist/aos.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const GenreCardList = () => {

  const { genre } = useParams();

  const books = useSelector((state) => state.books);

  useEffect(() => {
    Aos.init({ duration: 1000 });
    const lastTab = localStorage.getItem('lastTab')
      if(lastTab){
          localStorage.removeItem('lastTab')
          localStorage.setItem('lastTab', window.location.href)
      }
  }, []);

  const filteredBooks = genre
    ? books.filter((book) => book.genre === genre)
    : books;

  return (
    <div class="min-h-screen w-full bg-gray-100 dark:bg-gray-900 py-10 px-12">
      <h1 class="mb-5 text-center text-3xl font-bold">{genre}</h1>
      <div
          className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          data-aos="fade-up"
      >
        {filteredBooks.map(({ id, title, authors, price, image, rating }) => (
          <CardV2
            key={id}
            id={id}
            title={title}
            authors={authors}
            image={image}
            price={price}
            rating={rating}
          />
        ))}
      </div>
    </div>
  );
}

export default GenreCardList;