import axios from 'axios';

export const BACKEND_URL = 'http://localhost:3001';
export const DESC = 'DESC';
export const ASC = 'ASC';


export const getGenresList = async (setGenresList) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/genres`);
      const genres = response.data.map(( genre ) => genre);
    // const genres = ["Self-help", "Horror", "Sci-Fi", "Mystery & Detective", "Comedy", "Romance"];
      setGenresList(['Select genre', ...genres.sort()]);
    } catch (error) {
      console.log(error);
    }
  };