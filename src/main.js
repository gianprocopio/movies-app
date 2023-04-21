// API SETTINGS
const API_URL = "https://api.themoviedb.org/3/";
const URL_TRENDING_MOVIES = "trending/movie/week";
const URL_CATEGORIES = "genre/movie/list";
const URL_MOVIE_BY_GENRE = "discover/movie";
const URL_IMG_POSTER = "https://image.tmdb.org/t/p/w300";
const URL_SEARCH_MOVIE = "search/movie"

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

function appendHTML(data, container, containerClass, optionalClass = ""){
    genericSection.innerHTML = "";
    data.forEach(element=>{
        container.innerHTML += 
        `
        <div class=${containerClass} onclick=showMovieDetail(${element.id})>
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
    genericSection.innerHTML = ""
    footer.classList.add('inactive')
    window.scrollTo(0,0)
    try{
        const {data} = await api(URL_MOVIE_BY_GENRE, {
            params:{
                with_genres: id
            }
        });
       
        const movies = data.results;

        appendHTML(movies, genericSection, "movie-container", "movie-title-genericList")
        
        
    }catch{
        throw new Error("Error at the API")
    }
}

seeMoreBtn.addEventListener('click', async ()=>{
    const {data} = await api(URL_TRENDING_MOVIES);
    const movies = data.results;
    headerCategoryTitle.innerHTML = "<h3>Tendencias</h3>"
    headerCategoryTitle.classList.remove('inactive');
    appendHTML(movies, genericSection, "movie-container", "movie-title-genericList");
    footer.classList.add('inactive')
})

async function getMoviesBySearch(query){
    trendingFilmsContainer.innerHTML = "";
    categoriesListContainer.innerHTML = ""
    footer.classList.add('inactive')
    genericSection.innerHTML = "";
    window.scrollTo(0,0)
    try{
        const {data} = await api(URL_SEARCH_MOVIE, {
            params:{
                query: query
            }
        });
       
        const movies = data.results;

        appendHTML(movies, genericSection, "movie-container", "movie-title-genericList")
        if(movies.length === 0){
            genericSection.innerHTML += `
            <h3 class="title-error">No hay resultados</h3>
            `
            
            
        }else{
            genericSection.classList.add('genericList-container')
        }
        
        
    }catch{
        throw new Error("Error at the API")
    }
}

function showMovieDetail(movieID){
    location.hash = "#movie=" + movieID
}

async function getMovieById(id){
    const {data} = await api(`movie/${id}`);

    headerSection.style.backgroundImage = `linear-gradient(
    180deg, 
    rgba(0, 0, 0, 0.35) 19.27%, 
    rgba(0, 0, 0, 0) 29.17%
    ),url(${"https://image.tmdb.org/t/p/w500"+ data.
        poster_path
    })`
    movieDetailTitle.textContent = data.title;
    movieDetailDescription.textContent = data.overview;
    movieDetailScore.textContent = data.vote_average.toFixed(1);
    movieDetailCategoriesList.innerHTML = "";

    data.genres.forEach(genre =>{
        
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', `id${genre.id}`)
        categoryTitle.textContent = genre.name;

        categoryContainer.append(categoryTitle);

        movieDetailCategoriesList.append(categoryContainer);

        getMoviesByCategory(`id${genre.id}`)
        categoryTitle.addEventListener('click', ()=>{
            location.hash = `#category=${genre.id}-${genre.name}`;
            headerCategoryTitle.innerHTML = genre.name
            arrowBtn.style.display = "block";
            footer.style.bottom = "0";
            getMoviesByCategory(`id${genre.id}`)
        })

        getSimilarMoviesById(genre.id)        
    })    


    
}

async function getSimilarMoviesById(id){
    const {data} = await api(`movie/${id}/similar`);
    console.log(data);
}