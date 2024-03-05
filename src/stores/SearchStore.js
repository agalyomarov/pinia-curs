import { defineStore } from "pinia";
import { useMovieStore } from "./MovieStore";
import { ref } from "vue";
const url = "https:api.themoviedb.org/3/search/movie?api_key=02708c4929ad93aa5e68f8ee7bfa4445&query=";


// export const useSearchStore = defineStore("searchStore", {
//   state: () => ({
//     loader: false,
//     movies: [],
//     searchText: ""
//   }),
//   actions: {
//     async getMovies(search) {
//       this.loader = true;
//       const res = await fetch(`${url}${search}`);
//       const data = await res.json();
//       this.movies = data.results;
//       this.loader = false;
//       this.searchText = search;
//     },
//     addToUserMovies(movie) {
//       const moviesStore = useMovieStore();
//       moviesStore.movies.push({ ...movie, isWatched: false });
//       moviesStore.setActiveTab(1);
//     }
//   },
// });


export const useSearchStore = defineStore("searchStore", () => {
  const loader = ref(false);
  const movies = ref([]);
  const searchText = ref("");

  const getMovies = async (search) => {
    loader.value = true;
    const res = await fetch(`${url}${search}`);
    const data = await res.json();
    movies.value = data.results;
    loader.value = false;
    searchText.value = search;
  }

  const addToUserMovies = (movie) => {
    const moviesStore = useMovieStore();
    moviesStore.movies.push({ ...movie, isWatched: false });
    moviesStore.setActiveTab(1);
  }

  return {
    loader,
    movies,
    searchText,
    getMovies,
    addToUserMovies,
  }
})