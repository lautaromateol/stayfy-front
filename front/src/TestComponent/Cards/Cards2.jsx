import Card2 from './Singular/Card2';
import styles from './Cards2.module.css';
import React from 'react';
import { useSelector } from 'react-redux';

export default function Cards2({books}) { 
  const { getByName, isLoading } = useSelector((state) => state); 

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <img
          className={styles.loading}
          src={
            'https://mir-s3-cdn-cf.behance.net/project_modules/fs/b6e0b072897469.5bf6e79950d23.gif'
          }
          alt={'Loading screen'}
        />
      </div>
    );
  };

  if (getByName.length > 0){
    return (
      <div className={styles.container}>
        {getByName.map((book) => (
          <Card2
            key={book.id}
            id={book.id}
            title={book.title}
            image={book.image}
            genre={book.genre}
            price={book.price}
          />
        ))}
      </div>
    );
  }else{
      return (
    <div className={styles.container}>
        {books.map((book) => (
          <Card2
            key={book.id}
            id={book.id}
            title={book.title}
            image={book.image}
            genre={book.genre}
            price={book.price}
          />
        ))}
    </div>
  );
  };
};