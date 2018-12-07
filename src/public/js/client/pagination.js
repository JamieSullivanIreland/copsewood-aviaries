const $ = require('jquery');

let paginationLinks;

$(document).ready(() => {
  const URL = window.location.href;
  const SPLIT_URL = window.location.href.split('/');

  if (URL.indexOf('birds') > -1 && SPLIT_URL[3].length === 5) {
    initPagination()
  }
});

function initPagination() {
  paginationLinks = document.querySelectorAll("#pagination-nav li");
  paginationLinks.forEach(link => {
    link.addEventListener('click', navigate);
  });
}

function navigate(e) {
  // var birds = <%- JSON.stringify( birds ) %>;
  console.log(e.target);
  console.log(birds);
}
