import { useState } from "react"
import {useDispatch} from "react-redux"
import { searchBook } from "../../redux/actions"

const SearchBar = ()=>{
    const [bookName, setBookName] = useState("")
    const dispatch = useDispatch()

    const changeHandler = (e) =>{
        setBookName(e.target.value)
    }

    const onSearch = ()=>{
        dispatch(searchBook(bookName))
    }

    return (
        <div>
            <input type="search" value={bookName} onChange={changeHandler}></input>
            <button onClick={()=>{onSearch()}}>Search</button>
        </div>
    )
}

export default SearchBar