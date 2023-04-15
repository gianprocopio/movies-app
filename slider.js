const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
const slider = document.querySelector('.slider')

prev.addEventListener('click', () => {
    if(window.innerWidth < 400){
        slider.scrollLeft -= 290;
    }else slider.scrollLeft -= 350;
})

next.addEventListener('click', () => {
    if(window.innerWidth < 400){
        slider.scrollLeft += 290;
    }else slider.scrollLeft += 350;
})

