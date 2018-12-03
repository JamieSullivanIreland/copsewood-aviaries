const $ = require('jquery');

let filterForm = document.querySelector('#filter-form').elements;
let checkboxes = document.querySelectorAll("#filter-form input[type=checkbox]")
let radioButtons = document.querySelectorAll("#filter-form input[type=radio]")
// let checkboxes = [];
// let radioButtons = [];

// Check if admin-panel was loaded
$(document).ready(function () {
  if(window.location.href.indexOf("/birds") > -1) {
    console.log(filterForm);
  }
});

// filterFormElements.forEach(element => {
//   if (element.type === 'checkbox') checkboxes.push(element);
//   if (element.type === 'radio') radioButtons.push(element);
// });

console.log(checkboxes);
console.log(radioButtons);
