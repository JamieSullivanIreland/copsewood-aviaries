const $ = require('jquery');

let paginationBtns;
let pageInput;
let nextBtn;
let previousBtn;

$(document).ready(() => {
  const URL = window.location.href;
  const SPLIT_URL = window.location.href.split('/');

  if (URL.indexOf('birds') > -1 && SPLIT_URL[3][5] !== '_') {
    initPagination();
  }
});

function initPagination() {
  paginationBtns = document.querySelectorAll("#pagination-nav li button");
  pageInput = document.querySelector("#page-input");
  nextBtn = document.querySelector("#next-btn");
  previousBtn = document.querySelector("#previous-btn");

  nextBtn.addEventListener('click', nextPage);
  previousBtn.addEventListener('click', previousPage);

  paginationBtns.forEach(btn => {
    let pageNum = btn.value.split('-')[1];

    // Add active class to button that was clicked
    if (window.location.href.indexOf(`page=${pageNum}`) > -1) btn.parentElement.classList.add('active');
    btn.addEventListener('click', changePage);
  });

  // If naviagated through navbar to /birds add active
  if (!(window.location.href.indexOf(`page=`) > -1))
  paginationBtns[1].parentElement.classList.add('active');
}

function changePage(e) {
  pageInput.value = e.target.value;
}

function nextPage() {
  let btn = getActiveBtn();
  let index = Number(btn.split('-')[1]);
  ++index;
  pageInput.value = `page-${index}`;
  console.log(pageInput.value);
}

function previousPage() {
  let btn = getActiveBtn();
  let index = Number(btn.split('-')[1]);
  index = index - 1;
  pageInput.value = `page-${index}`;
  console.log(pageInput.value);
}

function getActiveBtn() {
  let activeBtn = '';

  paginationBtns.forEach(btn => {
    if (btn.parentElement.classList.contains('active')) {
      activeBtn = btn.value;
    }
  });

  return activeBtn;
}
