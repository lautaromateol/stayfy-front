import { useEffect } from "react"
import {useDispatch} from "react-redux"
import CardList from "../../Components/CardList/CardList"
import { getBooks } from "../../redux/actions"
// import Nav from "../../Components/Nav/Nav"

const Home = ()=>{

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getBooks())
    }, [])

    return (
        <div className="bg-blue-100">
            <h1>Home</h1>
            <div>
            <CardList />
            </div>
        </div>
    )
}
export default Home