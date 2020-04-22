// Request 1
const welcomeHTML = document.querySelector('.welcome');
welcomeHTML.addEventListener('click', () => {
  if (welcomeHTML.textContent === 'Welcome Message') {
    welcomeHTML.textContent = 'Have a Good Time!';
  } else {
    welcomeHTML.textContent = 'Welcome Message';
  }
});

// Request 2
const dropdownHTML = document.querySelector('.main-nav .dropdown');
const navListHTML = document.querySelector('.nav-list');
const closeBtnHTML = document.querySelector('.main-nav .close-btn');

dropdownHTML.addEventListener('click', (e) => {
  if (e.target.classList.contains('dropdown')) {
    navListHTML.classList.remove('nav-list-display-none');
  }
});

closeBtnHTML.addEventListener('click', (e) => {
  if (e.target.classList.contains('close-btn')) {
    navListHTML.classList.add('nav-list-display-none');
  }
});
// when window width exceed 800px, let nav-list recover
window.addEventListener('resize', () => {
  const bodyHTML = document.querySelector('body');
  if (bodyHTML.clientWidth >= 800) {
    navListHTML.classList.add('nav-list-display-none');
  }
});

// Request 3
const callToActionHTML = document.querySelector('.call-to-action');
const waitToShow = document.querySelector('.wait-to-show-main-container');
callToActionHTML.addEventListener('click', (e) => {
  if (waitToShow.classList.contains('main-container-display-none')) {
    waitToShow.classList.remove('main-container-display-none');
  } else {
    waitToShow.classList.add('main-container-display-none');
  }
});
