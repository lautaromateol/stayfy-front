import CardList from "../../Components/CardList/cardList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBooks } from "../../redux/actions";
import SearchBar from "../../Components/SearchBar/SearchBar";

const BooksView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, []);

  return (
    <div>
        <div>
            <SearchBar />
        </div>
      <div>
        <CardList />
      </div>
    </div>
  );
};

export default BooksView;
