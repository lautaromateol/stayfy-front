const StartRating = ({ promedioCalificaciones }) => {
    const estrellasLlenas = Math.floor(promedioCalificaciones);
    const tieneMediaEstrella = promedioCalificaciones % 1 !== 0;
    const estrellaClase = 'w-6 h-6 fill-current text-yellow-500';

    return (
        <div className="estrellas-rating flex items-center">
            {[...Array(estrellasLlenas)].map((_, index) => (
                <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    className={estrellaClase}
                    viewBox="0 0 24 24"
                >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 2c-.2 0-.4.08-.55.23L9 5.75 3.56 6.3a1 1 0 0 0-.55 1.7l3.3 3.2-.78 4.58a1 1 0 0 0 1.45 1.05L12 15.1l4.1 2.15a1 1 0 0 0 1.45-1.05l-.78-4.59 3.3-3.21a1 1 0 0 0-.55-1.7L15 5.75l-1.45-3.02a1 1 0 0 0-.55-.23zM12 13.4l-3.65 1.92.7-4.13-2.95-2.86 4.1-.6L12 3.74l1.8 3.87 4.1.6-2.95 2.86.7 4.12L12 13.4z" />
                </svg>
            ))}
            {tieneMediaEstrella && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={estrellaClase}
                    viewBox="0 0 24 24"
                >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 2c-.2 0-.4.08-.55.23L9 5.75 3.56 6.3a1 1 0 0 0-.55 1.7l3.3 3.2-.78 4.58a1 1 0 0 0 1.45 1.05L12 15.1V2zm0 18a1 1 0 0 0 1-1V15h4.9a1 1 0 0 0 .98-.8l.62-3.64 3.17-3.08a1 1 0 0 0-.55-1.7L15 5.75 12.81 2.35a1 1 0 0 0-1.62 0L9 5.75 3.56 6.3a1 1 0 0 0-.55 1.7l3.17 3.08-.62 3.63a1 1 0 0 0 .98 1.2H12v4a1 1 0 0 0 1 1z" />
                </svg>
            )}
            <span className="ml-2">{promedioCalificaciones.toFixed(1)}</span>
        </div>
    );
};

export default StartRating;
