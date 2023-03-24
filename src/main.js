// API SETTINGS
const API_URL = "https://api.themoviedb.org/3";
const URL_TRENDING_MOVIES = "/trending/movie/week?api_key=";

// DOM
const trendingFilmsContainer = document.getElementById('trending-film-container');


async function fetchData(url){
    const response = await fetch(url);
    const data = response.json();
    return data;
}

async function getTrendingMoviesPreview(){
    try{
        const response = await fetchData(API_URL + URL_TRENDING_MOVIES + API_KEY);
        const movies = response.results;
        movies.forEach(movie=>{
            trendingFilmsContainer.innerHTML += 
            `
            <div class="tarjeta">
            <img src=${"https://image.tmdb.org/t/p/w300"+movie.backdrop_path} alt=${movie.title} class="img-film">
            <h3 class="movie-title">${movie.title}</h3>
            <h3 class="movieDetail-score">${movie.vote_average}</h3></div>
            
            `
            
        })
        return movies
    }catch{
        throw new Error("Error at the API")
    }
}    

console.log(getTrendingMoviesPreview());