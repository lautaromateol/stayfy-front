import { NavLink } from "react-router-dom";
//importar css

function Cards({ books }) {
    const { title, authors, price, image, id } = books;

    return (
        <div title={`Click here to see more details of ${title}`}>
            <NavLink to={`/product-page/${id}`}>
                <img src={books.image} alt='Book' />
                <div>
                    <h3>{books.title}</h3>
                    <h4>{books.authors}</h4>
                    <h5>{books.price}</h5>
                </div>
            </NavLink>
        </div>
    );
}

export default Cards;