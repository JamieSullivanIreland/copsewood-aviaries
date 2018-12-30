
const $ = require('jquery');

let inquiryButton;
let viewLargeBtn;

$(document).ready(() => {
  const URL = window.location.href;
  const SPLIT_URL = URL.split('/');

  // If on home page 
  // Initialise buttons that will redirect to other pages
  if (SPLIT_URL[3] === '') {
    initButtons();
  }
});

function initButtons() {
  inquiryButton = document.querySelector('#inquiry-button');
  viewLargeBtn = document.querySelector('#view-large-parrots');

  inquiryButton.addEventListener('click', () => redirect('contact'));
  viewLargeBtn.addEventListener('click', () => redirect('birds'));
}

function redirect(route) {
  window.location.href = route;
}