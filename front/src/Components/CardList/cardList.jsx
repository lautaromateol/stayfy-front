// import { all } from "axios";
import Cards from "../Cards/cards";
import { useSelector } from "react-redux";
// import css

function CardList() {
  const books = useSelector((state)=>state.books)
   
  return (
    <div>
      {/* mapeamos la matriz para generar un componente cards para cada controlador en la lista */}
      {books?.map((books, index) => (<Cards key={index} books={books} />))}
    </div>
  );
}

export default CardList;