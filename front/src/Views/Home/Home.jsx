import Slider from "../../Components/Slider/Slider"
import OurTeam from "../../Components/ourTeam/ourTeam"
import Buttons from "../../Components/Buttons/Buttons"
import { useEffect } from "react"


// import Paginado from "../../Components/Paginado/paginado"
// import Nav from "../../Components/Nav/Nav"

const Home = ()=>{

    const lastTab = localStorage.getItem('lastTab')

    useEffect(()=> {
        if(lastTab){
            localStorage.removeItem('lastTab')
            localStorage.setItem('lastTab', window.location.href)
        }
    }, [])

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