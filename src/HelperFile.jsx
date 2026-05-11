
export const average = (arr) =>
  arr.reduce((acc, cur, _, array) => acc + cur / array.length, 0);
