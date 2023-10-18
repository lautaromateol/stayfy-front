import axios from "axios";
import { BACKEND_URL } from "../../utils";
import { GET_FILTERED_BOOKS, GET_YEAR, GET_AUTHOR, GET_PUBLISHER, GET_GENRES, SET_LOADING_FALSE, SET_LOADING_TRUE, FILTER, RESET, SEARCH_BOOK, SET_ERROR, BUY_ORDERS, GET_USERS, REACTIVATE_USER, DELETE_USER, DESACTIVATE_USER, GET_TITLES, GET_ALL_BOOKS } from "./types";

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

export function getAllBooks() {
    return async function (dispatch) {
        try {
            const response = await axios(`${BACKEND_URL}/books/`);
            return dispatch({
                type: GET_ALL_BOOKS,
                payload: response.data,
            });
        } catch (error) { }
    };
}

export function postBook(payload) {
    return async function () {
        const postBook = await axios.post(`${BACKEND_URL}/books/create`, payload)
        return postBook;
    }
}

export function postReview(payload) {
    return async function (dispatch) {
        try {
            const postReview = await axios.post('http://localhost:3001/review/', payload);
            if (postReview.status === 201) {
                // console.log('Reseña insertada correctamente:', postReview.data);
            } else {
                console.error('La inserción falló:', postReview.status, postReview.statusText);
            }
            return postReview; // Devuelve la respuesta HTTP 
        } catch (error) {
            console.error('Error al insertar la reseña:', error);
            throw error; // Lanza el error para que se pueda capturar en el componente reviewForm
        }
    };
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
            const response = await axios(`${BACKEND_URL}/books`);
            const authors = response.data.map((book) => book.authors[0])
            let uniqueAuthors = [...new Set(authors)].sort();
            return dispatch({
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
            const response = await axios(`${BACKEND_URL}/books`);
            const publisher = response.data.map((book) => book.publisher)
            let uniquePublishers = [...new Set(publisher)].sort();
            return dispatch({
                type: GET_PUBLISHER,
                payload: uniquePublishers,
            })
        } catch (error) {
            console.error(error)
        }
    }
}


export function getTitles() {
    return async function (dispatch) {
        try {
            const response = await axios(`${BACKEND_URL}/books`);
            const titles = response.data.map((book) => book.title)
            let uniqueTitles = [...new Set(titles)].sort();
            return dispatch({
                type: GET_TITLES,
                payload: uniqueTitles,
            })
        } catch (error) {
            console.error(error)
        }
    }
}


export function getYear() {
    return async function (dispatch) {
        try {
            const response = await axios(`${BACKEND_URL}/books/publishedDate`);
            return dispatch({
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
            const response = await axios(`${BACKEND_URL}/books`);
            const genre = response.data.map((book) => book.genre)
            let uniqueGenres = [...new Set(genre)].sort();
            return dispatch({
                type: GET_GENRES,
                payload: uniqueGenres,
            })
        } catch (error) {
        }
    }
}


export function filter(filtraTodo) {
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
                `${BACKEND_URL}/books/filters?title=${name}`
            )
            const book = booksName.data
            dispatch({ type: SEARCH_BOOK, payload: book })
        }
    } catch (error) {
        window.alert("Error, Book doesn't exist")
    }
}


export const setError = (errorMessage) => ({
    type: SET_ERROR,
    payload: errorMessage,
})

export const getOrders = () => {
    try {
        return async function (dispatch) {
            const allOrders = await axios.get(
                `${BACKEND_URL}/orders`
            )
            const ordersBuy = allOrders.data
            dispatch({ type: BUY_ORDERS, payload: ordersBuy })
        }
    } catch (error) {
        console.error(error)
    }
}

export const getUsers = () => {
    try {
        return async (dispatch) => {
            const { data } = await axios.get(`${BACKEND_URL}/users`)
            dispatch({ type: GET_USERS, payload: data })
        }
    } catch (error) {
        console.error(error)
    }
}

export const deleteUser = (id) => {
    try {
        return async (dispatch) => {
            const { data } = axios.delete(`${BACKEND_URL}/users/${id}`)
            dispatch({ type: DELETE_USER, payload: data })
        }
    } catch (error) {
        console.error(error)
    }
}

export const reactivateUser = (id) => {
    try {
        return async (dispatch) => {
            const { data } = axios.put(`${BACKEND_URL}/users/${id}`)
            dispatch({ type: REACTIVATE_USER, payload: data })
        }
    } catch (error) {
        console.error(error)
    }
}

export const desactivateUser = (id) => {
    try {
        return async (dispatch) => {
            const { data } = axios.put(`${BACKEND_URL}/users/${id}`)
            dispatch({ type: DESACTIVATE_USER, payload: data })
        }
    } catch (error) {
        console.error(error)
    }
}