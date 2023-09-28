import { NavLink } from "react-router-dom";
//importar css

function Cards({ book }) {
    const { title, authors, price, image, id } = book;

    return (
        <div title={`Click here to see more details of ${title}`}>
            <NavLink to={`/product-page/${id}`}>
                <img src={image} alt='Book' />
                <div>
                    <h3>{title}</h3>
                    <h4>{authors}</h4>
                    <h5>{price}</h5>
                </div>
            </NavLink>
        </div>
    );
}

export default Cards;