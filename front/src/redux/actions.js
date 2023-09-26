import axios from "axios";

export const GET_BOOKS = "GET_BOOKS";
export const ORDER = "ORDER";
export const GET_AUTHOR = "GET_AUTHOR";
export const GET_GENDER = "GET_GENDER";
export const GET_YEAR = "GET_YEAR";
export const GET_PUBLISHER = "GET_PUBLISHER";
export const FILTER = "FILTER";
export const RESET = "RESET";
export const SEARCH_BOOK = "SEARCH_BOOK";
export const SET_ERROR = "SET ERROR";

export function getBooks() {
    return async function (dispatch) {
        try {
            const response = await axios("LINK"); //LINK
            return dispatch({
                type: "GET_BOOKS",
                payload: response.data,
            });
        } catch (error) {}
    };
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
            const response = await axios (""); //LINK
            return dispatch({
                type: GET_AUTHOR,
                payload: response.data,
            });
        } catch (error) {

        }
    };
}

export function getGender() {
    return async function (dispatch) {
        try {
            const response = await axios (""); //LINK
            return dispatch ({
                type: GET_GENDER,
                payload: response.data,
            })
        } catch (error) {

        }
    }
}

export function getYear() {
    return async function (dispatch) {
        try {
            const response = await axios (""); //LINK
            return dispatch ({
                type: GET_YEAR,
                payload: response.data,
            })
        } catch (error) {

        }
    }
}

export function getPublisher() {
    return async function (dispatch) {
        try {
            const response = await axios (""); //LINK
            return dispatch ({
                type: GET_PUBLISHER,
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