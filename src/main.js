// API SETTINGS
const API_URL = "https://api.themoviedb.org/3";
const URL_TRENDING_MOVIES = "/trending/movie/week?api_key=";
const URL_CATEGORIES = "/genre/movie/list?api_key="

// DOM
const trendingFilmsContainer = document.getElementById('trending-film-container');
const categoriesListContainer = document.getElementById('categories-list') 


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
            <div class="tarjeta swiper-slide">
            <img src=${"https://image.tmdb.org/t/p/w300"+ movie.poster_path} alt=${movie.title} class="img-film" width=100%>
            <h3 class="movie-title">${movie.title}</h3>
            <h3 class="movieDetail-score">${movie.vote_average}</h3></div>
            `
            
        })
        return movies
    }catch{
        throw new Error("Error at the API")
    }
}

async function getCategories(){
    try{
        const response = await fetchData(API_URL + URL_CATEGORIES + API_KEY + "&language=es");
        const categories = response.genres;
        categories.forEach(category =>{
            categoriesListContainer.innerHTML +=
            `
            <div class="category-container">
                <h3 id="id${category.id}" class="category-title">${category.name}</h3>
                </div>
            `
        })
        return response
    }catch{
        throw new Error("Error at the API")
    }
}
console.log(getCategories());

getTrendingMoviesPreview()
