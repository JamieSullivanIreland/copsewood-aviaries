
export function changePage(pageNum, birds, limit) {
  let filteredBirds = [];
  let birdsSelection = 1;
  pageNum = Number(pageNum);

  for (let i = 0; i < birds.length; ++i) {
    // Birds selection is the location of the results
    // If its equal to page number then add result to temp array
    if (birdsSelection === pageNum) filteredBirds.push(birds[i]);

    // Every time the iteration is divisble by the limit up birds selction
    if (((i + 1) % limit) === 0) ++birdsSelection;

    // Stop loop if birds selection exceeds the page number
    if (birdsSelection > pageNum) break;
  }

  return filteredBirds;
}
