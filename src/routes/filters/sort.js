
export function sort(sortArgs, birds) {
  let sortBy = sortArgs[0];
  let order = sortArgs[1];

  switch (sortBy) {
    case 'breed':
      birds = sortByBreed(order, birds);
      break;
    case 'price':
      birds = sortByPrice(order, birds);
      break;
    case 'date':
      birds = sortByDate(order, birds);
      break;
    default :
      return birds;
  }

  return birds;
}

function sortByBreed(order, birds) {
  birds.sort((a, b) => {
    let breedA = a.breed.toLowerCase();
    let breedB = b.breed.toLowerCase();

    if (breedA < breedB) return -1;
    if (breedA > breedB) return 1;
    return 0;
  });

  return order === 'asc' ? birds : birds.reverse();
}

function sortByPrice(order, birds) {
  birds.sort((a, b) => {
    return a.price - b.price;
  });

  return order === 'asc' ? birds.reverse() : birds;
}

function sortByDate(order, birds) {
  birds.sort((a, b) => {
    return a.timestamp - b.timestamp;
  });

  return order === 'asc' ? birds.reverse() : birds;
}
