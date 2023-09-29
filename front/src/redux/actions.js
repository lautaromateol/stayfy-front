import axios from "axios";
import { BACKEND_URL } from "../../utils";
import { GET_FILTERED_BOOKS, GET_GENDER, SET_LOADING_FALSE, SET_LOADING_TRUE } from "./types";

// export const GET_BOOKS = "GET_BOOKS";
// export const GET_FILTERED_BOOKS = "GET_BOOKS";  // nuevo para filtros
// export const ORDER = "ORDER";
// export const GET_AUTHOR = "GET_AUTHOR";
// export const GET_PUBLISHER = "GET_PUBLISHER";
// export const GET_YEAR = "GET_YEAR";
// export const GET_GENDER = "GET_GENDER";
// export const FILTER = "FILTER";
// export const RESET = "RESET";
// export const SEARCH_BOOK = "SEARCH_BOOK";
// export const SET_ERROR = "SET ERROR";
// export const POST_BOOK = "POST_BOOK"
// export const SET_LOADING_TRUE = "SET_LOADING_TRUE"; // nuevo
// export const SET_LOADING_FALSE = "SET_LOADING_FALSE"; // nuevo


export function getFilteredBooks() {    // nuevo para filtros
    const { sort, page, genre, title, publishedDate } = args || {};
    return async (dispatch) => {
      try {
        dispatch({ type: SET_LOADING_TRUE });
        const response = await axios.get(`${BACKEND_URL}/drivers`, {
          params: {
            sort,
            page,
            genre,
            title,
            publishedDate,
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
            const response = await axios("http://localhost:5432/title");
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


export function getAuthor() {
    return async function (dispatch) {
        try {
            const response = await axios ("http://localhost:5432/authors");
            return dispatch({
                type: GET_AUTHOR,
                payload: response.data,
            });
        } catch (error) {

        }
    };
}


export function getPublisher() {
    return async function (dispatch) {
        try {
            const response = await axios ("http://localhost:5432/publisher");
            return dispatch ({
                type: GET_PUBLISHER,
                payload: response.data,
            })
        } catch (error) {

        }
    }
}


export function getYear() {
    return async function (dispatch) {
        try {
            const response = await axios ("http://localhost:5432/publishedDate");
            return dispatch ({
                type: GET_YEAR,
                payload: response.data,
            })
        } catch (error) {

        }
    }
}


export function getGender() {
    return async function (dispatch) {
        try {
            const response = await axios ("http://localhost:5432/gender"); 
            return dispatch ({
                type: GET_GENDER,
                payload: response.data,
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
    return {
        type: SEARCH_BOOK,
        payload: name
    }
}


export const setError = (errorMessage) => ({
    type: SET_ERROR,
    payload: errorMessage,
})

