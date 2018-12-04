
let checkboxes;
let radioButtons;
let checkboxesLS = [];

// If on bird list page check LS for checkboxes and radio buttons
// Else clear LS of checkboxes and radio buttons

// If LS is undefined create checkbox and radio list
// Else get checkboxes and radios, loop through them and get value


window.onload = () => {
  const URL = window.location.href;

  // If on bird list page, initialise elements
  if (URL.indexOf("/birds") > -1 && URL.split('/')[3].length === 5) {
    filtersInit();
  } else {
    localStorage.clear();
  }
}

function filtersInit() {
  checkboxes = document.querySelectorAll("#filter-form input[type=checkbox]");
  radioButtons = document.querySelectorAll("#filter-form input[type=radio]");
  createCheckboxes();
}

function createCheckboxes() {
  if (JSON.parse(localStorage.getItem("checkboxes"))) {
    checkboxesLS = JSON.parse(localStorage.getItem("checkboxes"));
  } else {
    let tempCheckboxes = [];

    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', handleChangeCheckbox);
      tempCheckboxes.push({ key: checkbox.id, checked: checkbox.checked });
    });

    localStorage.setItem('checkboxes', JSON.stringify(tempCheckboxes));
  }
}

function handleChangeCheckbox(e) {
  let index = e.target.id.split('-')[2];
  let filterCheckboxes = JSON.parse(localStorage.getItem("filterCheckboxes"));
  filterCheckboxes[index].checked = e.target.checked;
  localStorage.setItem('filterCheckboxes', JSON.stringify(filterCheckboxes));
  console.log(filterCheckboxes[index]);
}



// console.log(checkboxes);
// console.log(radioButtons);
