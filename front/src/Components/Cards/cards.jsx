
//importar css

function Cards({ title, authors, price, image, id  }) {

    return (
        <div title={`Click here to see more details of ${title}`}>
                <img src={image} alt={title} />
                <div>
                    <p>{title}</p>
                    <p>{authors}</p>
                    <p>{price}</p>
                </div>
        </div>
    );
}

export default Cards;