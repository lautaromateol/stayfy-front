import { Link } from "react-router-dom";
//importar css

function Cards({ title, authors, price, image, id  }) {

    return (
        <div>
            <Link to={`/product-page/${id}`}>
                <div title={`Click here to see more details of "${title}"`} className="bg-gray-200 flex flex-col my-28 mx-32 shadow-2xl rounded-lg pt-6 cursor-pointer transition-transform transform hover:scale-105">
                        <div className="mx-auto">
                            <img src={image} alt={title} className="w-60 h-80 rounded-md"/>
                        </div>
                        <div className="flex flex-col justify-between px-5 py-7 h-full">
                            <p className="font-bold text-md">{title}</p>
                            <p className="text-sm">{authors}</p>
                            <div className="flex justify-end">
                                <p className="font-bold text-green-500">${price}</p>   
                            </div>
                        </div>
                </div>
            </Link>
        </div>
    );
}

export default Cards;