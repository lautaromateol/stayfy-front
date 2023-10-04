import axios from "axios";
import { BACKEND_URL } from "../../utils";
import { GET_FILTERED_BOOKS, GET_YEAR, GET_AUTHOR, GET_PUBLISHER, GET_GENRES, SET_LOADING_FALSE, SET_LOADING_TRUE, FILTER, RESET, SEARCH_BOOK, SET_ERROR, BUY_ORDERS, GET_USERS } from "./types";

export function getFilteredBooks(args) {  
    const { sort, page, genre, title, publisher, author } = args || {};
    return async (dispatch) => {
      try {
        dispatch({ type: SET_LOADING_TRUE });
        const response = await axios.get(`${BACKEND_URL}/books/filters`, {
          params: {
            page,
            sort,
            genre,
            title,
            publisher,
            author
          },
        });
        dispatch({ type: GET_FILTERED_BOOKS, payload: response.data }); // --> modificado soundDrivers
      } catch (error) {
        alert(error);
      } finally {
        dispatch({ type: SET_LOADING_FALSE });
      }
    };
}

export function getBooks() {
    return async function (dispatch) {
        try {
            const response = await axios("http://localhost:3001/books");
            return dispatch({
                type: "GET_BOOKS",
                payload: response.data,
            });
        } catch (error) {}
    };
}

export function postBook(payload){
    return async function (){
            const postBook = await axios.post('http://localhost:3001/books/create', payload)
            return postBook;
    }
}


export function orderBooks(orderType) {
    return {
        type: ORDER,
        payload: orderType
    }
}


export function getAuthors() {
    return async function (dispatch) {
        try {
            const response = await axios ("http://localhost:3001/books");
            const authors = response.data.map((book) => book.authors[0])
            let uniqueAuthors = [...new Set(authors)]; 
            return dispatch ({
                type: GET_AUTHOR,
                payload: uniqueAuthors,
            })
        } catch (error) {
            console.error(error)
        }
    }
}


export function getPublishers() {
    return async function (dispatch) {
        try {
            const response = await axios ("http://localhost:3001/books");
            const publisher = response.data.map((book) => book.publisher)
            let uniquePublishers = [...new Set(publisher)]; 
            return dispatch ({
                type: GET_PUBLISHER,
                payload: uniquePublishers,
            })
        } catch (error) {
            console.error(error)
        }
    }
}


export function getYear() {
    return async function (dispatch) {
        try {
            const response = await axios ("http://localhost:3001/publishedDate");
            return dispatch ({
                type: GET_YEAR,
                payload: response.data,
            })
        } catch (error) {

        }
    }
}


export function getGenres() {
    return async function (dispatch) {
        try {
            const response = await axios ("http://localhost:3001/books");
            const genre = response.data.map((book) => book.genre)
            let uniqueGenres = [...new Set(genre)]; 
            return dispatch ({
                type: GET_GENRES,
                payload: uniqueGenres,
            })
        } catch (error) {
        }
    }
}


export function filter (filtraTodo) {
    return {
        type: FILTER,
        payload: filtraTodo
    }
}


export function reset() {
    return {
        type: RESET,
    }
}


export function searchBook(name) {
    try {
        return async function (dispatch) {
            const booksName = await axios.get(
                `http://localhost:3001/books/filters?title=${name}`
            )
            const book = booksName.data
            dispatch({type:SEARCH_BOOK, payload: book})
        }
    } catch (error) {
        window.alert("Error, Book doesn't exist")
    }
}


export const setError = (errorMessage) => ({
    type: SET_ERROR,
    payload: errorMessage,
})

export const getOrders = ()=>{
    try {
        return async function (dispatch) {
            const allOrders = await axios.get(
                "http://localhost:3001/orders"
            )
            const ordersBuy = allOrders.data
            dispatch({type: BUY_ORDERS, payload: ordersBuy})
        }
    } catch (error) {
        console.error(error)
    }
}

export const getUsers = ()=>{
    try {
        return async function (dispatch) {
            const usuarios = await axios.get(
                "http://localhost:3001/users"
            )
            const allUsuarios = usuarios.data
            dispatch({type: GET_USERS, payload: allUsuarios})
        }
    } catch (error) {
        console.error(error)
    }
}
