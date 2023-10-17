import { useEffect, useState } from "react";
import axios from 'axios'

const Address = ()=>{

    const [countries, setCountries] = useState([])

    const preferenceId = localStorage.getItem('preferenceId')

    const [data, setData] = useState({
        address: '',
        complementaryAdress: '',
        city: '',
        country: '',
        postcode: '',
        phone: ''
    })

    const handleChange = (e)=>{
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        e.target.reset()
        localStorage.setItem('shippingInfo', JSON.stringify(data))
        window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?preference-id=${preferenceId}`
    }

    useEffect(()=> {
        try {
            axios.get('https://restcountries.com/v3.1/all')
            .then(({data}) => {
                setCountries(data.map((country)=> {
                    return(
                        country.name.common
                    )
                }))
            })
        } catch (error) {
            console.error
        }
    }, [])

    return(

        <div className="flex bg-[#A4BCB3] dark:bg-[#111827] h-auto justify-center align-center">
            <form className="bg-white dark:bg-[#E7E5E4] rounded-md px-[70px]" onSubmit={handleSubmit}>
            <h1 className="font-semibold text-xl md:text-2xl text-gray-600 mt-10">Shipping Info </h1>
                <h2 className="mt-5 text-lg text-gray-500 text-semibold">Address: </h2>
                <input onChange={handleChange} required name="address" value={data.address} type="text"></input>
                <h2 className="mt-5 text-lg text-gray-500 text-semibold">Complementary Address: </h2>
                <input onChange={handleChange} name="complementaryAdress" value={data.complementaryAdress} type="text" />
                <h2 className="mt-5 text-lg text-gray-500 text-semibold">Postcode/ZIP: </h2>
                <input onChange={handleChange} required name="postcode" value={data.postcode} type="number" />
                <h2 className="mt-5 text-lg text-gray-500 text-semibold">City: </h2> 
                <input onChange={handleChange} required name="city" value={data.city}  type="text" />
                <h2 className="mt-5 text-lg text-gray-500 text-semibold">Country: </h2>
                <select onClick={handleChange} required name="country" className="w-[240px] text-gray-500 text-semibold">
                <option hidden>Select your country</option>
                    {countries?.map((country)=> {
                        return(
                            <option>{country}</option>
                        )
                    })}
                </select>
                <h2 className="mt-5 text-lg text-gray-500 text-semibold">Phone: </h2>
                <input onChange={handleChange} required value={data.phone} name="phone" type="number" />
                <button className="block mx-auto bg-green-500 p-2 m-5 text-white" type="submit">SUBMIT</button>
            </form>
        </div>
    
    )
}

export default Address;

