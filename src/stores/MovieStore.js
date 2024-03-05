import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

// export const useMovieStore = defineStore("moviesStore", {
//    state: () => ({
//       movies: [],
//       activeTab: 1,
//    }),
//    getters: {
//       watched() {
//          return this.movies.filter(m => m.isWatched);
//       },
//       totalCount() {
//          return this.movies.length;
//       },
//    },
//    actions: {
//       setActiveTab(id) {
//          this.activeTab = id;
//       },
//       toggleWatched(id) {
//          const idm = this.movies.findIndex((m) => m.id === id);
//          this.movies[idm].isWatched = !this.movies[idm].isWatched;
//       },
//       deleteMovie(id) {
//          this.movies = this.movies.filter((m) => m.id !== id);
//       },
//    },
// });


export const useMovieStore = defineStore("moviesStore", () => {
   const movies = ref([]);
   const activeTab = ref(1);
   const moviesInLocalStorage = localStorage.getItem("movies");
   if (moviesInLocalStorage) {
      movies.value = JSON.parse(moviesInLocalStorage);
   }
   const watched = computed(() => movies.value.filter(m => m.isWatched));

   const totalCount = computed(() => movies.value.length);

   const setActiveTab = (id) => activeTab.value = id;

   const toggleWatched = (id) => {
      const idm = movies.value.findIndex((m) => m.id === id);
      movies.value[idm].isWatched = !movies.value[idm].isWatched;
   }
   const deleteMovie = (id) => movies.value = movies.value.filter((m) => m.id !== id);

   watch(movies, (state) => {
      localStorage.setItem('movies', JSON.stringify(state));
   }, { deep: true })


   return {
      movies,
      watched,
      activeTab,
      totalCount,
      setActiveTab,
      toggleWatched,
      deleteMovie,
   }
})