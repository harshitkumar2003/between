const searchWrapper = document.querySelector('.search-wrapper');
const searchForm = document.querySelector('.search-form');
const searchButton = document.querySelector('.search');
const closeButton = document.querySelector('.close');

searchButton.addEventListener('click', () => {
  searchForm.classList.add('open');
});

closeButton.addEventListener('click', () => {
  searchForm.classList.remove('open');
});