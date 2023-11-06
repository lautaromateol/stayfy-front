import CardV2 from "../Cards/CardV2";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useParams } from 'react-router-dom';

const GenreCardList = () => {
  const { genre } = useParams(); 
  const books = useSelector((state) => state.books);

  useEffect(() => {
    Aos.init({duration: 1500});
  }, []);

  const filteredBooks = genre
    ? books.filter((book) => book.genre === genre)
    : books;

  return (
    <div class="h-full">
      <section
        x-data="xData()"
        className="bg-stone-400 dark:bg-gray-900 py-10 px-12"
      >
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
      </section>
    </div>
  );
}

export default GenreCardList;