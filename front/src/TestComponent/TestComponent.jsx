import React, { useEffect, useState } from "react";
import styles from './TestComponent.module.css';
import Cards2 from "./Cards/Cards2";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredBooks } from "../redux/actions";
// import { getBooks, orderBooks, getAuthor, getPublisher, getYear,
// getGender, filter, reset, searchBook, setError, getGenres } from "../../redux/actions";
import { ASC, DESC, getGenresList } from "../../utils";
import SearchBar2 from "./SearchBar2/SearchBar2";


export default function TestComponent() {
  // NUEVOS ESTADOS PARA FILTROS (pendientes de revisar - DC)
  const [sort, setSort] = useState();
  const [page, setPage] = useState(0);
  const [title, setTitle] = useState('');
  const [genreList, setGenreList] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [publishedDate, setpublishedDate] = useState(0);

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
    getGenresList(setGenreList);  // --> pendiente crear una endpoint en el back que nos retorne un arreglo con todos los géneros y verificar respuesta acá
  }, []);

  return (
    <div className={styles.container}>
      <SearchBar2 handleSearch={(title) => setTitle(title)} />
      <div className={styles.sortContainer}>
        <button
          className={styles.sortButton}
          onClick={() => {
            setSort({
              field: "title",
              direction: ASC,
            });
          }}
        >
          <strong>Title Asc</strong>
        </button>

        <button
          className={styles.sortButton}
          onClick={() => {
            setSort({
              field: "title",
              direction: DESC,
            });
          }}
        >
          <strong>Title Desc</strong>
        </button>

        <button
          className={styles.sortButton}
          onClick={() => {
            setSort();
          }}
        >
          <strong>Clear</strong>
        </button>

        <div className={styles.select}>
          <select
            name="select"
            className={styles.teamInput}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            {genreList.map((genre) => (
              <option value={genre === "Select genre" ? "" : genre}>{genre}</option>
            ))}
          </select>
          {/* <select
            name="select"
            className={styles.teamInput}
            onChange={(e) => setSelectedOrigin(e.target.value)}
          >
            <option value={""}>Select origin</option>
            <option value={"api"}>API</option>
            <option value={"db"}>Database</option>
          </select> */}
        </div>
      </div>

      <Cards2 books={filteredBooks} />
      <div className={styles.pagesContainer}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (buttonPage) => (
            <button
              onClick={() => {
                setPage(buttonPage - 1);
              }}
              className={`${styles.pageButton} ${
                buttonPage - 1 === page ? styles.pageButtonSelected : ""
              }`}
            >
              {buttonPage}
            </button>
          )
        )}
      </div>
    </div>
  );
};

const totalPages = 6;
const arrayPages = [];

for (let i=0; totalPages.length > 0; i++){
  let count = 1 + i;
  arrayPages.push(count)
}

<div>
  <select onChange={(e) => setPage(e.target.value)}>
    <option hidden value="">
      Page
    </option>
    {arrayPages.map((pg) => {
      return <option>{pg}</option>;
    })}
  </select>
</div>;