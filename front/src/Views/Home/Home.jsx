import Slider from "../../Components/Slider/Slider"
import Buttons from "../../Components/Buttons/Buttons"
import CarruselHome from "../../Components/CarruselHome/CarruselHome"
import NewestBooks from "../../Components/CarruselHome/NewestBooks"
import { useEffect } from "react"


const Home = ()=>{

    const lastTab = localStorage.getItem('lastTab')

    useEffect(()=> {
        if(lastTab){
            localStorage.removeItem('lastTab')
            localStorage.setItem('lastTab', window.location.href)
        }
    }, [])

    return (
        <div className="bg-gray-200 dark:bg-gray-900 min-h-screen">
            <Slider />
            <Buttons />
            <CarruselHome/>
            <NewestBooks/>
        </div>
    )
}
export default Home