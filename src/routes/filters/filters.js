
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

export function filterByPrice(priceArgs, birds) {
  let condition = priceArgs[0];
  let price = priceArgs[1];

  // Check for what conditional was selected and filter by price
  let filteredBirds = birds.filter(bird => {
    return condition === '<' ?
      bird.price < price :
      bird.price > price;
  });

  return filteredBirds;
}
