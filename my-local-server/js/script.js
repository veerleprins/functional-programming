// Global vars:
const regx = new RegExp(/rgb/g);
const endpoint = '../data/userData.json';
const selectedColumn = 'oogKleur';
const colourObject = {"blauw": "4682b4", "bruin": "603101", "lichtblauw": "add8e6", "groen": "008000"};

// Retrieve and clean all data:
fetchAllData(endpoint)
  .then(fullData => {
    console.log('Data is loaded!');
    const eyeColorArray = getColumn(fullData, selectedColumn);
    const cleanedEyeColorArray = cleanEyeColumn(eyeColorArray);
    console.log(cleanedEyeColorArray);
})

//ALL THE FUNCTIONS:

// This asynchronous function gets all data from the url and 
// returns a transformed json file (without all headers etc.).
async function fetchAllData (url) {
  const response = await fetch(url);
  return await response.json();
};

// This function calls all functions to clean up the eye color 
// column and returns the cleaned array.
function cleanEyeColumn(eyeColorArray) {
  const removedHash = replaceData(eyeColorArray, /#/g, "");
  const removedSpace = replaceData(removedHash, " ", "");
  let lowData = lowerData(removedSpace);
  let rgbArray = getRGB(lowData);
  replaceToHex(rgbArray, lowData);
  textToHex(lowData);
  return lowData;
}

// This function changes any color in text to a hex code.
function textToHex(arr) {
  arr.forEach(color => {
    for (let key in colourObject) {
      if (color == key) {
        let index = arr.indexOf(color);
        if (index !== -1) {
          arr[index] = colourObject[key];
        }
      }
    }
  })
}

// Source: https://github.com/BVictorB/functional-programming 
// Code from (Victor Boucher):
// This function returns an array with values in the given column.
function getColumn (dataArray, column) {
  return dataArray.map(item => item[column]);
}

// This function searches for specific values for each item in an array and replaces 
// specific values.
function replaceData (dataArray, search, replaced) {
  return dataArray.map(item => item.replace(search, replaced));
}

// This function loops through the array and changes each value to lowercase.
// He then returns a new array with the adjusted values.
function lowerData (dataArray) {
  return dataArray.map(item => item.toLowerCase());
}

// This function filters the array for elements that match the specific regular
// expression and returns those values in an array.
function getRGB (dataArray) {
  return dataArray.filter(element => element.match(regx));
}

// This function transforms all RGB strings to hex codes and 
// changes them in the total array.
function replaceToHex(dataArray, totalArray) {
  let removedDots = replaceData(dataArray, ",", ".");
  let removedBrackets = replaceData(removedDots, /([()])/g, "");
  let removedText = replaceData(removedBrackets, "rgb", "");
  let rgbCodeArray = removedText.map(item => item.split("."));
  let integerArray = rgbCodeArray.map(item => toIntegers(item));
  let newArrHex = integerArray.map(item => rgbToHex(item));
  let indexArray = dataArray.map(item => totalArray.indexOf(item));
  indexArray.forEach(index => {
    let count = 0;
    totalArray[index] = newArrHex[count];
    count++;
  });
}

// This function changes the values in an array from strings to integers.
function toIntegers(dataArray) {
  return dataArray.map(arrItem => parseInt(arrItem));
}

//Source: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
// This function takes each number from the rgb in the array and 
// sends it to the componentToHex function and returns the result.
function rgbToHex (arr) {
  return componentToHex(arr[0]) + componentToHex(arr[1]) + componentToHex(arr[2]);
};

//Source: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
// This function converts any number to a hex code.
function componentToHex (char) {
  let hex = char.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};