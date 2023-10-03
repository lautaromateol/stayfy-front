// import { GET_AUTHOR, GET_BOOKS, GET_GENDER, GET_PUBLISHER, GET_YEAR, POST_BOOK } from "./actions";
import { GET_FILTERED_BOOKS, SET_LOADING_FALSE, SET_LOADING_TRUE, GET_AUTHOR, GET_BOOKS, GET_GENDER, GET_PUBLISHER, GET_YEAR, POST_BOOK, GET_GENRES, GET_BY_NAME } from "./types";

const initialState = {
  books: [],
  filteredBooks: [],   // nuevo por filtros
  genres: [],
  authors: [],
  year: [],
  publishers: [],
  getByName: [], // nuevo por filtros
  isLoading: false, // nuevo por filtros
  totalPages: 0, // nuevo por filtros
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_TRUE:  // nuevo por filtros
      return {
        ...state,
        isLoading: true,
      };
    case SET_LOADING_FALSE: // nuevo por filtros
      return {
        ...state,
        isLoading: false,
      };
    case GET_FILTERED_BOOKS: // nuevo por filtros
      return {
        ...state,
        books: action.payload.foundBooks
            };
    case GET_GENRES: // nuevo por filtros
      return {
        ...state,
        genres: action.payload,
      };
    case GET_BY_NAME:  // nuevo por filtros
      return {
        ...state,
        getByName: action.payload,
        totalPages: action.payload.totalPages,
      };
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload,
      };
    case GET_GENDER:
      return {
        ...state,
        genres: action.payload,
      };
      case GET_AUTHOR:
      return {
        ...state,
        authors: action.payload,
      };
      case GET_YEAR:
      return {
        ...state,
        year: action.payload,
      };
      case GET_PUBLISHER:
      return {
        ...state,
        publishers: action.payload,
      };
      case POST_BOOK:
        return {
          ...state
        }
    default:
      return { ...state };
  }
};

export default reducer;