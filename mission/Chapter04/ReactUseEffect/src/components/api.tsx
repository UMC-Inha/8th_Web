import axios from "axios";

const TOKEN = `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`;

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: TOKEN,
  },
});
