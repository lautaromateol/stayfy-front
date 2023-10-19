import React from 'react';
import Slider from 'react-slick';
import CardV2 from './CardV2'; // Asegúrate de ajustar la ruta si es necesario

const booksData = [
  // Aquí debes tener los datos de los 12 libros mejor rankeados
  // Puedes usar la misma estructura que proporcionaste en la pregunta
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4
};

const BookCarousel = () => {
  return (
    <Slider {...settings}>
      {booksData.map((book, index) => (
        <div key={index}>
          <CardV2
            id={index} // Asegúrate de proporcionar un identificador único para cada libro
            title={book.title}
            authors={book.authors}
            price={book.price}
            image={book.image}
            // rating={/* Aquí debes pasar la calificación del libro si está disponible en los datos */}
          />
        </div>
      ))}
    </Slider>
  );
};

export default BookCarousel;
