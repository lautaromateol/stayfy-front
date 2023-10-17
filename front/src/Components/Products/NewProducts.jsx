import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredBooks } from "../../redux/actions";


const NewProducts = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

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
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: () => <a>action</a>,
      },
  ];

  const data = books.map((book, index) => ({
    key: index,
    image: book.image,
    title: book.title,
    price: book.price,
  }));

  return (
    <Table
      columns={columns}
      dataSource={data}
      scroll={{
        x: 1500,
        y: 300,
      }}
    />
  );
};

export default NewProducts;
