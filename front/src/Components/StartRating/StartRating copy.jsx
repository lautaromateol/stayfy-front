const StarRating = ({ promedioCalificaciones }) => {
    const estrellasLlenas = Math.floor(promedioCalificaciones);
    const tieneMediaEstrella = promedioCalificaciones % 1 !== 0;
    const estrellaClase = 'w-6 h-6 fill-current text-yellow-500';

    return (
        <div className="estrellas-rating flex items-center">
            {[...Array(estrellasLlenas)].map((_, index) => (
                <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    className={estrellaClase} // <-- La variable estrellaClase está corregida
                    viewBox="0 0 24 24"
                >
                    {/* El contenido del ícono de estrella lleno */}
                </svg>
            ))}
            {tieneMediaEstrella && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={estrellaClase} // <-- La variable estrellaClase está corregida
                    viewBox="0 0 24 24"
                >
                    {/* El contenido del ícono de media estrella */}
                </svg>
            )}
            <span className="ml-2">{promedioCalificaciones.toFixed(1)}</span>
        </div>
    );
};

export default StarRating;
