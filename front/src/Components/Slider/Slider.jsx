
    import { Carousel } from 'react-responsive-carousel';
    import 'react-responsive-carousel/lib/styles/carousel.min.css';
    
    function Slider() {
  const carouselStyles = `
    /* Ajustar el ancho al 100% y la altura según tus necesidades */
    .carousel {
      width: 100%;
      max-height: 400px; /* Ajusta la altura según tus necesidades */
    }

    /* Ajustar la altura de las imágenes */
    .slide img {
      max-height: 400px; /* Ajusta la altura según tus necesidades */
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
                    
      return (
        <>
        <style>{carouselStyles}</style>
        <Carousel>
        <div>
          <img src="https://res.cloudinary.com/dhqudb28a/image/upload/v1696141761/Blue_Modern_Furniture_Mega_Sale_Blog_Banner_fyydhz.png" alt="Image 1" />
        </div>
        <div>
          <img src="https://static.wingify.com/gcp/uploads/sites/3/2013/08/OG-image_How-to-Use-Image-Carousels-the-Right-Way.png" alt="Image 2" />
        </div>
        <div>
          <img src="https://static.wingify.com/gcp/uploads/sites/3/2013/08/OG-image_How-to-Use-Image-Carousels-the-Right-Way.png" alt="Image 3" />
        </div>
        </Carousel>
      </>
        );
    }
    
    export default Slider;
    
