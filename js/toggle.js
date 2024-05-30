const toggler = document.querySelector('.navbar-toggler');
const collapse = document.querySelector('.collapse');

toggler.addEventListener('click', () => {
  collapse.classList.toggle('show');
});