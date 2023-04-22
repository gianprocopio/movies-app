const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
const slider = document.querySelector('.slider')

const prev2 = document.getElementById('prev2')
const next2 = document.getElementById('next2')
const slider2 = document.getElementById('slider2')

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

prev2.addEventListener('click', () => {
    if(window.innerWidth < 400){
        slider2.scrollLeft -= 290;
    }else slider2.scrollLeft -= 350;
})

next2.addEventListener('click', () => {
    if(window.innerWidth < 400){
        slider2.scrollLeft += 290;
    }else slider2.scrollLeft += 350;
})