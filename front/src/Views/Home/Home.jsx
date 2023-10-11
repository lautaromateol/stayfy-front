import Slider from "../../Components/Slider/Slider"
import OurTeam from "../../Components/ourTeam/ourTeam"


// import Paginado from "../../Components/Paginado/paginado"
// import Nav from "../../Components/Nav/Nav"

const Home = ()=>{

    return (
        <div className="bg-stone-400 dark:bg-gray-900 h-full">
            <Slider />
            {/* <img src="https://banner2.cleanpng.com/20180316/chq/kisspng-book-free-content-clip-art-office-books-cliparts-5aab4c121e0864.187068161521175570123.jpg" /> */}
            <div>
            <OurTeam/>
            </div>
        </div>
    )
}
export default Home