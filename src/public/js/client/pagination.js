const $ = require('jquery');

let paginationButtons;
let pageInput;

$(document).ready(() => {
  const URL = window.location.href;
  const SPLIT_URL = window.location.href.split('/');

  if (URL.indexOf('birds') > -1 && SPLIT_URL[3][5] !== '_') {
    initPagination();
  }
});

function initPagination() {
  paginationButtons = document.querySelectorAll("#pagination-nav li button");
  pageInput = document.querySelector("#page-input");



  paginationButtons.forEach(btn => {
    let pageNum = btn.value.split('-')[1];

    // Add active class to button that was clicked
    if (window.location.href.indexOf(`page=${pageNum}`) > -1) btn.parentElement.classList.add('active');

    btn.addEventListener('click', changePage);
  });

  if (!(window.location.href.indexOf(`page=`) > -1))
  paginationButtons[1].parentElement.classList.add('active');
}

function changePage(e) {
  if (e.target.value.indexOf('previous') > -1) {
    console.log('Previous');
  } else if (e.target.value.indexOf('next') > -1) {
    console.log('Next');
  } else {
    pageInput.value = e.target.value;
  }
}
