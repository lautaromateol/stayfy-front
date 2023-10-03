import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, orderBooks, getAuthors, getPublishers, getYear, filter, reset, searchBook, setError, getGenres } from "../../redux/actions";
// import Paginado from "../../Components/Paginado/paginado";
// import CardList from "../../Components/CardList/CardList";
// import Nav from "../../components/Nav";
//import css

function Books() {
  // NUEVOS ESTADOS PARA FILTROS (pendientes de revisar - DC)
  const [sort, setSort] = useState();
  const [page, setPage] = useState(0);
  const [title, setTitle] = useState('');
  const [publishedDate, setpublishedDate] = useState(0);
  const [genreList, setGenreList] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  const dispatch = useDispatch();
  const { totalPages, filteredBooks } = useSelector((state) => state); // nuevo para filtros 

  useEffect(() => { // nuevo para filtros 
    dispatch(
      getFilteredBooks({
        sort,
        page,
        genre: selectedGenre,
        title,
        publishedDate,
      })
    );
  }, [sort, page, selectedGenre, title, publishedDate]);


  useEffect(() => { // nuevo para filtros 
    getGenres(setGenreList);  // --> pendiente crear una endpoint en el back que nos retorne un arreglo con todos los géneros y verificar respuesta acá
  }, []);

    //define estados para paginacion y filtros
    const [currentPage, setCurrentPage] = useState(
        parseInt(localStorage.getItem("currentPage")) || 1
    );
    const booksPerPage = 10;
    const indexLastBook =  currentPage * booksPerPage;
    const indexOfFirstBook = indexLastBook - booksPerPage;

    //MANEJA PAGINADO
    useEffect(() => {
        const storedCurrentPage = localStorage.getItem("currentPage");
        if (storedCurrentPage) {
          setCurrentPage(parseInt(storedCurrentPage));
          localStorage.removeItem("currentPage");
        }
      }, []);

    //GUARDA PAGINA ACTUAL
    useEffect(() => {
        localStorage.setItem("currentPage", currentPage.toString());
      }, [currentPage]);
    
      const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
      };

      return (
        <div>
            <div>
                
            </div>
            
            <div>
                <Paginado
                booksPerPage={booksPerPage}
                paginado={paginado}
                currentPage={currentPage}
                />
            </div>

            <div>
                <CardList/>
            </div>
        </div>
      )
}

export default Books