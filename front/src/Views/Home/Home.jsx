import Slider from "../../Components/Slider/Slider"
import OurTeam from "../../Components/ourTeam/ourTeam"
import Buttons from "../../Components/Buttons/Buttons"


// import Paginado from "../../Components/Paginado/paginado"
// import Nav from "../../Components/Nav/Nav"

const Home = ()=>{

    return (
        <div className="bg-gray-200 dark:bg-gray-900 h-full">
            <Slider />
            <div>
            <Buttons />
            <OurTeam/>
            </div>
        </div>
    )
}
export default Home