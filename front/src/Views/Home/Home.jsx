import { useEffect } from "react"
import {useDispatch} from "react-redux"
import CardList from "../../Components/CardList/cardList"
import { getBooks } from "../../redux/actions"
import Slider from "../../Components/Slider/Slider"

// import Nav from "../../Components/Nav/Nav"

const Home = ()=>{

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getBooks())
    }, [])

    return (
        <div className="bg-stone-400">
            <Slider />
            {/* <img src="https://banner2.cleanpng.com/20180316/chq/kisspng-book-free-content-clip-art-office-books-cliparts-5aab4c121e0864.187068161521175570123.jpg" /> */}
            <div>
            <CardList />
            </div>
        </div>
    )
}
export default Home