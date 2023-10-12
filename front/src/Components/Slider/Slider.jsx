import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

function Slider() {
  const carouselStyles = `
    /* Ajustar el ancho al 100% y la altura según tus necesidades */
    .carousel {
      width: 100%;
      max-height: 100%; /* Ajusta la altura según tus necesidades */
    }

    /* Ajustar la altura de las imágenes */
    .slide img {
      max-height: 600px; /* Ajusta la altura según tus necesidades */
      width: auto; /* Mantener la proporción de aspecto original */
      object-fit: cover; /* Opcional: ajustar cómo se ajustan las imágenes dentro del contenedor */
    }

    /* Ocultar las miniaturas */
    .thumbs-wrapper {
      display: none !important;
    }

    /* Ocultar el contador */
    .carousel-status {
      display: none !important;
    }
  `;
      useEffect(() => {
          Aos.init({duration: 1500})
        })             
      return (
        <>
        <style>{carouselStyles}
        </style>
        <Carousel>
        <div data-aos = 'fade-in'>
          <video className='h-full w-full'autoPlay muted loop >
          <source src="https://res.cloudinary.com/dhqudb28a/video/upload/v1697064350/STAYFY_PORTADA_wt4bou.mp4" alt="Image 1" />
          </video>
        </div>

        <div>
          <img
            src="https://www-cms.pipedriveassets.com/blog-assets/sales-books-3.png"
            alt="Image 2"
          />
        </div>
        <div>
          <img
            src="https://dhjhkxawhe8q4.cloudfront.net/notre-dame-university-press-wp/wp-content/uploads/2023/09/21150519/Book-Festival-Slider.jpg"
            alt="Image 3"
          />
        </div>
      </Carousel>
    </>
  );
}

export default Slider;
