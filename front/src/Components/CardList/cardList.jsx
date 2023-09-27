import { all } from "axios";
import Cards from "../Cards/cards";
// import css

function CardList({books}) {
  const arrBooks = books  
  return (
    <div>
      {/* mapeamos la matriz para generar un componente cards para cada controlador en la lista */}
      {arrBooks?.map((books, index) => (<Cards key={index} books={books} />))}
    </div>
  );
}

export default CardList;