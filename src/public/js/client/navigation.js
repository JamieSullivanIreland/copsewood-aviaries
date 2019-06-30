const $ = require('jquery');
const tabletSize = 900;

let menuBtn;
let navGroup;
let footerBtn;

window.onresize = getWindowSize;

$(document).ready(() => {
  menuBtn = document.querySelector("#menu-btn");
  navGroup = document.querySelector('.navigation__group');
  footerBtn = document.querySelector('#footer-icon-btn');
  menuBtn.addEventListener('click', showMenu);
  footerBtn.addEventListener('click', scrollTop);
});

function getWindowSize() {
  if (window.innerWidth > tabletSize) {
    navGroup.classList.remove('menu-is-active');
  }
}

function showMenu() {
  navGroup.classList.toggle('menu-is-active');
}

var scrollTop = function (e) {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
};