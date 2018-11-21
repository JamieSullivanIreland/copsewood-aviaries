import $ from 'jquery';

$(document).ready(() => {
  $('.delete-bird').on('click', (e) => {
    const $target = $(e.target);
    const id = $target.attr('id');
    $.ajax({
      type: 'DELETE',
      url: `/api/birds/${id}`,
      success: res => {
        window.location.href='/birds';
      },
      error: err => {
        console.log(err);
      }
    });
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
        window.location.href='/products';
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
        window.location.href='/admins';
      },
      error: err => {
        console.log(err);
      }
    });
  });
});
