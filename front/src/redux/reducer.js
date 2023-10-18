// import { GET_AUTHOR, GET_BOOKS, GET_GENDER, GET_PUBLISHER, GET_YEAR, POST_BOOK } from "./actions";
import { GET_FILTERED_BOOKS, SET_LOADING_FALSE, SET_LOADING_TRUE, GET_AUTHOR, GET_GENDER, GET_PUBLISHER, GET_YEAR, POST_BOOK, GET_GENRES, GET_BY_NAME, BUY_ORDERS, GET_USERS, REACTIVATE_USER, DESACTIVATE_USER, GET_TITLES, GET_ALL_BOOKS, MAKE_ADMIN, DEACTIVATE_ADMIN } from "./types";

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
  orders: [],
  users: [],
  titles: [],
  allBooks: [],
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
        books: action.payload.foundBooks,
        totalPages: action.payload.totalPages,
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
    case GET_ALL_BOOKS:
      return {
        ...state,
        allBooks: action.payload,
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
    case GET_TITLES:
      return {
        ...state,
        titles: action.payload,
      };
    case POST_BOOK:
      return {
        ...state
      }
    case BUY_ORDERS:
      return {
        ...state,
        orders: action.payload
      }
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      }
    case REACTIVATE_USER:
      return {
        ...state,
        users: action.payload
      }
    case DESACTIVATE_USER:
      return {
        ...state,
        users: action.payload
      }
    case MAKE_ADMIN:
      return {
        ...state,
        users: action.payload
      }
    case DEACTIVATE_ADMIN:
      return {
        ...state,
        users: action.payload
      }
    default:
      return { ...state };
  }
};

export default reducer;