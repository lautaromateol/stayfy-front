import axios from "axios"
import { GET_BOOKS } from "./action-types"

export const getBooks = () => {
    return async function(dispatch){
        const response = await axios('http://localhost:3001/books')
    }
}