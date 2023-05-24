const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
const overlay = document.getElementById('overlay');
const itemsMenu1 = document.querySelector('.item-menu1');
const itemsMenu3 = document.querySelector('.item-menu3');

itemsMenu1.addEventListener('click', hideMenu);
itemsMenu3.addEventListener('click', hideMenu);

hamburger.addEventListener('click', hideMenu)

function hideMenu(){
    menu.classList.toggle('show-menu');
    hamburger.classList.toggle('open');
    overlay.classList.toggle('overlay-show');
    document.body.classList.toggle('stop-scrolling');
}