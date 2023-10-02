import React, { useState } from 'react';
import styles from './SearchBar2.module.css';

export default function SearchBar2({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search book..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className={styles.button}
        onClick={() => handleSearch(searchTerm)}
      >
        <strong>Search Book</strong>
      </button>
    </div>
  );
}