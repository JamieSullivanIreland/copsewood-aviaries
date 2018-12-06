const $ = require('jquery');

let sortButtons;
let sortButtonsLS;
let dropdownSelection;
let sortbyInput;
let filterButton;

$(document).ready(() => {
  const URL = window.location.href;
  const SPLIT_URL = window.location.href.split('/');

  // If on bird list page with a query, 6th character is ?
 if (SPLIT_URL[3][5] === '?') {
    initSortDropdown();
    setDropdownText();
  } else if (URL.indexOf('birds') > -1 && SPLIT_URL[3][5] !== '_') {
    // Navigated to birds page through navbar
    // Create empty local storage items and populate with default elements
    localStorage.setItem('sortButtons', JSON.stringify([]));
    initSortDropdown();
    dropdownSelection.innerHTML = 'Breed A-Z';
  }
});

function initSortDropdown() {
  // Get sort by button elements,
  // Create local storage versions
  sortButtons = document.querySelectorAll(".dropdown-menu button");
  dropdownSelection = document.querySelector('#dropdown-selection');
  sortbyInput = document.querySelector('#sortby-input');
  filterButton = document.querySelector('#filter-button');

  // Create local storage sort buttons
  sortButtonsLS = createSortButtonsLS();

  // Event listeners
  filterButton.addEventListener('click', handleClickFilter);
  sortButtons.forEach(button => {
    button.addEventListener('click', handleClickSort);
  });
}

function setDropdownText() {
  // Check for which button was last selected
  sortButtonsLS.forEach(button => {
    if (button.selected) dropdownSelection.innerHTML = button.text;
  });
}

function getSortbyValue(text) {
  let value = 'breed asc';

  sortButtons.forEach(button => {
    if (button.innerHTML === text) value = button.value;
  });

  return value;
}

function handleClickFilter(e) {
  sortbyInput.value = getSortbyValue(dropdownSelection.innerHTML);
}

function handleClickSort(e) {
  let i = e.target.id.split('-')[2];
  sortbyInput.value = e.target.value;
  dropdownSelection.innerHTML = e.target.innerHTML;

  // Set all buttons in local storage to false
  sortButtonsLS.forEach(button => {
    button.selected = false;
  });

  // Set local storage button to selected
  sortButtonsLS[i].selected = true;
  localStorage.setItem('sortButtons', JSON.stringify(sortButtonsLS));
}

function createSortButtonsLS() {
  let tempSortButtons = [];
  let tempSortButtonsLS = JSON.parse(localStorage.getItem("sortButtons"));

  // Check if buttons exist in local storage
  // If they don't exist, create them based on DOM elements
  // Set the first button to the default value of Breed A-Z
  if (typeof tempSortButtonsLS === 'undefined' || tempSortButtonsLS.length === 0) {
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
