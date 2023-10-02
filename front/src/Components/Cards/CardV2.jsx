import React from 'react';
import EstrellasRating from '../StartRating/StartRating';
import { Link } from 'react-router-dom';

function CardV2({id,  title, authors, price, image }) {
    const rating = 4.5;

  return (
    <div
      title={`Click here to see more details of ${title}`}
      className="my-4 rounded shadow-lg dark:shadow-gray-900 bg-white dark:bg-gray-800 duration-300 hover:-translate-y-1"
    >
      <div className="mx-auto">
        <img src={image} alt={title} 
        //   className="w-full h-96 object-cover rounded-md"
        // className="w-60 mx-auto rounded-md object-cover"
        className="w-60 h-96 mx-auto mt-4 object-cover rounded-md"


          />
      </div>
      <figcaption className="p-4">
      <Link to={`/product-page/${id}`}>
      <p className="text-lg mb-2 font-bold leading-relaxed text-gray-800 dark:text-gray-300 transition-colors hover:text-orange-600 dark:hover:text-orange-600">
          {/* <p className="text-lg mb-2 font-bold leading-relaxed text-gray-800 dark:text-gray-300"> */}
            {title}</p>
        </Link>
        <EstrellasRating promedioCalificaciones={rating} />
<p className="text-sm mb-2 text-gray-500 dark:text-gray-400">{authors}</p>
        <p className="text-lg mb-4 font-bold text-gray-800 dark:text-gray-300">${price}</p>
      </figcaption>
    </div>
  );
}

export default CardV2;
