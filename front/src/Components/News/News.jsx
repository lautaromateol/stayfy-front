import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NewsList() {
  const [news, setNews] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: 'Books',
            from: '2023-09-30',
            sortBy: 'popularity',
            apiKey: '64a89628a5194fa4938a1258c98bc55b',
          },
        });
        
        setNews(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div>
      <h1>News</h1>
      <ul>
        {news.map((article, index) => (
          <li key={index}>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewsList;
