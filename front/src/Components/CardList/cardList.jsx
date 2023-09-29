// import { all } from "axios";
import Cards from "../Cards/Cards";
import { useSelector } from "react-redux";
// import css

function CardList() {
  const books = useSelector((state) => state.books);

  return (
    <div>
      {/* mapeamos la matriz para generar un componente cards para cada controlador en la lista */}
      {books.map(({ id, title, authors, price, image }) => (
        <Cards 
        key={id}
        id={id}
        title={title}
        authors={authors}
        image={image}
        price={price}
         />
      ))}
    </div>
  );
}

export default CardList;
