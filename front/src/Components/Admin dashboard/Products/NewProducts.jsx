import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "../../../redux/actions";

const NewProducts = () => {
  const dispatch = useDispatch();
  const allBooks = useSelector((state) => state.allBooks);

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

  const data = allBooks.map((book, index) => ({
    key: index,
    image: book.image,
    genre: book.genre,
    title: book.title,
    price: book.price,
  }));

  const uniqueGenres = [...new Set(allBooks.map((book) => book.genre))];

  const genres = uniqueGenres.map((genre) => ({
    text: genre,
    value: genre,
  }));

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="book cover" style={{ width: "50px" }} />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
      filters: genres,
      onFilter: (value, record) => record.genre.indexOf(value) === 0,
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: () => <a>action</a>,
    },
  ];

  return (
    <div>
    <h1 className="text-center text-3xl mt-5">Books admin-dashboard</h1>
    <Table
      columns={columns}
      dataSource={data}
      scroll={{
        x: 1500,
        y: 700,
      }}
      />
      </div>
  );
};

export default NewProducts;

