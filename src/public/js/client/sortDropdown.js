const $ = require('jquery');

let sortButtons;
let sortButtonsLS;
let dropdownSelection;

$(document).ready(() => {
  const SPLIT_URL = window.location.href.split('/');

  // If on bird list page sort dropdown
  // Page will always have a query, 6th character is ?
  if (SPLIT_URL[3][5] === '?') initSortDropdown();
});

function initSortDropdown() {
  // Get sort by button elements,
  // Create local storage versions
  sortButtons = document.querySelectorAll(".dropdown-menu button[name=sort]");
  dropdownSelection = document.querySelector('#dropdown-selection');
  sortButtonsLS = createSortButtonsLS();

  sortButtons.forEach(button => {
    button.addEventListener('click', handleClickSort);
  });

  // Check for which button was last selected
  sortButtonsLS.forEach(button => {
    if (button.selected) dropdownSelection.innerHTML = button.text;
  });
}

function handleClickSort(e) {
  let i = e.target.id.split('-')[2];

  // Set all buttons in local storage to false
  sortButtonsLS.forEach(button => {
    button.selected = false;
  });

  // Set local storage button to selected
  sortButtonsLS[i].selected = true;
  dropdownSelection.innerHTML = e.target.innerHTML;
  localStorage.setItem('sortButtons', JSON.stringify(sortButtonsLS));
}

function createSortButtonsLS() {
  let tempSortButtons = [];

  // Check if buttons exist in local storage
  // If they don't exist, create them based on DOM elements
  // Set the first button to the default value of Breed A-Z
  if (!(JSON.parse(localStorage.getItem("sortButtons")))) {
    sortButtons.forEach(button => {
      tempSortButtons.push({
        id: button.id,
        text: button.innerHTML,
        selected: false
      });
    });

    tempSortButtons[0] = {
      id: sortButtons[0].id,
      text: sortButtons[0].innerHTML,
      selected: true
    };

    localStorage.setItem('sortButtons', JSON.stringify(tempSortButtons));
  }

  return JSON.parse(localStorage.getItem("sortButtons"));;
}
