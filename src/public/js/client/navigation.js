const $ = require('jquery');
const tabletSize = 900;

let navigation;
let navGroup;
let menuBtn;
let footerBtn;

window.onresize = toggleNavigationClasses;

$(document).ready(() => {
  navigation = document.querySelector('.navigation');
  navGroup = document.querySelector('.navigation__group');
  menuBtn = document.querySelector("#menu-btn");
  footerBtn = document.querySelector('#footer-icon-btn');
  menuBtn.addEventListener('click', toggleMenu);
  footerBtn.addEventListener('click', scrollTop);
  toggleNavigationClasses();
});

function toggleNavigationClasses() {
  if (window.innerWidth > tabletSize) {
    navigation.classList.add('wrapper');
    navGroup.classList.remove('show-menu');
    navGroup.classList.remove('hide-menu');
  } else {
    navigation.classList.remove('wrapper');
  }
}

function toggleMenu() {
  let showMenu = !navGroup.classList.contains('show-menu');
  if (showMenu) {
    navGroup.classList.add('show-menu');
    navGroup.classList.remove('hide-menu');
  } else {
    navGroup.classList.remove('show-menu');
    navGroup.classList.add('hide-menu');
  }
}

function scrollTop() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}