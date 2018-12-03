const $ = require('jquery');

$(document).ready(() => {
  $('.delete-bird').on('click', (e) => {
    const $target = $(e.target);
    const id = $target.attr('id');
    $.ajax({
      type: 'DELETE',
      url: `/api/birds/${id}`,
      success: res => {
        console.log('delete successful');
        document.location.href = '/birds';
      },
      error: err => {
        console.log(err);
        document.location.href = '/birds';
      }
    });
  });
});

$(document).ready(() => {
  $('.delete-all-birds').on('click', (e) => {
    if (confirm('Are you sure you want to remove all birds?')) {
      $.ajax({
        type: 'DELETE',
        url: `/api/birds`,
        success: res => {
          console.log('delete successful');
          document.location.href = '/birds';
        },
        error: err => {
          console.log(err);
          document.location.href = '/birds';
        }
      });
    }
  });
});

$(document).ready(() => {
  $('.delete-product').on('click', (e) => {
    const $target = $(e.target);
    const id = $target.attr('id');
    $.ajax({
      type: 'DELETE',
      url: `/api/products/${id}`,
      success: res => {
        document.location.href='/products';
      },
      error: err => {
        console.log(err);
      }
    });
  });
});

$(document).ready(() => {
  $('.delete-admin').on('click', (e) => {
    const $target = $(e.target);
    const id = $target.attr('id');
    $.ajax({
      type: 'DELETE',
      url: `/api/admins/${id}`,
      success: res => {
        document.location.href = '/admins';
      },
      error: err => {
        console.log(err);
      }
    });
  });
});
