
export function createCategoriesQuery(categories) {
  let query = '?categories=';

  if (typeof categories === 'string') {
    // If there is only one category entered
    query += categories.split(' ')[0].toLowerCase();
  } else {
    // If there is more than one category, format with _ to allow a split into array
    // Don't add _ for last element
    categories.forEach((category, i) => {
      category = category.split(' ');
      if (i === (categories.length - 1)) query += category[0].toLowerCase();
      else query += `${category[0].toLowerCase()}_`;
    });
  }

  return query;
}

export function createPriceQuery(price, query) {
  query.indexOf('categories') > -1 ?
    query = `&price=${price}` :
    query = `?price=${price}`;

  return query.replace(' ', '+');
}

export function createSortQuery(sortBy, order, query) {
  query.indexOf('categories') > -1 || query.indexOf('price') > -1 ?
    query = `&sortby=${sortBy}+${order}` :
    query = `?sortby=${sortBy}+${order}`;

  return query;
}
