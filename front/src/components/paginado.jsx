import React, { useState, useEffect } from "react";
// import styles from

//defino el componente que maneja el paginado de books
export default function Paginado({ booksPerPage, allBooks, paginado, currentPage }) {
    const [displayPages, setDisplayPages] = useState([]); //define el estado de las paginas

    //CALCULOS Y MANEJO DEL PAGINADO
    useEffect(() => {
        const totalPages = Math.ceil(allBooks / booksPerPage);
        const maxDisplayPages = 8; //cantidad max de paginas en la nav
        let startPage = Math.max(currentPage - Math.floor(maxDisplayPages / 2), 1);
        let endPage = Math.min(startPage + maxDisplayPages - 1, totalPages);

        if (endPage -  startPage < maxDisplayPages -1) {
            startPage = Math.max(endPage -  maxDisplayPages + 1, 1);
        }

        const pages = [];
        for (let i =  startPage; i <= endPage; i++) {
            pages.push(i);
        }

        //actualiza el estado para mostrar las paginas
        setDisplayPages(pages);
    }, [currentPage, allBooks, booksPerPage]);

    //define estados y funciones para el input
    const [inputPage, setInputPage] = useState("");
    const [errorInput, setErrorInput] = useState("");

    //HANDLER PARA EL CAMBIO EN EL INPUT GO TO PAGE
    const handleInputChange = (event) => {
        setInputPage(event.target.value);
        setErrorInput("");
    };

    //HANDLER PARA BOTON GO TO PAGE
    const handleGoToPage = () => {
        const pageNumber = parseInt(inputPage, 10);
        //llamo a la funcion de paginado con el numero de pag valido
        if (pageNumber >= 1 && pageNumber <= Math.ceil(allBooks / booksPerPage)) {
            paginado(pageNumber);
            setInputPage("");
        } else {
            setErrorInput("Only numbers within the range");
        } 
    };

    //HANDLER PARA ENTER EN EL INPUT
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleGoToPage();
        }
    };

    //HANDLER PARA BOTON HOME EN NAV DE PAGINADO
    const handleHomeBtn = () => {
        paginado(1); //primera pag
    }

    return (
        <nav>
            <ul>
                {/* BOTON HOME EN LA NAV */}
                <li>
                    <button onClick={handleHomeBtn}>Home</button>
                </li>
                
                {/* BOTON RETROCEDE EN LA NAV */}
                <li>
                    <button onClick={() => paginado(currentPage - 1)} disabled={currentPage === 1}>
                        {"<"}
                    </button>
                </li>

                {/* BOTONES NUMERICOS EN LA NAV */}
                {displayPages.map((number) => (
                    <li key={number}>
                        <button onClick={() => paginado(number)}>
                            {number}
                        </button>
                    </li>
                ))}

                {/* BOTON SIGUIENTE DE LA NAV */}
                <li>
                    <button onClick={() => paginado(currentPage + 1)} disabled={currentPage === Math.ceil(allDrivers / driversPerPage)}>
                        {">"}
                    </button>
                </li>

                {/* ETIQUETA PAG ACTUAL/ULTIMA */}
                <li>
                    <p>
                        {currentPage} / {Math.ceil(allDrivers / driversPerPage)}
                    </p>
                </li>

                {/* BOTON IR A PAG ESPECIFICA */}
                <li>
                    <input
                    type="text"
                    value={inputPage}
                    onChange={handleInputChange}
                    placeholder=""
                    onKeyDown={handleKeyDown}
                    />
                    <button onClick={handleGoToPage}>Go</button>
                </li>

                {/* MENSAJE DE ERROR SI EL NUMERO DE PAG NO ES VALIDO */}
                <p disabled={!errorInput}>
                    {errorInput && errorInput}
                </p>
            </ul>
        </nav>
    );
}

//componente paginado, calculo y manejo del mismo, logica del input go to page,
// y los botones de navegacion