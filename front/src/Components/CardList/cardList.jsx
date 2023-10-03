// import { all } from "axios";
import Cards from "../Cards/Cards";
import CardV2 from "../Cards/CardV2";
import { useSelector } from "react-redux";
// import css

function CardList() {
  const books = useSelector((state) => state.books);

  return (
    <div>

  <section x-data="xData()" className="bg-stone-400 dark:bg-gray-900 py-10 px-12">

    <div 
        className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

      {/* mapeamos la matriz para generar un componente cards para cada controlador en la lista */}
      {books.map(({ id, title, authors, price, image }) => (
        <CardV2
        key={id}
        id={id}
        title={title}
        authors={authors}
        image={image}
        price={price}
        />
        ))}
    </div>
    </section>
  </div>

  );
}

export default CardList;
// import { all } from "axios";