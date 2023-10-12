import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredBooks } from "../../redux/actions";

const Products = () => {
  const dispatch = useDispatch();

  const books = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(getFilteredBooks());
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <table>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>
                <img src={book.image} alt={book.title} className="w-10 h-100"/>
              </td>
              <td>{book.title}</td>
              <td>${book.price}</td>
              <td>
                <button>Editar</button>
                <button>Deshabilitar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
