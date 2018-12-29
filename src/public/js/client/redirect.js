
const $ = require('jquery');

let inquiryButton;

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
  inquiryButton.addEventListener('click', () => redirect('contact'));
}

function redirect(route) {
  window.location.href = route;
}