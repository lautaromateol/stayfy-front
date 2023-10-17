// import { all } from "axios";
import CardV2 from "../Cards/CardV2";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Aos from 'aos'
import 'aos/dist/aos.css'
// import css

function CardList() {
  const books = useSelector((state) => state.books);

  useEffect(() => {
    Aos.init({duration:1500})
  }, [])

  return (
    <div>

  <section x-data="xData()" className="bg-[#A4BCB3] dark:bg-gray-900 py-10 px-24" >

    <div 
        className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" data-aos = 'fade-up'>

      {/* mapeamos la matriz para generar un componente cards para cada controlador en la lista */}
      {books.map(({ id, title, authors, price, image, rating }) => (
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

export default CardList;
// import { all } from "axios";