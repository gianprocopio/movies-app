searchFormBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    if(searchFormInput.value !== ""){
        location.hash = "#search=" + searchFormInput.value;
        const [_, query] = location.hash.split('=');
        headerCategoryTitle.innerHTML =decodeURI( `<h3>Resultado de: ${query}</h3>`)
      headerCategoryTitle.classList.remove('inactive');
        searchFormInput.value = "";
    }
    
})

trendingBtn.addEventListener('click', ()=>{
    location.hash = "#trends";
    
})

arrowBtn.addEventListener('click', ()=>{
    location.hash = window.history.back();
    trendingFilmsContainer.innerHTML = "";
    categoriesListContainer.innerHTML = ""
    genericSection.innerHTML = "";
    footer.style.bottom = "1";
})

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
  
  if (location.hash.startsWith('#trends')) {
    trendsPage();
  } else if (location.hash.startsWith('#search=')) {
    searchPage();
  } else if (location.hash.startsWith('#movie=')) {
    moviesPage();
  } else if (location.hash.startsWith('#category=')) {
    // footer.style.bottom = "0";
    categoriesPage();
    
  } else if(location.hash.startsWith('#home') || location.hash == '') {
    homePage();
  }
}

function homePage(){
    footer.style.position = "relative"
    footer.style.bottom = "1";
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = "";
    arrowBtn.style.display = "none";
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');
    imgIconContainer.classList.remove('inactive');
    trendingFilmsContainer.innerHTML = "";
    categoriesListContainer.innerHTML = ""
    footer.classList.remove('inactive')
    genericSection.innerHTML = "";
    getCategories();
    getTrendingMoviesPreview();
}
function trendsPage(){
    footer.style.bottom = "0";
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = "";
    arrowBtn.style.display = "block";
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    imgIconContainer.classList.add('inactive')
    footer.style.position = "absolute";
    // footer.classList.add('inactive')
}
function searchPage(){
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = "";
    arrowBtn.style.display = "block";
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    footer.classList.add('inactive');
    imgIconContainer.classList.add('inactive')
    

    const [_, query] = location.hash.split('=');
    getMoviesBySearch(query);

}
function categoriesPage(){    
    footer.style.bottom = "0";
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = "";
    arrowBtn.style.display = "block";
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    imgIconContainer.classList.add('inactive');

    const [_, categoryInfo] = location.hash.split("=");
    const [categoryId, categoryName] = categoryInfo.split('-');
    headerCategoryTitle.innerHTML = decodeURI(categoryName)

    
    getMoviesByCategory(categoryId);
    
}
function moviesPage(){
    footer.style.bottom = "0";
    headerSection.classList.add('header-container--long');
    arrowBtn.style.display = "block";
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
    footer.style.position = "absolute";
    imgIconContainer.classList.add('inactive');

    const [_, movieID] = location.hash.split('=');

    getMovieById(movieID)
}

