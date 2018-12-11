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
  paginationBtns = document.querySelectorAll("#page-link");
  pageInput = document.querySelector("#page-input");
  nextBtn = document.querySelector("#next-btn");
  previousBtn = document.querySelector("#previous-btn");

  nextBtn.addEventListener('click', nextPage);
  previousBtn.addEventListener('click', previousPage);

  paginationBtns.forEach(btn => {
    let pageNum = btn.value.split('-')[1];
    btn.addEventListener('click', changePage);

    // Add active class to button that was clicked
    if (window.location.href.indexOf(`page=${pageNum}`) > -1) btn.parentElement.classList.add('active');
  });

  // If naviagated through navbar to /birds add active
  if (!(window.location.href.indexOf(`page=`) > -1))
  paginationBtns[0].parentElement.classList.add('active');

  // Disable next and/or previous button
  disableBtn();
}

function changePage(e) {
  pageInput.value = e.target.value;
}

function nextPage() {
  let activeBtn = getActiveBtn();
  let index = Number(activeBtn.split('-')[1]);
  ++index;
  pageInput.value = `page-${index}`;
}

function previousPage() {
  let activeBtn = getActiveBtn();
  let index = Number(activeBtn.split('-')[1]);
  index -= 1;
  pageInput.value = `page-${index}`;
}

function getActiveBtn() {
  for (let i = 0; i < paginationBtns.length; ++i) {
    if (paginationBtns[i].parentElement.classList.contains('active')) {
      return paginationBtns[i].value;
    }
  }
}

function disableBtn() {
  let activeBtn = getActiveBtn();
  let index = Number(activeBtn.split('-')[1]);

  if (index === 1) previousBtn.parentElement.classList.add('disabled');
  if (index === paginationBtns.length) nextBtn.parentElement.classList.add('disabled');
}
