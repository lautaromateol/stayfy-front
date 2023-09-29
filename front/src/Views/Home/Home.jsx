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
        <div>
            <h1>Home</h1>
            <img src="https://banner2.cleanpng.com/20180316/chq/kisspng-book-free-content-clip-art-office-books-cliparts-5aab4c121e0864.187068161521175570123.jpg" />
            <div>
            <CardList />
            </div>
        </div>
    )
}
export default Home