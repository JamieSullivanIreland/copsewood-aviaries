
export function filterByCategory(categories, birds) {
  let filteredBirds = [];
  // Seperate categories into array
  categories = categories.split('_');

  // Add birds that match any categories that were selected
  categories.forEach(category => {
    birds.forEach(bird => {
      if (bird.category.toLowerCase().indexOf(category.toLowerCase()) > -1) filteredBirds.push(bird);
    });
  });

  return filteredBirds;
}

export function filterByPrice(price, birds) {
  // Check for what conditional was entered and filter by price
  birds = birds.filter(bird => {
    return price[0] === '<' ?
      bird.price < price[1] :
      bird.price > price[1];
  });

  return birds;
}
