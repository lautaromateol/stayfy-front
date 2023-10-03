import { useEffect, useState } from "react"
import {useDispatch} from "react-redux"
import { getFilteredBooks } from "../../redux/actions"

const SearchBar = ()=>{
    const [bookName, setBookName] = useState("")
    const [aux, setAux] = useState(false)
    const dispatch = useDispatch()

    // const changeHandler = (e) =>{
    //     setBookName(e.target.value)
    // }

    // const onSearch = ()=>{
    //     dispatch(getFilteredBooks( {title: bookName} ))
    // }

    useEffect(() => {
        bookName && dispatch(getFilteredBooks({title: bookName}));
      }, [aux]);


    return (
        <div>
            <input type="search" value={bookName} onChange={(e)=>setBookName(e.target.value)}></input>
            <button onClick={()=>setAux(!aux)}>Search</button>
        </div>
    )
}

export default SearchBar