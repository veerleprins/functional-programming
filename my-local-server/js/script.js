// Global vars:
const regx = new RegExp(/rgb/g);
const endpoint = '../data/userData.json'
const colourObject = {"blauw": "4682b4", "bruin": "603101", "lichtblauw": "add8e6", "groen": "008000"};

fetchJSONdata().then(fullData => {
  console.log('Data is loaded!');
  let allEyeColours = fullData.map((data) => {
    return replaceHashToLower(data.oogKleur);
  });

  let rgbColourCode = allEyeColours.filter((element) => {
    // This filter method checks in the total array if there is a rgb i.s.o. hex:
    return element.match(regx);
  });

  console.log(rgbColourCode);

  let hexArray = replaceRGBToHex(rgbColourCode);
  console.log(hexArray[0]);

  let index = allEyeColours.indexOf(rgbColourCode[0]);
  if (index !== -1) {
    allEyeColours[index] = hexArray[0];
  }
  console.log(index);
  console.log(allEyeColours);

  allEyeColours.forEach(color =>{
    for (let key in colourObject) {
      if (color == key) {
        let index = allEyeColours.indexOf(color);
        if (index !== -1) {
          allEyeColours[index] = colourObject[key];
        }
      }
    }
  })
  console.log(allEyeColours);


});

//All the important functions:

//Getting the data from the JSON file:
async function fetchJSONdata () {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

function replaceHashToLower (str) {
  return str.replace(/#/g, "").replace(" ", "").toLowerCase();
};

//Source: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function componentToHex (char) {
  let hex = char.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

function rgbToHex (arr) {
  let int1 = parseInt(arr[0]);
  let int2 = parseInt(arr[1]);
  let int3 = parseInt(arr[2]);
  return componentToHex(int1) + componentToHex(int2) + componentToHex(int3);
};

function replaceRGBToHex (rgbColourCode) {
  let newItem;
  let newArray = [];
  rgbColourCode.forEach((item) => {
    item = item.replace(".", ",");
    item = item.replace(/([()])/g, "");
    item = item.replace("rgb", "");
    item = item.split(",");
    newItem = rgbToHex(item);
    newArray.push(newItem);
  })
  return newArray;
};

// fetchJSONdata().then(fullData => {
//   console.log('Data is loaded!');
//   let allEyeColours = fullData.map((data) => {
//     return replaceHashToLower(data.oogKleur);
//   });

//   let rgbColourCode = allEyeColours.filter((element) => {
//     // This filter method checks in the total array if there is a rgb i.s.o. hex:
//     return element.match(regx);
//   });

//   console.log(rgbColourCode);

//   let hexArray = replaceRGBToHex(rgbColourCode);
//   console.log(hexArray[0]);

//   let index = allEyeColours.indexOf(rgbColourCode[0]);
//   if (index !== -1) {
//     allEyeColours[index] = hexArray[0];
//   }
//   console.log(index);
//   console.log(allEyeColours);

//   allEyeColours.forEach(color =>{
//     for (let key in colourObject) {
//       if (color == key) {
//         let index = allEyeColours.indexOf(color);
//         if (index !== -1) {
//           allEyeColours[index] = colourObject[key];
//         }
//       }
//     }
//   })
//   console.log(allEyeColours);


// });


