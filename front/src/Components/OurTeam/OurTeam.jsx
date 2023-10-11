import React, { useEffect } from "react";
import juaneImg from './img/juane.jpg'
import laraImg from './img/lara.png'
import matiImg from './img/mati.jpeg'
import joseLuisImg from './img/joseLuis.jpeg'
import danielImg from './img/daniel.jpg'
import agusImg from './img/agustin.png'
import L from './img/L.svg'
import D from './img/D.png'
import Aos from 'aos'
import 'aos/dist/aos.css'

const OurTeam = () => {

  useEffect(() => {
    Aos.init({duration:1500})
  }, [])

  return (
    <div className="mt-16 pb-16" data-aos = 'fade-up'>
      <div className="flex items-center justify-center text-center ">
        <div className="flex flex-col p-10 m-2 ">
          <div className="text-3xl font-medium ">Meet Our Team</div>
          <div className="text-sm mx-2 md:text-xl ">
            Meet the team member who have worked in this project
          </div>

          <div className="md:grid flex">
            <div className="flex items-center justify-center md:flex-row flex-col space-x-4  p-2">
              <div className="flex-col px-6 py-2  max-w-7xl">
                <div className="md:h-40 h-28 w-28 md:w-40 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={juaneImg}
                    alt=""
                    className=""
                  />
                </div>

                <div className="text-lg font-medium text-stone-700 cursor-pointer hover:text-stone-900">
                    Juan Emilio Elizondo
                </div>
                <div className=" italic text-gray-500">FrontEnd</div>
              </div>
              <div className="flex-col px-6 py-2 ">
                <div className="md:h-40 h-28 w-28 md:w-40 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={laraImg}
                    alt=""
                    className=""
                  />
                </div>

                <div className="text-lg font-medium text-stone-700 cursor-pointer hover:text-stone-900">
                    Lara María De Cillis
                </div>
                <div className=" italic text-gray-500">FrontEnd</div>
              </div>
              <div className="flex-col px-6 py-2 ">
                <div className="md:h-40 h-28 w-28 md:w-40 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={matiImg}
                    alt=""
                    className=""
                  />
                </div>

                <div className="text-lg font-medium text-stone-700 cursor-pointer hover:text-stone-900">
                    Matias Helueni
                </div>
                <div className=" italic text-gray-500">FrontEnd</div>
              </div>
              <div className="flex-col px-6 py-2 ">
                <div className="md:h-40 h-28 w-28 md:w-40 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={L}
                    alt=""
                    className=""
                  />
                </div>

                <div className="text-lg font-medium text-stone-700 cursor-pointer hover:text-stone-900">
                    Lautaro Leguizamon
                </div>
                <div className=" italic text-gray-500">FrontEnd</div>
              </div>
            </div>
            <div className="flex space-x-4  p-2 items-center justify-center md:flex-row flex-col ">
              <div className="flex-col px-6 py-2 ">
                <div className="md:h-40 h-28 w-28 md:w-40 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={agusImg}
                    alt="imagen de agustin"
                    className=""
                  />
                </div>

                <div className="text-lg font-medium text-stone-700 cursor-pointer hover:text-stone-900">
                    Agustín Radocaj
                </div>
                <div className=" italic text-gray-500">BackEnd</div>
              </div>
              <div className="flex-col px-6 py-2 ">
                <div className="md:h-40 h-28 w-28 md:w-40 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={danielImg}
                    alt="imagen de daniel"
                    className=""
                  />
                </div>

                <div className="text-lg font-medium text-stone-700 cursor-pointer hover:text-stone-900">
                    Daniel Chávez
                </div>
                <div className=" italic text-gray-500">BackEnd</div>
              </div>
              <div className="flex-col px-6 py-2 ">
                <div className="md:h-40 h-28 w-28 md:w-40 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={joseLuisImg}
                    alt=""
                    className=""
                  />
                </div>

                <div className="text-lg font-medium text-stone-700 cursor-pointer hover:text-stone-900">
                    José Luis Farias
                </div>
                <div className=" italic text-gray-500">BackEnd</div>
              </div>
              <div className="flex-col px-6 py-2 ">
                <div className="md:h-40 h-28 w-28 md:w-40 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={D}
                    alt=""
                    className=""
                  />
                </div>

                <div className="text-lg font-medium text-stone-700 cursor-pointer hover:text-stone-900">
                    Duglas Antonio Paez
                </div>
                <div className=" italic text-gray-500">BackEnd</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <script src="https://cdn.tailwindcss.com"></script>
      <script src="https://use.fontawesome.com/03f8a0ebd4.js"></script>
      <script
        type="module"
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
      ></script>
      <script
        noModule
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
      ></script>
    </div>
  );
};

export default OurTeam;
