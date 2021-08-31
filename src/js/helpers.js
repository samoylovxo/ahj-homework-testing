/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
export const validateCard = (arr) => {
  const sumArray = [];
  let numHolder = null;
  let everySecondNumber = 1;
  for (let i = arr.length - 1; i >= 0; i--) {
    if (everySecondNumber % 2 === 0) {
      numHolder = arr[i] * 2;
      if (numHolder > 9) {
        numHolder -= 9;
      }
    } else {
      numHolder = arr[i];
    }
    sumArray.push(numHolder);
    everySecondNumber++;
  }

  const totalSum = sumArray.reduce((acc, val) => acc + val, 0);
  if (totalSum % 10 === 0) {
    return true;
  }
  return false;
};
