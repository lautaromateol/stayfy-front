import React from "react";
import house from './svg/house-solid.svg'
import phone from './svg/phone-solid.svg'
import envelope from './svg/envelope-regular.svg'
import linkedin from './svg/linkedin.svg'
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="bg-[#6A8A8E] p-4 items-center dark:bg-slate-0 dark:bg-slate-800">
        <div className="flex justify-center pt-10 pb-14 md:pb-9">
          
          <img
            className="w-2/5 md:w-[25%] lg:w-[18%] xl:w-[15%]"
            src="images/cucet-footer-logo.png"
            alt=""
            srcSet=""
          />
        </div>
        <div className="space-y-9 grid grid-cols-1 md:grid-cols-2 md:pl-24 md:pr-16 lg:grid-cols-4 lg:px-7 xl:px-14 xl:ml-16">
          <div className="text-neutral-200 font-[650] text-[16px] leading-7">
            <div className="flex justify-start md:mt-10">
              <h1 className="text-white pb-[36px] font-sans uppercase font-normal tracking-wider underline underline-offset-[12px] decoration-zinc-400 dark:decoration-sky-700">
                Our Te
              </h1>
              <span className="text-white font-sans uppercase font-normal tracking-wider">
                am
              </span>
            </div>
                <div className="flex hover:text-[#cacaca]">
                    <img src={linkedin} alt="linkedin svg" className="w-4 mr-2"/>
                    <a href="https://www.linkedin.com/in/juan-emilio-elizondo/">Juan Emilio Elizondo</a>
                </div>
                <div className="flex hover:text-[#cacaca]">
                    <img src={linkedin} alt="linkedin svg" className="w-4 mr-2"/>
                    <a href="https://www.linkedin.com/in/laradecillis/">Lara María De Cillis</a>
                </div>
                <div className="flex hover:text-[#cacaca]">
                    <img src={linkedin} alt="linkedin svg" className="w-4 mr-2"/>
                    <a href="https://www.linkedin.com/in/duglas-paez-089065107">Duglas Antonio Paez Cruz</a>
                </div>
                <div className="flex hover:text-[#cacaca]">
                    <img src={linkedin} alt="linkedin svg" className="w-4 mr-2"/>
                    <a href="https://www.linkedin.com/in/agustin-radocaj/">Jorge Agustín Radocaj</a>
                </div>
                <div className="flex hover:text-[#cacaca]">
                    <img src={linkedin} alt="linkedin svg" className="w-4 mr-2"/>
                    <a href="https://www.linkedin.com/in/lautaro-mateo-leguizamon-35b902279/">Lautaro Mateo Leguizamon</a>
                </div>
                <div className="flex hover:text-[#cacaca]">
                    <img src={linkedin} alt="linkedin svg" className="w-4 mr-2"/>
                    <a href="https://www.linkedin.com/in/daniel-ch%C3%A1vez-93065b181/">Daniel Esteban Chávez Sánchez</a>
                </div>
                <div className="flex hover:text-[#cacaca]">
                    <img src={linkedin} alt="linkedin svg" className="w-4 mr-2"/>
                    <a href="https://www.linkedin.com/in/jos%C3%A9-luis-far%C3%ADas-4a5816157/">José Luis Farias Izaguirre</a>
                </div>
                <div className="flex hover:text-[#cacaca]">
                    <img src={linkedin} alt="linkedin svg" className="w-4 mr-2"/>
                    <a href="https://www.linkedin.com/in/matias-helueni-255023197/">Matias Gaston Helueni</a>
                </div>
              
          </div>
          <div className="text-[#747474] text-[15px] font-[550] leading-7 tracking-wide md:">
            <div>
              <pre className="text-white pb-[34px] font-sans uppercase font-normal tracking-wider underline underline-offset-[12px]  decoration-zinc-400 dark:decoration-sky-700">
                
                links
              </pre>
            </div>
            <Link to='/review' className=" text-neutral-200 hover:text-[#cacaca]">Rate us!</Link> <br />
            <Link to='/store' className="text-neutral-200 hover:text-[#cacaca]">Store</Link> <br />
            <Link to='/' className="text-neutral-200 hover:text-[#cacaca]">Home</Link> <br />
          </div>
          <div className="md:flex flex-col justify-between">
            <div className="text-[#747474] text-[15px] font-[550] leading-7 tracking-wide">
              <div className="flex justify-start">
                <h1 className="text-white pb-[34px] font-sans uppercase font-normal tracking-wider underline underline-offset-[12px]  decoration-zinc-400 dark:decoration-sky-700">
                  About
                </h1>
                
              </div>
              <p className="">
                
                <a className="text-neutral-200 hover:text-[#cacaca]" href="#">
                  Need help?
                </a>
              </p>
              <p className="">
                
                <a className="text-neutral-200 hover:text-[#cacaca]" href="#">
                  Store
                </a>
              </p>
              <p className="">
                
                <a className="text-neutral-200 hover:text-[#cacaca]" href="#">
                  Stayfy
                </a>
              </p>
            </div>
            <div className="text-[#747474] text-[15px] font-[550] leading-6 tracking-wide mt-9 md:order-5 md:pt-32 lg:pb-28">
              <div className="flex justify-start md:-mt-32">
                <h1 className="text-white pb-[38px] font-sans uppercase font-normal tracking-wider underline underline-offset-[12px]  decoration-zinc-400 dark:decoration-sky-700">
                  suppor
                </h1>
                <span className="text-white font-sans uppercase font-normal tracking-wider">
                  t
                </span>
              </div>
              <p className="">
                
                <a href="#" className="text-neutral-200 hover:text-[#cacaca]">
                  FAQ's
                </a>
              </p>
            </div>
          </div>
          <div className="text-[#797878] text-[15px] font-[550] leading-6 tracking-wide md:order-4 lg:">
            <div className="flex justify-start">
              <h1 className="text-white pb-[38px] font-sans uppercase font-normal tracking-wider underline underline-offset-[12px]  decoration-zinc-400 dark:decoration-sky-700">
                get in t
              </h1>
              <span className="text-white font-sans uppercase font-normal tracking-wider">
                ouch
              </span>
            </div>
            <p className="space-x-3 flex">
              
              <img src={house} alt="miSvg" className="w-4" />
              <strong className="text-neutral-200 text-[15px] tracking-wide">
                Our Company
              </strong>
            </p>
            <div className="leading-7">
              <p className="text-neutral-200">
                
                NH-70 San Francisco-California, <br /> United States 
                <br /> General Helpline No:+11 111-1111-111
              </p>
            </div>
            <div className="leading-7 mt-4 text-[15px] font-[500]">
              <p className="space-x-3 hover:text-[#cacaca] flex">
                
                <img src={phone} alt="phone svg" className=" w-4"/>
                <p className="text-neutral-200"> 1800 1800 88800</p>
              </p>

              <p className="space-x-3 hover:text-[#cacaca] flex">
                <img src={envelope} alt="envelope svg" className="w-4"/>
                <p className="text-neutral-200">admin@example.com</p>
              </p>
            </div>
          </div>
        </div>
        <div className="divide-y divide-[#747474] contrast-200 mt-3 mb-3 md:-mt-4 md:-mb-2 lg:-mt-16 xl:-mt-24">
          <p>&nbsp;</p>
          <p>&nbsp;</p>
        </div>
        <div className="flex justify-center mb-4 md:mb-1 text-neutral-700 text-center text-xl space-x-3">
          <span>©</span><p className="text-md">2023 Stayfy Inc. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
