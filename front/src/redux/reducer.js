import { GET_AUTHOR, GET_BOOKS, GET_GENDER, GET_PUBLISHER, GET_YEAR } from "./actions";


const initialState = {
  books: [],
  genres: [],
  authors: [],
  year: [],
  publishers: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return { ...state };
  }
};

export default reducer;