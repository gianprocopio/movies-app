// API SETTINGS
const API_URL = "https://api.themoviedb.org/3/";
const URL_TRENDING_MOVIES = "trending/movie/week";
const URL_CATEGORIES = "genre/movie/list";
const URL_MOVIE_BY_GENRE = "discover/movie";
const URL_IMG_POSTER = "https://image.tmdb.org/t/p/w300";

// AXIOS
const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    },
    params: {
        "api_key": API_KEY,
        'language': 'es-ES'
    }
});

// DOM
const trendingFilmsContainer = document.getElementById('trending-film-container');
const categoriesListContainer = document.getElementById('categories-list') 

function appendHTML(data, container, containerClass, optionalClass = ""){
    data.forEach(element=>{
        container.innerHTML += 
        `
        <div class=${containerClass}>
        <img src=${URL_IMG_POSTER + element.poster_path} alt=${element.title} class="img-film" width=100%>
        <h3 class="movie-title ${optionalClass}">${element.title}</h3>
        <p class="movieDetail-score">${element.vote_average}</p></div>
        `
    })
    
}


async function getTrendingMoviesPreview(){
    try{
        const {data} = await api(URL_TRENDING_MOVIES);
        const movies = data.results;

        appendHTML(movies, trendingFilmsContainer, "tarjeta swiper-slide")
        return data
    }catch{
        throw new Error("Error at the API")
    }
}

async function getCategories(){
    try{
        const {data} = await api(URL_CATEGORIES);
        const categories = data.genres;
        categories.forEach(category =>{
            const categoryContainer = document.createElement('div');
            categoryContainer.classList.add('category-container');

            const categoryTitle = document.createElement('h3');
            categoryTitle.classList.add('category-title');

            categoryTitle.addEventListener('click', ()=>{
                location.hash = `#category=${category.id}-${category.name}`;
                headerCategoryTitle.innerHTML = category.name
                arrowBtn.style.display = "block";
                footer.style.bottom = "0";
                
            })

            categoryTitle.setAttribute('id', `id${category.id}`);

            const categoryTitleText = document.createTextNode(category.name);

            categoryTitle.appendChild(categoryTitleText);
            categoryContainer.appendChild(categoryTitle);
            categoriesListContainer.appendChild(categoryContainer);

            
        })
        
    }catch{
        throw new Error("Error at the API")
    }
}

async function getMoviesByCategory(id){
    
    window.scrollTo(0,0)
    try{
        const {data} = await api(URL_MOVIE_BY_GENRE, {
            params:{
                with_genres: id
            }
        });
       
        const movies = data.results;+

        appendHTML(movies, genericSection, "movie-container", "movie-title-genericList")
        
        footer.classList.add('inactive')
    }catch{
        throw new Error("Error at the API")
    }
}

